import PropertyList from '@/components/client/property-list/property-list'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import React from 'react'
import { cookies } from 'next/headers';

async function Page() {
    const supabase = createServerComponentClient({cookies});
    const {data, error} = await supabase.from("property_table")
        .select();


    
    return (
        <div className='bg-[#F7f7f7] py-10 md:py-12'>
            <div className="mx-auto max-w-7xl">
                <div className='container mx-auto px-4 md:px-8'>
                    <h1 className='text-2xl md:text-3xl text-center md:text-left font-bold text-orange mb-6'>Search properties to rent</h1>
                    <PropertyList data={data} />
                </div>
            </div>
        </div>
    )
}

export default Page