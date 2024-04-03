import Properties from '@/components/all-properties/properties'
import { createClient } from '@/utils/supabase/server';
import { Metadata, ResolvingMetadata } from 'next';
import React from 'react'

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
    const supabase = createClient()
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

async function Page({ params }: { params: { slug: string } }) {
    const supabase = createClient()
    const { data } = await supabase
        .from('property_table')
        .select(`
            *,
            property_owner(
                *
            )
        `)
        .eq('slug', params.slug);

    const { data: tenants } = await supabase
        .from('tenants')
        .select(`
            full_name,
            id
        `)
        .neq("is_approved", false)
    
    return (
        <div className='page-wrapper h-full overflow-hidden'>
            {data && <Properties data={data} tenant={tenants} selectedUnit={params.slug[1]} />}
        </div>
    )
}

export default Page