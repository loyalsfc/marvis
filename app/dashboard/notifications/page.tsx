import Notification from '@/components/notification/notification'
import { notifications } from '@/utils/utils'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import React from 'react'
import { cookies } from 'next/headers';
import EmptyPages from '@/components/empty-pages/empty-pages';
import emptyNotification from '../../../public/notification.png'
import { Metadata } from 'next';
const supabase = createServerComponentClient({cookies})


export const metadata: Metadata = {
  title: "Notifications"
}

async function Page() {
  const {data, error} = await supabase.auth.getUser();
  const {data: properties, error: propertiesError} = await supabase
    .from("property_table")
    .select(`property_title, property_units, vacant_units, units, slug`)
    .eq("agent_id", data?.user?.id)

  const {data: tenants, error: tenantsError} = await supabase
    .from("tenants")
    .select(`full_name, id`)
    .eq("agent_id", data?.user?.id)

    if( error || propertiesError || tenantsError ) {
      return <EmptyPages emptyImage={emptyNotification} note='An error occured' />
    }

    return (
        <div className='page-wrapper h-full'>
            <h1 className='dashboard-title'>Notifications</h1>
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
            {notifications(properties, tenants).length === 0 && <EmptyPages emptyImage={emptyNotification} note='Your Notification is Empty' />}
          </ul>
        </div>
    )
}

export default Page