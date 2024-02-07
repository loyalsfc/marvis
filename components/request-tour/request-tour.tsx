'use client'

import React, { useState } from 'react'
import { format } from "date-fns"
import { Calendar as CalendarIcon, LocateFixedIcon, PlaySquareIcon,HomeIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from '@/utils/utils'
import { Button } from '../ui/button'
import RequestModal from './request-modal'

enum tour  {
    VIRTUAL = "virtual",
    INPERSON = "in person"
}

function RequestTour() {
    const [date, setDate] = React.useState<Date>();
    const [tourType, setTourType] = useState<tour>(tour.VIRTUAL)
    return (
        <div className='mt-4 border-t border-t-grey-200 pt-5'>
            <h4 className='font-bold text-xl '>Request a home tour</h4>
            <div className='py-4 mb-2 grid grid-cols-2 gap-4'>
                <button
                    onClick={()=>setTourType(tour.INPERSON)} 
                    className={cn('tour-btn', tourType === tour.INPERSON && "active-tour")}
                >
                    <HomeIcon size={18}/> In Person
                </button>
                <button
                    onClick={()=>setTourType(tour.VIRTUAL)} 
                    className={cn('tour-btn', tourType === tour.VIRTUAL && "active-tour")}
                >
                    <PlaySquareIcon size={18}/> Virtual 
                </button>
            </div>

            <div>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal flex",
                                !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span className='block py-2'>Select Tour Date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>

            <RequestModal />
            
            <span className='text-sm font-medium'>It's free, with no obligation - cancel anytime</span>
        </div>
    )
}

export default RequestTour