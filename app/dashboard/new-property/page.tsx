import { OwnerProp } from '@/@types'
import PropertyForm from '@/components/property-form/property-form'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'

async function Page() {
    const supabase = createClientComponentClient()
    const {data: user, error} = await supabase.auth.getUser()
    const {data} = await supabase
        .from("property_owner")
        .select('first_name, last_name, id')
        .eq("agent_id", user.user?.id)
        .returns<OwnerProp[] | null>()

    return (
        <div className='page-wrapper h-full flex flex-col'>
            <h3 className='text-center text-2xl font-bold text-orange'>Register A New property</h3>
            <div className='flex-1 overflow-hidden'>
                <PropertyForm existingOwners={data} />
            </div>
        </div>
    )
}

export default Page