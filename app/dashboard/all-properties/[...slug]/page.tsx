import { OwnerProp } from '@/@types';
import EditForm from '@/components/property-edit/edit-form';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import React from 'react'

export const metadata: Metadata = {
    title: "Edit Property"
}

const supabase = createServerComponentClient({cookies});

async function Page({params}:{params: {slug: string[]}}) {
    const { data } = await supabase
        .from('property_table')
        .select(`
            *,
            property_owner(
                *
            )
        `)
        .eq('slug', params.slug[0]);

    const { data: property_owner } = await supabase
        .from('property_owner')
        .select()

    const propertyOwner:OwnerProp[] = property_owner ? [...property_owner] : []
    
    return (
        <div className='page-wrapper h-full'>
            <EditForm existingOwners={propertyOwner} propertyDetails={data} />
        </div>
    )
}

export default Page