import Settings from '@/components/settings/settings'
import React from 'react'
import { AgentDetails } from '@/@types'
import { Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'

export const metadata: Metadata = {
    title: "Settings"
}

async function Page() {
    const supabase = createClient();
    const {data, error} = await supabase.auth.getUser()
    const {data: userData, error: userError} = await supabase
        .from("agents_table")
        .select()
        .eq("agent_id", data.user?.id)
        .limit(1)
        .returns<AgentDetails>()
        .single()

    return (
        <>
            {userData && <Settings data={userData} />}
        </>
    )
}

export default Page