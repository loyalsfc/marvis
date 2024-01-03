import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import React from 'react'
import { FaAngleLeft } from 'react-icons/fa'
import { cookies } from 'next/headers'
import PropertyPage from '@/components/client/property-page/property-page'

async function Page({params}:{params: {slug: string}}) {
    const supabase = createServerComponentClient({cookies})
    const {data, error} = await supabase
        .from("property_table")
        .select(`*, agents_table ( * )`)
        .eq("slug", params.slug)
    
    return (
        <div>
            <div className="max-w-7xl mx-auto">
                <div className="container mx-auto">
                    <Link href={"/properties"} className='flex text-sm text-orange font-semibold items-center gap-2'>
                        <FaAngleLeft />
                        Back to map 
                    </Link>
                    {data && <PropertyPage data={data} />}
                </div>
            </div>
        </div>
    )
}

export default Page