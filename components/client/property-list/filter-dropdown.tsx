'use client'

import { PropertyFilter } from '@/@types';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils';
import React, { Dispatch, ReactNode, SetStateAction } from 'react'

interface Props {
    id: "type" | "beds" | "priceRange";
    label: string;
    placeholder: string;
    className?: string;
    selectlabel: string;
    children: ReactNode;
    filter: PropertyFilter
    changeHandler: Dispatch<SetStateAction<PropertyFilter>>
}

function FilterDropdown({
    id, 
    label, 
    placeholder, 
    className, 
    selectlabel, 
    children, 
    filter,
    changeHandler
}: Props) {

    const handleChange = (value: string) => {
        changeHandler(prevState => {
            return {...prevState, [id]: value}
        })
    }

    return (
        <div className={cn('search-filteritem', className)}>
            <label htmlFor={id} className='text-sm font-semibold text-grey-100'>{label}</label>
            <Select onValueChange={handleChange} value={filter[id]}>
                <SelectTrigger className="md:w-52 px-2 md:px-0 md:border-none font-bold text-primary border">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>{selectlabel}</SelectLabel>
                        {children}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default FilterDropdown