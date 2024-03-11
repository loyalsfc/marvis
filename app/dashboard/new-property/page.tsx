import { OwnerProp } from '@/@types'
import CompleteProfileModal from '@/components/profile-notification/complete-profile-modal'
import PropertyForm from '@/components/property-form/property-form'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import React from 'react'

async function Page() {
    const supabase = createServerComponentClient({cookies})
    const {data: user} = await supabase.auth.getUser()

    const {data: userData} = await supabase
        .from("agents_table")
        .select(`profile_updated`)
        .eq("agent_id", user?.user?.id)
        .limit(1)
        .single()

    const {data} = await supabase
        .from("property_owner")
        .select('first_name, last_name, id')
        .eq("agent_id", user.user?.id)
        .returns<OwnerProp[] | null>()

    return (
        <div className='page-wrapper h-full flex flex-col'>
            {!userData?.profile_updated && <CompleteProfileModal />}
            <h3 className='text-center text-2xl font-bold text-orange'>Register A New property</h3>
            <div className='flex-1 overflow-hidden'>
                <PropertyForm existingOwners={data} />
            </div>
        </div>
    )
}

export default Page