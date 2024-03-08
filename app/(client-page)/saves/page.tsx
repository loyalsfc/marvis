'use client'
import PropertyList from '@/components/client/property-list/property-list';
import { useAppSelector } from '@/lib/hooks/hooks'
import { supabase } from '@/utils/utils'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';

interface Data {
    isLoading: boolean;
    properties: any[]
}

function Page() {
    const {saves} = useAppSelector(state => state.saves)

    const {data, isLoading, isError, refetch } = useQuery({
        queryKey: ["saved-properties", saves],
        queryFn: getSavedProperties
    })
    
    async function getSavedProperties() {
        const {data, count, error} = await supabase
            .from("property_table")
            .select('*', { count: 'exact', head: false })
            .in('slug', saves)

        return {data, count}
    }

    useEffect(() => {
        refetch();
    }, [saves])
    

    if(isLoading){
        return <div className='flex-1 relative grid place-content-center py-20'>
            <div className='h-20 w-20 rounded-full border-4 border-gray-600 border-t-gray-950 animate-spin'></div>
        </div>
    }
    return (
        <div className='bg-[#F7f7f7] py-10 m d:py-12'>
            <div className="mx-auto max-w-7xl">
                <div className='container mx-auto px-4 md:px-8'>
                <h1 className='text-2xl md:text-3xl text-center md:text-left font-bold text-orange mb-6'>Saved Properties</h1>
                    {data && <PropertyList 
                                data={data.data} 
                                totalProperties={data.count ?? 0} 
                                showFilter={false}
                            />}
                </div>
            </div>
        </div>
    )
}

export default Page