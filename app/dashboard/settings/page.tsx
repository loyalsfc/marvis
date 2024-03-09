import Settings from '@/components/settings/settings'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'
import { cookies } from 'next/headers'
import { AgentDetails } from '@/@types'

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
        <>
            {userData && <Settings data={userData} />}
        </>
    )
}

export default Page