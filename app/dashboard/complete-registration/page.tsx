import { AgentDetails } from '@/@types'
import Settings from '@/components/settings/settings'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import React from 'react'

async function Page() {
    const supabase = createServerComponentClient({cookies})
    const {data, error} = await supabase.auth.getUser()
    const {data: userData, error: userError} = await supabase
        .from("agents_table")
        .select()
        .eq("agent_id", data.user?.id)
        .limit(1)
        .returns<AgentDetails>()
        .single()

    return (
            <div className='h-full w-full flex flex-col page-wrapper overflow-y-scroll'>
                {userData && <Settings data={userData} />}
            </div>
    )
}

export default Page