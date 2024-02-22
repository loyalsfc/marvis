'use client'

import { Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

enum FILTER {
  ALL = "all",
  PAST = "past",
  UPCOMING = "upcoming"
}

function BookedTours({
  data
}:{
  data: any[] | null
}) {
  const [filter, setFilter] = useState<string>(FILTER.ALL);
  
  return (
    <div>
      <div className='flex flex-nowrap overflow-scroll no-scrollbar gap-4 pb-4'>
        <Button 
          onClick={()=>setFilter(FILTER.ALL)}
          variant={'outline'}
          className={cn(filter === FILTER.ALL ? 'bg-orange text-white group': "border-orange text-orange")}
        >
          All Tours
          <span className='tour-count'>{data?.length}</span>
        </Button>
        <Button 
          onClick={()=>setFilter(FILTER.UPCOMING)}
          variant={'outline'}
          className={cn(filter === FILTER.UPCOMING ? 'bg-orange text-white group': "border-orange text-orange")}
          >
          Upcoming Tours
          <span className='tour-count'>{data?.filter(item => new Date(item.tour_date) > new Date()).length}</span>
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
      <div className='border border-grey-100 overflow-x-scroll rounded-md'>
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
            {data?.map((item, index) => {
              if(filter === FILTER.UPCOMING && new Date(item.tour_date) < new Date()) return;
              if(filter === FILTER.PAST && new Date(item.tour_date) > new Date()) return;
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
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BookedTours