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
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function SearchBar() {
    return (
        <form className='flex flex-col sm:flex-row items-end gap-4 bg-white shadow-xl w-full md:w-fit p-4 rounded-md mt-8'>
            <div className='w-full'>
                <label htmlFor="prop-location" className='font-medium'>Location</label>
                <Input 
                    type="text" 
                    defaultValue="Lagos Nigeria"
                    className='w-full md:w-52 focus:border focus:border-orange' />
            </div>
            <div className='w-full'>
                <label htmlFor="prop-location" className='font-medium'>Propert Type</label>
                <Select>
                    <SelectTrigger className="w-full md:w-52">
                        <SelectValue placeholder="Select Property Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectLabel>Type</SelectLabel>
                        <SelectItem value="apple">Duplex</SelectItem>
                        <SelectItem value="banana">Flat</SelectItem>
                        <SelectItem value="blueberry">Mansionette</SelectItem>
                        <SelectItem value="grapes">Terrace</SelectItem>
                        <SelectItem value="pineapple">Single Room</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <Button className='bg-orange w-full md:w-fit'>Browse Property</Button>
        </form>
    )
}

export default SearchBar