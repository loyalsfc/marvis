import Link from 'next/link'
import React from 'react'
import { FaAngleLeft } from 'react-icons/fa'
import PropertyPage from '@/components/client/property-page/property-page'
import { getFeaturedImage, supabase } from '@/utils/utils'
import PropertyCard from '@/components/client/property-card/property-card'
import GalleryImages from '@/components/client/gallery-images/gallery-images'
import { Metadata, ResolvingMetadata } from 'next'

type Props = {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const slug = params.slug as string;
    const { data } = await supabase.from('property_table').select('property_title').eq('slug', slug)
   
    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []
    
    return {
      title: data ? data![0]?.property_title : "Mavris ",
      openGraph: {
        images: ['/some-specific-page-image.jpg', ...previousImages],
      },
    }
  }

async function Page({params}:{params: {slug: string}}) {
    const {data, error} = await supabase
        .from("property_table")
        .select(`*, agents_table ( * )`)
        .eq("slug", params.slug)

    const {data: relatedProperties, error:relatedPropertiesError} = await supabase
        .from("property_table")
        .select()
        .limit(3)
        .neq("slug", params.slug)

    
    if(!data || !relatedProperties){
        return <p className='text-center pt-10 font-semibold text-3xl'>An error occur</p>
    }

    return (
        <div>
            <GalleryImages galleryImages={data![0].property_image} />
            <div className="max-w-7xl mx-auto">
                <div className="container mx-auto px-4 md:px-8">
                    <Link href={"/properties"} className='flex text-sm text-orange w-fit font-semibold items-center gap-2 hover:underline hover:scale-105 transition-all'>
                        <FaAngleLeft />
                        Back to Properties 
                    </Link>
                    {data && <PropertyPage data={data} slug={params.slug} />}
                </div>
            </div>
            <div className=' bg-gray-200/30 py-10'>
                <div className="max-w-7xl mx-auto">
                    <div className="container mx-auto px-4 md:px-8">
                        <h4 className='text-2xl font-semibold mb-8'>Similar Listing</h4>
                        <ul className='grid sm:grid-cols-3 gap-8 sm:gap-4 md:gap-8'>
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