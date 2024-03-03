'use client'

import { Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import emptyTour from '../../public/empty-tour.png'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import PaginatedItems from '../client/property-list/pagination'

enum FILTER {
  ALL = "all",
  PAST = "past",
  UPCOMING = "upcoming"
}

function BookedTours({
  data
}:{
  data: any[]
}) {
  const router = useRouter();
  const searchParams = useSearchParams()
  const params = searchParams.get("filter") as FILTER; 
  const limit = searchParams.get("limit") ?? "0";
  const [filter, setFilter] = useState<FILTER>(params ?? FILTER.UPCOMING);
  const [booking, setBooking] = useState<any[]>(data?.filter(item => new Date(item.tour_date) > new Date()))

  useEffect(() => {
    setParams(filter)
  }, [filter])
  
  const setParams = (filter: FILTER) => {
    switch (filter) {
      case FILTER.UPCOMING:
        setBooking(data?.filter(item => new Date(item.tour_date) > new Date()))
        break;
      case FILTER.PAST:
        setBooking(data?.filter(item => new Date(item.tour_date) < new Date()))
        break;
      case FILTER.ALL:
        setBooking(data)
        break;
      default:
        setBooking(data?.filter(item => new Date(item.tour_date) > new Date()))
        break;
    }
    const params = new URLSearchParams();
    params.set("filter", filter);
    router.push(`/dashboard/booked-tours?${params.toString()}`)
  }
  
  return (
    <div>
      <div className='flex flex-nowrap overflow-scroll no-scrollbar gap-4 pb-4'>
        <Button 
          onClick={()=>setFilter(FILTER.UPCOMING)}
          variant={'outline'}
          className={cn(filter === FILTER.UPCOMING ? 'bg-orange text-white group': "border-orange text-orange")}
          >
          Upcoming Tours
          <span className='tour-count'>{data?.filter(item => new Date(item.tour_date) > new Date()).length}</span>
        </Button>
        <Button 
          onClick={()=>setFilter(FILTER.ALL)}
          variant={'outline'}
          className={cn(filter === FILTER.ALL ? 'bg-orange text-white group': "border-orange text-orange")}
        >
          All Tours
          <span className='tour-count'>{data?.length}</span>
        </Button>
        <Button 
          onClick={()=>setFilter(FILTER.PAST)}
          variant={'outline'}
          className={cn(filter === FILTER.PAST ? 'bg-orange text-white group': "border-orange text-orange")}
        >
          Past Tours
          <span className='tour-count'>{data?.filter(item => new Date(item.tour_date) < new Date()).length}</span>
        </Button>
      </div>
      <div className={cn('border border-grey-100 rounded-md overflow-x-scroll')}>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-b-grey-100'>
              <th className='tour-header'>S/N</th>
              <th className='tour-header'>Client Name</th>
              <th className='tour-header'>Property Link</th>
              <th className='tour-header'>Tour Date</th>
              <th className='tour-header'>Tour Type</th>
              <th className='tour-header'>Client Contact</th>
            </tr>
          </thead>
          <tbody className=''>
            {booking?.map((item, index) => {
              if(index >= (parseInt(limit) * 10) && index < ((parseInt(limit) * 10) + 10)){
                return(
                  <tr key={item.id} className='border-b border-b-grey-100 last:border-b-0'>
                    <td className='tour-cells text-center'>{index+1}</td>
                    <td className='tour-cells whitespace-nowrap'>{item.client_name}</td>
                    <td className='tour-cells'>
                      <Link className='tour-contacts max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis' href={`/properties/${item.property_slug}`}>
                        /{item.property_slug}
                      </Link>
                    </td>
                    <td className='tour-cells'>
                      {new Date(item.tour_date).toLocaleDateString("en-US")}
                    </td>
                    <td className='tour-cells capitalize'>{item.tour_type}</td>
                    <td className='tour-cells'>
                      <div>
                        <Link href={"tel:" + item.client_phone_number} className='tour-contacts'>
                          <Phone size={16} />
                          {item.client_phone_number}
                        </Link>
                        <Link href={"mailto:" + item.client_email} className='tour-contacts'>
                          <Mail size={16} />
                          {item.client_email}
                        </Link>
                      </div>
                    </td>
                  </tr>
                )
              }
            })}
          </tbody>
        </table>
        {booking.length === 0 ? 
          <EmptyTourFilter 
            note={filter === FILTER.UPCOMING ?'No Upcoming Tour' : "No Past Tour"} 
          />: booking.length > 10 ?
          <div className='pt-3'>
            <PaginatedItems 
              totalProperties={booking.length} 
              itemsPerPage={10}
              path='/dashboard/booked-tours'
            />
          </div> : ""
          }
      </div>
    </div>
  )
}

function EmptyTourFilter({note}:{note: string}){
  return(
    <div className='flex flex-col items-center'>
      <Image
        src={emptyTour}
        alt='Empty Illustration'
        height={350}
      />
      <p className='text-primary font-semibold text-lg'>{note}</p>
    </div>
  )
}

export default BookedTours


// if(filter === FILTER.UPCOMING && new Date(item.tour_date) < new Date()){
//   if(index !== 0) return;
//   return <EmptyTourFilter note='No Upcoming Tour' />
// };
// if(filter === FILTER.PAST && new Date(item.tour_date) > new Date()) {
//   if(index !== 0) return;
//   return <EmptyTourFilter note='No Past Tour' />
// };