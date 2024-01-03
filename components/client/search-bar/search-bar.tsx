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
        <div className='flex items-end gap-4 bg-white shadow-xl w-fit p-4 rounded-md mt-8'>
            <div>
                <label htmlFor="prop-location">Location</label>
                <Input 
                    type="text" 
                    defaultValue="Lagos Nigeria"
                    className='border-none px-0 w-52' />
            </div>
            <div>
                <label htmlFor="prop-location">Propert Type</label>
                <Select>
                    <SelectTrigger className="w-52 px-0 border-none">
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
            <Button className='bg-orange'>Browse Property</Button>
        </div>
    )
}

export default SearchBar