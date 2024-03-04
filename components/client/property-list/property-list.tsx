'use client'

import React, { ChangeEvent, FormEvent, useState } from 'react'
import { SelectItem } from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import PropertyCard from '../property-card/property-card'
import { getFeaturedImage } from '@/utils/utils'
import FilterDropdown from './filter-dropdown'
import { PropertyFilter } from '@/@types'
import {useRouter, useSearchParams} from 'next/navigation'
import PropertyPagination from './pagination'

function PropertyList({data, totalProperties}:{data: any[] | null, totalProperties: number}) {
    const router = useRouter();
    const searchParams = useSearchParams()
    const [filters, setFilters] = useState<PropertyFilter>({
        location: searchParams.get("location") ?? "All",
        type: searchParams.get("type") ?? "",
        beds: searchParams.get("beds") ?? "",
        priceRange: searchParams.get("range") ?? ""
    })
    const propertyPerPage = 6;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const {location, type, beds, priceRange} = filters;
        router.push(`
            /properties?${location !== "" ? 'location='+location.toLowerCase() +"&":""}${type !== "" ? 'type='+type+"&":""}${beds !== "" ? 'beds='+beds+"&":""}${priceRange !== "" ? 'range='+priceRange:""}`
        )
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFilters(prevState => {
            return {...prevState, location: e.target.value}
        })
    }

    return (
        <div className='space-y-10'>
            <form onSubmit={handleSubmit} className='w-full py-4 px-6 lg:px-8 bg-[#FFF] shadow-md'>
                <div className='flex flex-col md:flex-row justify-between items-center max-w-full overflow-hidden'>
                    <div className='flex flex-col search-filteritem md:pr-1 md:pl-0'>
                        <label htmlFor="location" className=' text-grey-100 font-semibold'>Location</label>
                        <input 
                            type="text" 
                            value={filters.location}
                            onChange={handleChange}
                            className='text-primary font-bold border border-input md:border-transparent px-1 rounded-md py-2 focus:border-orange'/>
                    </div>
                    <FilterDropdown 
                        id="type"
                        label="Property Type"
                        placeholder="Select Property Type" 
                        selectlabel="Type"
                        filter={filters}
                        changeHandler={setFilters}
                    >
                        <SelectItem value="office">Office</SelectItem>
                        <SelectItem value="shop">Shop</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="detached_house">Detached House</SelectItem>
                        <SelectItem value="flat">Flat</SelectItem>
                        <SelectItem value="massionette">Massionette</SelectItem>
                        <SelectItem value="self_contain">Self Contain</SelectItem>
                        <SelectItem value="single_family">Single Family</SelectItem>
                        <SelectItem value="terrace">Terrace</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                    </FilterDropdown>
                    <FilterDropdown 
                        id="beds"
                        label="Number of Rooms"
                        placeholder="Select number of rooms" 
                        selectlabel="Rooms"
                        filter={filters}
                        changeHandler={setFilters}
                    >
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                    </FilterDropdown>
                    <FilterDropdown 
                        id="priceRange"
                        label="Price Range"
                        placeholder="Select Price Range" 
                        selectlabel="Ranges"
                        className='border-r-0 min-[966px]:border-r'
                        filter={filters}
                        changeHandler={setFilters}
                    >
                        <SelectItem value="1"> {"<"} 100,0000 </SelectItem>
                        <SelectItem value="2">100,001 {"<"} 500,0000</SelectItem>
                        <SelectItem value="3">500,001 {"<"} 2,000,000</SelectItem>
                        <SelectItem value="4">2,000,0001 {"<"} 10,000,000</SelectItem>
                        <SelectItem value="5">{">"} 10,000,000</SelectItem>
                    </FilterDropdown>
                    <div className='pl-4 lg:pl-8 hidden min-[966px]:block'>
                        <Button className='bg-orange font-medium px-8' >Search</Button>
                    </div>
                </div>
                <div className='min-[966px]:hidden md:pt-4'>
                    <Button className='bg-orange font-medium px-8 w-full' >Search</Button>
                </div>
            </form>
            <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-8 gap-4 lg:gap-8'>
                {data?.map(item => {
                    return <PropertyCard
                        slug={item.slug}
                        key={item.id}
                        image={getFeaturedImage(item.property_image) ?? ""}
                        price={item.rent_price}
                        name={item.property_title}
                        location={item.property_address}
                        bed={item.bedroom}
                        bathroom={item.bath}
                    />
                })}
            </ul>
            {data?.length === 0 && <div>
                <p className='text-center py-10 text-primary font-bold text-2xl'>No Property Found</p>
            </div>}
           {data && <PropertyPagination 
                        totalProperties={totalProperties}
                        itemsPerPage={propertyPerPage}
                        path='/properties' 
                    />}
        </div>
    )
}

export default PropertyList