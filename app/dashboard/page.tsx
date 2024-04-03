import { PropertyUnits } from '@/@types';
import Notification from '@/components/notification/notification'
import ProfileNotification from '@/components/profile-notification/profile-notification';
import PropertyCountCard from '@/components/propery-count-card/property-count-card'
import { daysToExpire, notifications } from '@/utils/utils';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
const supabase = createServerComponentClient({cookies})

export default async function Home() {

  const {data, error} = await supabase.auth.getUser();
  const full_name = data?.user?.user_metadata?.full_name

  const {data: userData, error: userError} = await supabase
    .from("agents_table")
    .select(`profile_updated`)
    .eq("agent_id", data?.user?.id)
    .limit(1)
    .single()

  const {data: properties, error: propertiesError} = await supabase
    .from("property_table")
    .select(`property_title, property_units, vacant_units, units, slug`)
    .eq("agent_id", data?.user?.id)

  const {data: tenants, error: tenantsError} = await supabase
    .from("tenants")
    .select(`full_name, id`)
    .eq("agent_id", data?.user?.id)

  if(error || userError || propertiesError || tenantsError){
    return <p className='pt-20 text-center font-bold text-orange'>An Error Occured</p>
  }

  const totalProperties = properties?.reduce((accumulator, currntValue) => accumulator + currntValue.units, 0);
  const vacantProperties = properties?.reduce((accumulator, currentValue) => accumulator + currentValue.vacant_units, 0);
  
  const preExpired = () => {
    let counter = 0;
    //Loop through all the properties
    properties?.forEach((item => {
      //Go through all the properties units
      item.property_units.forEach((unit: PropertyUnits )=> {
        //If the unit is not available
        if(!unit.isAvailable){
          //check if the expiry day is less than 30 and add it to counter if yes
          const remainingDays = daysToExpire(unit.expiry_date);
          if(remainingDays < 31 && remainingDays > 0){
            counter++
          }
        }
      })
    }))
    return counter
  }

  const expired = () => {
    let counter = 0;
    //Loop through all the properties
    properties?.forEach((item => {
      //Go through all the properties units
      item.property_units.forEach((unit: PropertyUnits )=> {
        //If the unit is not available
        if(!unit.isAvailable){
          //check if the expiry day is less than 0 and add it to counter if yes
          const remainingDays = daysToExpire(unit.expiry_date);
          if(remainingDays < 0){
            counter++
          }
        }
      })
    }))
    return counter
  }

  return (
    <main className='h-full w-full min-[920px]:flex flex-col page-wrapper overflow-scroll'>
      {!userData?.profile_updated && <ProfileNotification />}
      <div className='mb-6'>
        <h2 className='text-2xl font-semibold'>Welcome {full_name?.split(" ")[0]}</h2>
        <p className='text-sm'>This is what is happening in your account...</p>
      </div>

      <section className='pb-10'>
          <h4 className='dashboard-title'>Your activities</h4>
          <div className='grid sm:grid-cols-2 min-[920px]:grid-cols-4 py-3 gap-4 lg:gap-4 min-[1200px]:gap-12'>
            <PropertyCountCard
              title='Total'
              subtite='Properties'
              count={totalProperties}
            />
            <PropertyCountCard
              title='Vacant'
              subtite='Properties'
              count={vacantProperties}
            />
            <PropertyCountCard
              title='Pre-expired'
              subtite='Rents'
              count={preExpired()}
            />
            <PropertyCountCard
              title='Expired'
              subtite='Rents'
              count={expired()}
            />
          </div>
        </section>

        <section className='min-[920px]:flex-1 overflow-hidden flex flex-col'>
          <h4 className='dashboard-title flex items-center justify-between'>
            Notifications 
            <Link className='text-sm hover:underline text-dark-100' href="/dashboard/notification">See All</Link>
          </h4>
          <ul className='flex flex-col gap-2.5 overflow-scroll no-scrollbar flex-1 pt-4'>
            {notifications(properties, tenants).map((item, index) => {
              return <Notification 
                        notification={item.notification} 
                        duration={item.date} 
                        key={index} 
                        slug={item.slug}
                        unit={item.unit}
                      />
            })}
            {notifications(properties, tenants).length === 0 && <li className='text-center font-semibold pt-10 text-primary'>No Notification Found</li>}
          </ul>
        </section>
    </main>
  )
}
