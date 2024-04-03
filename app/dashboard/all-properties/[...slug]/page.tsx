import { OwnerProp } from '@/@types';
import EditForm from '@/components/property-edit/edit-form';
import { createClient } from '@/utils/supabase/server';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Edit Property"
}

async function Page({params}:{params: {slug: string[]}}) {
    const supabase = createClient()
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