import { OwnerProp } from '@/@types';
import EditForm from '@/components/property-edit/edit-form';
import PropertyForm from '@/components/property-form/property-form';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import React from 'react'

async function Page({params}:{params: {slug: string[]}}) {
    const supabase = createServerComponentClient({cookies});

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