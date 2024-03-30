import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import React from 'react'
import emptyTour from '../../../public/empty-tour.png'
import BookedTours from '@/components/booked-tours/booked-tours'
import EmptyPages from '@/components/empty-pages/empty-pages'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Booked Tours"
}

async function Page() {
    const supabase = createServerComponentClient({cookies})
    const {data: user} = await supabase.auth.getUser();
    const {data, error} = await supabase
        .from("booked_tours")
        .select()
        .eq("agent_id", user.user?.id)
        .order("id", {ascending: false})

    console.log(data)

    return (
        <div className='page-wrapper h-full flex flex-col'>
            <h3 className='text-2xl font-bold text-orange mb-8'>Tour Requests</h3>
            {data?.length ? <div className='flex-1 overflow-y-scroll'>
                <BookedTours data={data} />
            </div> : <EmptyPages emptyImage={emptyTour} note='No Tour Booked' />}
        </div>
    )
}

export default Page