import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import React from 'react'
import moment from "moment"
import Link from 'next/link'
import emptyMessage from '../../../public/empty-messages.png'
import EmptyPages from '@/components/empty-pages/empty-pages'
import { Metadata } from 'next'
const supabase = createServerComponentClient({cookies})

export const metadata: Metadata = {
    title: "Messages"
}

async function Page() {
    const {data: user} = await supabase.auth.getUser();
    const {data, error} = await supabase
        .from("messages")
        .select()
        .eq("agent_id", user.user?.id)
        .order("id", {ascending: false})

    return (
        <div className='page-wrapper h-full flex flex-col'>
            <h3 className='text-2xl font-bold text-orange'>Messages</h3>
            {data?.length ? <div className='flex-1 overflow-y-scroll pr-2'>
                <ul className='space-y-4 py-6'>
                    {data?.map(item => {
                        return(
                            <li key={item.id} className='border rounded-md p-4 hover:bg-slate-100'>
                                <div className='flex justify-between'>
                                    <div className='font-semibold'>
                                        <h4 className='text-lg leading-none'>{item.client_name}</h4>
                                        <Link 
                                            href={"mailto:"+item.client_email} 
                                            className='text-sm hover:text-orange hover:underline'
                                        >
                                            {item.client_email}
                                        </Link>
                                    </div>
                                    <span className='text-sm font-medium'>{moment(item.created_at).fromNow().replace("minute", "min")}</span>
                                </div>
                                <div>
                                    <p className='pt-2'>{item.question}</p>
                                    <Link href={item.property_slug} className='text-orange font-medium hover:underline block text-end'>Visit Property</Link>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div> : <EmptyPages emptyImage={emptyMessage} note='No Message Found' />}
        </div>
    )
}

export default Page