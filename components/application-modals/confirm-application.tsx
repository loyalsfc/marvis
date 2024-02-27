'use client'

import React, { useState } from 'react'
import ModalWrapper from '../modals/wrapper'
import { PropertyUnitProps } from '@/@types'
import { supabase } from '@/utils/utils'
import { toast } from 'react-toastify'
import { CalendarIcon, Loader2 } from "lucide-react"
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
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

interface Props {
    units: PropertyUnitProps[], 
    tenantId: string, 
    propertyId:string
    slug: string
}

const FormSchema = z.object({
    unit: z.number({
        required_error: "Please select a unit for tenant.",
      }),
    rent_date: z.date({
        required_error: "Please select tenancy date.",
    }),
    duration: z.string({
        required_error: "Please select rent duration",
    })
})

function ConfirmApplication({units, tenantId, propertyId, slug}: Props) {
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const {unit: selectedUnit, rent_date: date, duration} =  data;
        setSubmitting(true);

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
        const updated = units.map((unit, index) => {
          if(parseInt(unit.unit) === selectedUnit){
            return {
              unit: index + 1,
              isAvailable: false,
              rent_date: startDate,
              rent_duration: duration,
              expiry_date: expiringDate,
              tenant: tenantId
            }
          }else{
            return unit;
          }
        })
        
        const {error: propertyTableError} = await supabase
          .from("property_table")
          .update({property_units: updated, vacant_units: updated.filter(item => item.isAvailable).length})
          .eq('id', propertyId)
        
        if(!propertyTableError){
            toast.success("Application Approved")
            setSubmitting(false)
            router.push(`/dashboard/all-properties/${slug}`);
        }
    }

    return (
        <div>
            <ModalWrapper
                modalTitle='Confirm Tenancy Application'
                btnText='Confirm Application'
                btnClass='btn btn-primary mx-auto'
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                        <FormField
                            control={form.control}
                            name="unit"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Please Select A Unit</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value.toString()}
                                            className="grid grid-cols-3 gap-3"
                                        >
                                            {units.map(item => {
                                                return(
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem disabled={!item.isAvailable} value={item.unit} />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            Unit {item.unit}
                                                        </FormLabel>
                                                    </FormItem> 
                                                )
                                            })}
                                            
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="rent_date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Rent Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full border-orange pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                            
                        <FormField
                            control={form.control}
                            name="duration"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rent Duration</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className='border-orange w-full'>
                                                <SelectValue placeholder="Select a tenancy duration" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem className='hover:bg-secondary-foreground/10' value="1">1</SelectItem>
                                            <SelectItem className='hover:bg-secondary-foreground/10' value="2">2</SelectItem>
                                            <SelectItem className='hover:bg-secondary-foreground/10' value="3">3</SelectItem>
                                            <SelectItem className='hover:bg-secondary-foreground/10' value="4">4</SelectItem>
                                            <SelectItem className='hover:bg-secondary-foreground/10' value="5">5</SelectItem>
                                            <SelectItem className='hover:bg-secondary-foreground/10' value="6">6</SelectItem>
                                            <SelectItem className='hover:bg-secondary-foreground/10' value="7">7</SelectItem>
                                            <SelectItem className='hover:bg-secondary-foreground/10' value="8">8</SelectItem>
                                            <SelectItem className='hover:bg-secondary-foreground/10' value="9">9</SelectItem>
                                            <SelectItem className='hover:bg-secondary-foreground/10' value="10">10</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                            
                        <Button type="submit" className='w-full bg-orange overflow-hidden'>{submitting ? <span className='animate-spin h-4 w-4 '/> : "Submit"} </Button>
                    </form>
                </Form>
            </ModalWrapper>
        </div>
    )
}

export default ConfirmApplication