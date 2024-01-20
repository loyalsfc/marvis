'use client'

import { PropertyProps } from '@/@types'
import { Button } from '@/components/ui/button'
import { cn, downloadImage, getFeaturedImage } from '@/utils/utils'
import { Bath, BedDoubleIcon, CalendarDaysIcon, Check, CheckCircle2, FileDigitIcon, FileTextIcon, HomeIcon, ImageIcon, InfoIcon, LocateFixedIcon, PlaySquareIcon, Share2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { FaHeart } from 'react-icons/fa'
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
    data: PropertyProps[] | null
}


function PropertyPage({data}:Props) {
    const [date, setDate] = React.useState<Date>();
    const pathName = usePathname();

    const {created_at, property_type, property_title, property_address, property_location, property_image, bedroom, bath, year_built, units, property_description, additional_details, agents_table, rent_price, features} = data![0]
    
    return (
        <div>
            <div className='flex items-center gap-4'>
                <h2 className='text-3xl font-bold text-orange'>{property_title}</h2>
                <Button className='ml-auto bg-grey-200 border border-orange text-orange gap-2 hover:bg-orange hover:text-white'><Share2 /> Share</Button>
                <Button className=' bg-grey-200 border border-orange text-orange gap-2 hover:bg-orange hover:text-white'><FaHeart/> Favorites</Button>
            </div>
            <span className=' capitalize font-medium'>{property_address}, {property_location}</span>

            <ul className={cn("grid gap-6 py-10", property_image.length === 2 && "grid-cols-2", property_image.length > 2 && "grid-cols-12")}>
                {property_image.map((item, index) => {
                    if(index > 2) return
                    return(
                        <div className={cn("relative rounded group aspect-video overflow-hidden", property_image.length > 2 && "col-span-4 first:col-span-8 first:row-span-2")}>
                            <Image
                                key={index}
                                src={downloadImage(item.url, "property_images")}
                                fill
                                alt='Property Image'
                                className='object-cover'
                            />
                            <Link href={pathName + "?gallery-view=2"} className='hidden group-last:flex items-center font-bold text-sm px-4 py-2 gap-1 rounded bg-white  hover:bg-orange hover:text-white transition-all z-10 absolute bottom-4 right-4'>
                                <ImageIcon color='#FF5B19' size={18}/> 
                                View All Photos
                            </Link>
                        </div>
                    )
                })}
            </ul>
            <div className="grid grid-cols-12 gap-6 items-start">
                <div className=' col-span-8'>
                    <div className='flex justify-between p-6 mb-10 bg-grey-200 rounded-lg'>
                        {bedroom && 
                            <div>
                                <p className='font-semibold mb-1'>Bedroom</p>
                                <span className='flex items-center gap-1'><BedDoubleIcon />  {bedroom}</span>
                            </div>
                        }
                        {bath && 
                            <div>
                                <p className='font-semibold mb-1'>Bath</p>
                                <span className='flex items-center gap-1'><Bath />  {bath}</span>
                            </div>
                        }
                        <div>
                            <p className='font-semibold mb-1'>Bath</p>
                            <span className='flex items-center gap-1'><CheckCircle2 /> Active</span>
                        </div>
                        {year_built && 
                            <div>
                                <p className='font-semibold mb-1'>Year Built</p>
                                <span className='flex items-center gap-1'><CalendarDaysIcon />  {year_built}</span>
                            </div>
                        }
                        <div>
                            <p className='font-semibold mb-1'>Units</p>
                            <span className='flex items-center gap-1'><FileDigitIcon /> {units}</span>
                        </div>
                    </div>
                    
                    <article>
                        <h4 className='font-bold text-xl mb-2'>About this home</h4>
                        <p>{property_description}</p>
                    </article>

                    <div className='border border-grey-100 bg-grey-100/5 px-6 py-4 rounded mt-8'>
                        <p className='font-semibold mb-6'>Listed by property owner</p>
                        <div>
                            <div className='flex items-center gap-4'>
                                <div className='h-16 w-16 rounded-full overflow-hidden relative'>
                                    <Image
                                        src={downloadImage(agents_table ? agents_table?.profile_image : "")}
                                        fill
                                        alt='God is good'
                                    />
                                </div>
                                <div>
                                    <h5 className='font-bold text-lg'>{agents_table?.full_name}</h5>
                                    <span className='text-sm font-semibold'>{agents_table?.agency_name}</span>
                                </div>
                                <Button className='text-orange bg-orange/20 font-medium ml-auto'>Ask a question</Button>
                                <Button className='text-orange bg-orange/20 font-medium gap-2'><InfoIcon /> Get more info</Button>
                            </div>
                        </div>
                    </div>
                    <div className='py-8 border-t border-b border-grey-100/50 mt-6'>
                        <h4 className='font-bold text-xl mb-2'>Rental Properties</h4>
                        <div className='w-1/2'>
                            <table className='w-full'>
                                <tbody>
                                    <tr>
                                        <td className='py-1.5 font-medium'>Listed on Mavris</td>
                                        <td className='py-1.5 font-semibold text-orange text-end px-8'>{new Date(created_at).toLocaleDateString()}</td>
                                    </tr>
                                    <tr>
                                        <td className='py-1.5 font-medium'>Type</td>
                                        <td className='py-1.5 font-semibold text-orange text-end px-8 capitalize'>{property_type.replace("_", " ")}</td>
                                    </tr>
                                    <tr>
                                        <td className='py-1.5 font-medium'>City</td>
                                        <td className='py-1.5 font-semibold text-orange text-end px-8'>{property_location}</td>
                                    </tr>
                                    <tr>
                                        <td className='py-1.5 font-medium'>Year Built</td>
                                        <td className='py-1.5 font-semibold text-orange text-end px-8'>{year_built}</td>
                                    </tr>
                                    <tr>
                                        <td className='py-1.5 font-medium'>Deposit & Fee</td>
                                        <td className='py-1.5 font-semibold text-orange text-end px-8'>₦{rent_price}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h4 className='font-bold text-xl mb-2 mt-8'>Rental Features</h4>
                        <ul>
                            {features?.map((item, index) => {
                                return <li key={index}>{item}</li>
                            })}
                        </ul>
                        <h4 className='font-bold text-xl mb-2 mt-8'>Additional Features</h4>
                        <table className=''>
                            <tbody>
                                {additional_details.map((item, index) => {
                                    return (
                                        <tr key={item.id}>
                                            <td><Check size={18}/> </td>
                                            <td className='px-4'>{item.title}</td>
                                            <td>{item.value}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    <p className='font-medium py-4'>
                        You are agree to mavris' Terms of Use & Privacy Policy. By choosing to contact a property, you also agree theat Estatery Group, landlords, and property managers may call or text yoou about any inquiries you submit through our services, which may involve use of automated means and prerecorded/articial voices. You don't need to consent as a condition of renting any property, or buying any other goods or services. Message/data rates may apply.
                    </p>
                </div>
                <div className="col-span-4 border border-grey-100/50 rounded p-4">
                    <span className='font-semibold'>Rent price</span>
                    <h3 className='font-semibold mb-3   '><span className='text-orange font-bold text-2xl'>₦{rent_price}</span>/year</h3>
                    <Button className='bg-orange text-white font-semibold w-full gap-1'><FileTextIcon size={18}/> Apply Now</Button>

                    <div className='mt-4 border-t border-t-grey-200 pt-5'>
                        <h4 className='font-bold text-xl '>Request a home tour</h4>
                        <div className='py-4 mb-2 grid grid-cols-2 gap-4'>
                            <button className='tour-btn'><HomeIcon size={18}/> In Person</button>
                            <button className='tour-btn active-tour'><PlaySquareIcon size={18}/> Virtual </button>
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

                        <Button className='w-full bg-orange my-4 font-semibold gap-2'>
                            <LocateFixedIcon/> Request Tour
                        </Button>
                        
                        <span className='text-sm font-medium'>It's free, with no obligation - cancel anytime</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PropertyPage