import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
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

function PropertyList({data}:{data: any[] | null}) {
    return (
        <div className='space-y-10'>
            <div className='py-4 px-8 bg-[#FFF] shadow-md flex justify-between items-center'>
                <div className='flex flex-col border-r border-grey-100 flex-1'>
                    <label htmlFor="location" className=' text-grey-100'>Location</label>
                    <input type="text" defaultValue="All" className=' text-primary font-bold py-2'/>
                </div>
                <div className='border-r border-grey-100 px-8 flex-1'>
                    <label htmlFor="prop-location" className='text-sm font-semibold text-grey-100'>Property Type</label>
                    <Select>
                        <SelectTrigger className="w-52 px-0 border-none font-bold text-primary">
                            <SelectValue placeholder="Select Property Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Type</SelectLabel>
                                <SelectItem value="duplex">Duplex</SelectItem>
                                <SelectItem value="flat">Flat</SelectItem>
                                <SelectItem value="Mansionette">Mansionette</SelectItem>
                                <SelectItem value="terrrace">Terrace</SelectItem>
                                <SelectItem value="single_room">Single Room</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className='border-r border-grey-100 px-8 flex-1'>
                    <label htmlFor="prop-location" className='text-sm font-semibold text-grey-100'>Number of Rooms</label>
                    <Select>
                        <SelectTrigger className="w-52 p-0 border-none font-bold text-primary">
                            <SelectValue  className='font-bold text-primary' placeholder="Select Room number" />
                        </SelectTrigger>
                        <SelectContent className='font-bold text-primary'>
                            <SelectGroup>
                                <SelectLabel>Rooms</SelectLabel>
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                                <SelectItem value="4">4</SelectItem>
                                <SelectItem value="5">5</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className='border-r border-grey-100 px-8 flex-1'>
                    <label htmlFor="prop-location" className='text-sm font-semibold text-grey-100'>Price Range</label>
                    <Select>
                        <SelectTrigger className="w-52 p-0 border-none font-bold text-primary">
                            <SelectValue  className='font-bold text-primary' placeholder="Select Price Range" />
                        </SelectTrigger>
                        <SelectContent className='font-bold text-primary'>
                            <SelectGroup>
                                <SelectLabel>Ranges</SelectLabel>
                                <SelectItem value="1"> {"<"} 100,0000 </SelectItem>
                                <SelectItem value="2">100,001 {"<"} 500,0000</SelectItem>
                                <SelectItem value="3">500,001 {"<"} 2,000,000</SelectItem>
                                <SelectItem value="4">2,000,0001 {"<"} 10,000,000</SelectItem>
                                <SelectItem value="5">{">"} 10,000,000</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className='pl-8'>
                    <Button className='bg-orange font-medium px-8' >Search</Button>
                </div>
            </div>
            <ul className='grid grid-cols-3 gap-8'>
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