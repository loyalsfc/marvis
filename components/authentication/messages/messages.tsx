'use client'

import { useAppSelector } from '@/lib/hooks/hooks'
import { cn } from '@/lib/utils'
import { createClient } from '@/utils/supabase/client'
import moment from 'moment'
import Link from 'next/link'
import React, { useEffect } from 'react'

function MessagesDisplay({
    data
}:{
    data:any[]
}) {
    const supabase = createClient()
    const {user} = useAppSelector(state => state.user)
    useEffect(()=>{
        changeMessageToRead();
    },[])

    async function changeMessageToRead(){
        const { error } = await supabase
            .from('messages')
            .update({ isread: true })
            .eq('isread', false)
            .eq("agent_id", user?.id)
    }

    return (
        <ul className='space-y-4 py-6'>
            {data?.map(item => {
                return(
                    <li key={item.id} className={cn('border rounded-md p-4 hover:bg-slate-100', !item.isread && "bg-slate-50")}>
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
    )
}

export default MessagesDisplay