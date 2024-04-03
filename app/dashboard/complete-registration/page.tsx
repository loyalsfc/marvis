import { AgentDetails } from '@/@types'
import Settings from '@/components/settings/settings'
import { createClient } from '@/utils/supabase/server'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Complete Registration"
}

async function Page() {
    const supabase = createClient()
    const {data, error} = await supabase.auth.getUser()
    const {data: userData, error: userError} = await supabase
        .from("agents_table")
        .select()
        .eq("agent_id", data.user?.id)
        .limit(1)
        .returns<AgentDetails>()
        .single()

    if(error || userError) {
        return <p className="py-10 text-center font-bold text-orange">An error occured</p>
    }

    return (
            <div className='h-full w-full flex flex-col page-wrapper overflow-y-scroll'>
                {userData && <Settings data={userData} />}
            </div>
    )
}

export default Page