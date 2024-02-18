'use client'

import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { SelectItem } from "@/components/ui/select"
  import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from '@/components/ui/button'
import PropertyCard from '../property-card/property-card'
import { getFeaturedImage } from '@/utils/utils'
import FilterDropdown from './filter-dropdown'
import { PropertyFilter } from '@/@types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

function PropertyList({data}:{data: any[] | null}) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [filters, setFilters] = useState<PropertyFilter>({
        location: "All",
        type: "",
        beds: "",
        priceRange: ""
    })

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
     
            return params.toString()
    },[searchParams])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const {location, type, beds, priceRange} = filters;
        // searchParams.delete()
        router.push(`
            /properties?${location !== "" ? 'location='+location.toLowerCase() +"&":""}${type !== "" ? 'type='+type+"$":""}${beds !== "" ? 'beds='+beds+"&":""}${priceRange !== "" ? 'range='+priceRange:""}`
        )
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFilters(prevState => {
            return {...filters, location: e.target.value}
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
                        <SelectItem value="duplex">Duplex</SelectItem>
                        <SelectItem value="flat">Flat</SelectItem>
                        <SelectItem value="Mansionette">Mansionette</SelectItem>
                        <SelectItem value="terrrace">Terrace</SelectItem>
                        <SelectItem value="single_room">Single Room</SelectItem>
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
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}

export default PropertyList