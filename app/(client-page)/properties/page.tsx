import PropertyList from '@/components/client/property-list/property-list'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import React from 'react'
import { cookies } from 'next/headers';
import { Metadata } from 'next';

const priceFilter = (key: string): {start: number, end: number} => {
    switch (key) {
        case "1":
            return {start: 0, end: 100000}
        case "2":
            return {start: 100001, end: 500000}
        case "3":
            return {start: 500001, end: 2000000}
        case "4":
            return {start: 2000001, end: 5000000}
        case "5":
            return {start: 5000001, end: 50000000000}
        default:
            return {start: 0, end: 50000000000}
    }    
}

export const metadata: Metadata = {
    title: "Properties"
}

async function Page({
    searchParams
}:{
    searchParams: { [key: string]: string | undefined }
}) {
    const supabase = createServerComponentClient({cookies});

    const locationParams = (searchParams?.location === "all" || !searchParams?.location) ? "" : "property_location";
    const limitParams = searchParams?.limit ? parseInt(searchParams.limit) : 0;
    const propertyPerPage = 6

    const {data, count, error} = await supabase.from("property_table")
        .select('*', { count: 'exact', head: false })
        .eq(locationParams, searchParams?.location)
        .eq(searchParams?.type ? "property_type" : "", searchParams?.type)
        .eq(searchParams?.beds ? "bedroom" : "", searchParams?.beds)
        .gte(searchParams?.range ? "rent_price" : "", searchParams?.range ? priceFilter(searchParams?.range).start : "")
        .lte(searchParams?.range ? "rent_price" : "", searchParams?.range ? priceFilter(searchParams?.range).end : "")
        .range(limitParams * propertyPerPage, ((limitParams * propertyPerPage) + propertyPerPage) - 1);

    if (error){
        return <p className='py-10 text-center text-orange font-semibold text-xl'>An Error Occured</p>
    }
    
    return (
        <div className='bg-[#F7f7f7] py-10 m d:py-12'>
            <div className="mx-auto max-w-7xl">
                <div className='container mx-auto px-4 md:px-8'>
                    <h1 className='text-2xl md:text-3xl text-center md:text-left font-bold text-orange mb-6'>Search properties to rent</h1>
                    <PropertyList 
                        data={data} 
                        totalProperties={count ?? 0} 
                        showFilter={true}
                    />
                </div>
            </div>
        </div>
    )
}

export default Page