import React from 'react'
import moment from "moment"
import Link from 'next/link'
import emptyMessage from '../../../public/empty-messages.png'
import EmptyPages from '@/components/empty-pages/empty-pages'
import { Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'
import { cn } from '@/lib/utils'
import MessagesDisplay from '@/components/authentication/messages/messages'

export const metadata: Metadata = {
    title: "Messages"
}

async function Page() {
    const supabase = createClient()
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
                <MessagesDisplay data={data} />
            </div> : <EmptyPages emptyImage={emptyMessage} note='No Message Found' />}
        </div>
    )
}

export default Page