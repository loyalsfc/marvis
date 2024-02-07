import FormControl from '@/components/authentication/form-control/form-control'
import PropertyForm from '@/components/property-form/property-form'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'

async function Page() {
    const supabase = createClientComponentClient()
    const {data, error} = await supabase.from("property_owner").select('first_name, last_name, id')

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