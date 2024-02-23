import React, { useRef, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Button } from '../ui/button'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react'
import { Calendar } from '../ui/calendar'
import { format } from 'date-fns'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '../ui/command'
import { PropertyUnitProps } from '@/@types'
import { supabase } from '@/utils/utils'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ModalWrapper from './wrapper'
import { FaEllipsisV } from 'react-icons/fa'

interface Props{
  tenant_list: {id: number, full_name: string}[];
  item: PropertyUnitProps;
  allUnits: PropertyUnitProps[];
  property_id: number
}

const formSchema = z.object({
  status: z.string({
      required_error: "Please select rent status"
  }),
  date: z.date().optional(),
  duration: z.string().min(1, {
      message: "Select rent duration",
  }),
  tenant: z.string({
      required_error: "Please select a tenant.",
  }),
})

function Modal({item, tenant_list, allUnits, property_id}:Props) {
    const [submitting, setSubmitting] = useState<boolean>(false);
    const closeBtn = useRef<HTMLButtonElement>(null);
    const router = useRouter()
    
    const tenants =  tenant_list ? tenant_list.map(item => {
      return {label: item.full_name, value: item.id.toString()}
    }) : [];

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            status: item.isAvailable ? "available" : "occupied",
            duration: '2',
            date: item.isAvailable ? new Date() : new Date(item.rent_date),
            tenant: item.isAvailable ? "" : item.tenant
        },
    })

    const formValues = form.control._formValues;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const {status, date, duration, tenant} = values;
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


    return (
          <ModalWrapper
            modalTitle={`Update Suite ${item.unit}`}
            modalDescription="Make changes to the suites. Click submit when you're done."
            Icon={FaEllipsisV}
            btnRef={closeBtn}
          >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                    <FormField
                        control={form.control}
                        name='status'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Rent Status</FormLabel>
                                <FormControl>
                                    <Select 
                                      onValueChange={field.onChange} 
                                      defaultValue={field.value}
                                    >
                                        <SelectTrigger className="w-full border-orange focus:outline-none">
                                            <SelectValue placeholder="Select Rent Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Rent Status</SelectLabel>
                                                <SelectItem value="available">Available</SelectItem>
                                                <SelectItem value="occupied">Occupied</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='date'
                        disabled={true}
                        render={({field}) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Rent Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left border-orange font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                                disabled={formValues.status === "available" ? true : false}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon color='#FF5B19' className="ml-auto h-4 w-4 opacity-50" />
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
                        name='duration'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Rent Duration</FormLabel>
                                <FormControl>
                                    <Select 
                                      onValueChange={field.onChange} 
                                      defaultValue={field.value} 
                                      disabled={formValues.status === "available" ? true : false}
                                    >
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
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                      control={form.control}
                      name="tenant"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Tenants</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  disabled={formValues.status === "available" ? true : false}
                                  variant="outline"
                                  role="combobox"
                                  className={cn(
                                    "w-[200px] justify-between border-orange",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value
                                    ? tenants.find(
                                        (tenant) => tenant.value === field.value
                                      )?.label
                                    : "Select tenant"}
                                  <ChevronsUpDown color='#FF5B19' className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                              <Command>
                                <CommandInput placeholder="Search Tenants..." />
                                <CommandEmpty>No tenant found.</CommandEmpty>
                                <CommandGroup>
                                  {tenants.map((tenant) => (
                                    <CommandItem
                                      value={tenant.label}
                                      key={tenant.value}
                                      onSelect={() => {
                                        form.setValue("tenant", tenant.value)
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          tenant.value === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {tenant.label}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            To add a new tenant detail <Link href="/dashboard/new-tenants" target='_blank' className='text-orange'>Click here</Link>
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <button 
                      type='submit' 
                      className='btn btn-primary justify-center'
                      disabled={submitting}
                    >
                      {submitting ? <div className='loader'/> : "Submit"}
                    </button>
                </form>
            </Form>
          </ModalWrapper>

    )
}

export default Modal