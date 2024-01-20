import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import React from 'react'
import { FaAngleLeft } from 'react-icons/fa'
import { cookies } from 'next/headers'
import PropertyPage from '@/components/client/property-page/property-page'
import { getFeaturedImage } from '@/utils/utils'
import PropertyCard from '@/components/client/property-card/property-card'
import GalleryImages from '@/components/client/gallery-images/gallery-images'

async function Page({params}:{params: {slug: string}}) {
    const supabase = createServerComponentClient({cookies})
    const {data, error} = await supabase
        .from("property_table")
        .select(`*, agents_table ( * )`)
        .eq("slug", params.slug)

    const {data: relatedProperties, error:relatedPropertiesError} = await supabase
        .from("property_table")
        .select()
        .limit(3)
        .neq("slug", params.slug)
    
    return (
        <div>
            <GalleryImages galleryImages={data![0].property_image} />
            <div className="max-w-7xl mx-auto">
                <div className="container mx-auto">
                    <Link href={"/properties"} className='flex text-sm text-orange font-semibold items-center gap-2'>
                        <FaAngleLeft />
                        Back to map 
                    </Link>
                    {data && <PropertyPage data={data} />}
                </div>
            </div>
            <div className=' bg-gray-200/30 py-10'>
                <div className="max-w-7xl mx-auto">
                    <div className="container mx-auto">
                        <h4 className='text-2xl font-semibold mb-8'>Similar Listing</h4>
                        <ul className='grid grid-cols-3 gap-8'>
                            {relatedProperties?.map(item => {
                                return <PropertyCard
                                    key={item.id}
                                    image={getFeaturedImage(item.property_image) ?? ""}
                                    price={item.rent_price}
                                    name={item.property_title}
                                    location={item.property_address}
                                    bed={item.bedroom}
                                    bathroom={item.bath}
                                    slug={item.slug}
                                />
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page