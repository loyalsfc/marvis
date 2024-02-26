'use client'

import React, { ChangeEvent, useState } from 'react'
import ModalWrapper from '../modals/wrapper'
import { PropertyUnitProps } from '@/@types'
import { supabase } from '@/utils/utils'
import { toast } from 'react-toastify'
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

function ConfirmApplication({units, tenantId}:{units: PropertyUnitProps[], tenantId: string}) {
    console.log(units)
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [submitting, setSubmitting] = useState(false);
    const [duration, setDuration] = useState('2')
    const [selectedUnit, setSelectedFile] = useState<string>("")
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedFile(e.currentTarget.value)
    }

    const confirmTenancy = async() => {
        const { error} = await supabase
            .from("tenants")
            .update({"is_approved": true})
            .eq("id", tenantId)

        if(error){
            toast.error("An error occured")
            return;
        }

        const { error: appError} = await supabase
            .from("property_applications")
            .update({"is_approved": true})
            .eq("id", tenantId)

        if(appError){
            toast.error("An error occured")
            return;
        }

        const startDate = date ? new Date(date) : new Date();
        const expiringDate = new Date(startDate.getFullYear() + parseInt(duration), startDate.getMonth(), startDate.getDate());
        setSubmitting(true);
        const updated = allUnits.map((unit, index) => {
          if(unit.unit === item.unit){
            return {
              unit: index + 1,
              isAvailable: status === "available" ? true : false,
              rent_date: status === "occupied" ? startDate : null,
              rent_duration: status === "occupied" ? duration : null,
              expiry_date: status === "occupied" ? expiringDate: null,
              tenant: status === "occupied" ? tenant : null
            }
          }else{
            return unit;
          }
        })
        
        const {error} = await supabase
          .from("property_table")
          .update({property_units: updated, vacant_units: updated.filter(item => item.isAvailable).length})
          .eq('id', property_id)
        
        if(!error){
          setSubmitting(false)
          router.refresh();
          closeBtn.current?.click();
        }
    }

    const handleDayPicker = (day: any) => {
        if(day){
            setDate(day)
        }
    }

    return (
        <div>
            <ModalWrapper
                modalTitle='Confirm Tenancy Application'
                btnText='Confirm Application'
                btnClass='btn btn-primary mx-auto'
            >
                <h4>Please select a unit</h4>
                <div className='grid grid-cols-3 gap-3'>
                    {units.map(item => {
                        return(
                            <div key={item.unit} className='flex items-center gap-1'>
                                <input 
                                    type="radio" 
                                    name="unitRadio" 
                                    id={"unit"+item.unit} 
                                    disabled={!item.isAvailable} 
                                    className='peer'
                                    onChange={handleChange}
                                    value={item.unit}
                                />
                                <label htmlFor={"unit"+item.unit} className=' peer-disabled:text-muted'>Unit {item.unit}</label>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <label htmlFor="" className='block pb-2'>Rent Date</label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[240px] justify-start text-left font-normal",
                                    !date && "text-muted-foreground border-orange"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                            mode="single"
                            selected={date}
                            onSelect={handleDayPicker}
                            initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div>
                    <Select>
                        <SelectTrigger className="w-full border-orange">
                        <SelectValue placeholder="Select Duration" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Rent Duration</SelectLabel>
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                                <SelectItem value="4">4</SelectItem>
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem value="6">6</SelectItem>
                                <SelectItem value="7">7</SelectItem>
                                <SelectItem value="8">8</SelectItem>
                                <SelectItem value="9">9</SelectItem>
                                <SelectItem value="10">10</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <button disabled={selectedUnit === ""} className='btn btn-primary  justify-center mt-4 disabled:bg-muted disabled:border-muted disabled:pointer-events-none'>Confirm</button>
            </ModalWrapper>
        </div>
    )
}

export default ConfirmApplication