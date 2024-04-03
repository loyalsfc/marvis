import TenantApplication from '@/components/tenant-form/tenant-registration/tenant-registration'
import React from 'react'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Apply For Property"
}

const supabase = createServerComponentClient({cookies})

async function Page({params}:{params: {slug: string}}) {
    const {data, error} = await supabase
        .from("property_table")
        .select(`agent_id, property_title`)
        .eq("slug", params.slug)

    return (
        <div className='bg-[#F7f7f7] py-10 m d:py-12'>
            <div className="mx-auto max-w-7xl">
                <div className='container mx-auto px-4 md:px-8'>
                    <h1 className='text-2xl md:text-3xl text-center md:text-left font-bold text-orange mb-6'>Apply For Property</h1>
                    {data && <TenantApplication slug={params.slug} agent_id={data[0].agent_id} />}
                </div>
            </div>
        </div>
    )
}

export default Page