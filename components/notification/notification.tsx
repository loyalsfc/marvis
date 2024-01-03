'use client'

import React, { useEffect } from 'react'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import Link from 'next/link'

TimeAgo.addDefaultLocale(en)

function Notification({
    notification, 
    duration, 
    slug,
    unit
}:{
    notification: string, 
    duration: string, 
    slug: string,
    unit: number
}) {
    const timeAgo = new TimeAgo('en-US')
    useEffect(()=>{
        TimeAgo.addDefaultLocale(en)
    },[])

    return (
        <li className='grid grid-cols-12 sm:gap-4'>
            <Link 
                href={`/dashboard/all-properties/${slug}`}
                className='col-span-12 sm:col-span-10 text-[15px] text-dark-100 font-medium'
            >
                {notification}
            </Link>
            <span className='col-span-12 sm:col-span-2 text-end text-xs'>{timeAgo.format(new Date(duration))}</span>
        </li>
    )
}

export default Notification