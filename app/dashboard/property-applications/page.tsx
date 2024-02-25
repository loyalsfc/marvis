import EmptyPages from '@/components/empty-pages/empty-pages'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import React from 'react'
import emptyImage from '../../../public/empty-request.png'
import Image from 'next/image'
import { downloadImage } from '@/utils/utils'
import Link from 'next/link'

interface Data {
    id: any;
    tenant_id: {
        full_name: string;
    };
    property_slug: {
        property_image: {
            url: string,
            isMarkedFeatured: boolean
        }[];
        property_title: string;
        property_location: string;
    };
}

async function Page() {
    const supabase = createServerComponentClient({cookies})
    const {data: user} = await supabase.auth.getUser();
    const {data, error} = await supabase
        .from("property_applications")
        .select(`
            id, 
            tenant_id(
                full_name
            ),
            property_slug(
                property_image,
                property_title,
                property_location
            )
        `)
        .eq("agent_id", user.user?.id)
        .returns<Data[] | null>()

    return (
        <div className='h-full w-full flex flex-col page-wrapper overflow-y-scroll'>
            <h3 className='text-2xl font-bold text-orange mb-8'>Tenancy Applications</h3>
            {data?.length ? <div className='flex-1 overflow-y-scroll pr-2'>
                <ul className='space-y-4'>
                    {data.map(item => {
                        const image = item.property_slug.property_image.find((image) => image.isMarkedFeatured)?.url ?? item.property_slug.property_image[0].url
                        return(
                            <li key={item.id} className='flex gap-4 p-2 border border-orange rounded-lg'>
                                <div className='h-20 w-20 relative rounded-md overflow-hidden'>
                                    <Image
                                        src={downloadImage(image, "property_images")}
                                        fill
                                        alt='Property Image'
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <h4 className='text-xl font-semibold text-orange leading-none'>{item.property_slug.property_title}</h4>
                                    <span className='font-medium capitalize'>{item.property_slug.property_location}</span>
                                    <p className='font-medium mt-auto leading-none'>Tenant Name: <span className='text-orange'>{item.tenant_id.full_name}</span></p>
                                </div>
                                <Link 
                                    href={`/dashboard/property-applications/${item.id}`} 
                                    className='ml-auto btn btn-primary bg-orange self-center py-1.5 px-4 font-medium'
                                >
                                    View Details
                                </Link>
                            </li>
                        )
                    })}
                </ul> 
            </div> : <EmptyPages emptyImage={emptyImage} note='No Pending Application' />}
        </div>
    )
}

export default Page