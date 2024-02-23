'use client'

import { PropertyProps } from '@/@types'
import { Button } from '@/components/ui/button'
import { cn, downloadImage, priceToString } from '@/utils/utils'
import { Bath, BedDoubleIcon, CalendarDaysIcon, Check, CheckCircle2, FileDigitIcon, FileTextIcon, ImageIcon, Phone, Share2 } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { FaHeart } from 'react-icons/fa'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import RequestTour from '@/components/request-tour/request-tour'
import MessageModal from './ask-question/question-modal'
import PropertyInfoCard from './property-info-card'

interface Props {
    data: PropertyProps[] | null;
    slug: string
}

function PropertyPage({data, slug}:Props) {
    const pathName = usePathname();

    const {created_at, property_type, property_title, property_address, property_location, property_image, bedroom, bath, year_built, units, property_description, additional_details, agents_table, rent_price, features, agent_id} = data![0]
    
    return (
        <div>
            <div className='flex flex-col sm:flex-row items-center gap-4 pt-4'>
                <div className='w-full'>
                    <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-orange'>{property_title}</h2>
                    <span className='text-sm sm:text-base capitalize font-medium'>{property_address}, {property_location}</span>
                </div>
                <div className='flex gap-4 w-full sm:w-fit sm:ml-auto'>
                    <Button className='property-btn'><Share2 /> Share</Button>
                    <Button className='property-btn'><FaHeart/> Favorites</Button>
                </div>
            </div>

            <ul className={cn("grid gap-4 md:gap-6 py-10", property_image.length === 2 && "grid-cols-2", property_image.length > 2 && "grid-cols-12")}>
                {property_image.map((item, index) => {
                    if(index > 2) return
                    return(
                        <li key={index} className={cn("relative rounded group aspect-video overflow-hidden", property_image.length > 2 && "col-span-6 sm:col-span-4 first:col-span-12 sm:first:col-span-8 first:row-span-2")}>
                            <Image
                                key={index}
                                src={downloadImage(item.url, "property_images")}
                                fill
                                alt='Property Image'
                                className='object-cover'
                            />
                            <Link href={pathName + "?gallery-view=2"} className='hidden group-last:flex items-center font-bold text-xs sm:text-sm p-2 sm:px-4 gap-0.5 sm:gap-1 rounded bg-white  hover:bg-orange hover:text-white transition-all z-10 absolute bottom-2 md:bottom-4 right-2 md:right-4'>
                                <ImageIcon color='#FF5B19' size={16}/> 
                                View All Photos
                            </Link>
                        </li>
                    )
                })}
            </ul>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className=' md:col-span-8'>
                    <div className='flex justify-between gap-6 py-6 px-4 sm:px-6 mb-10 bg-grey-200 rounded-lg flex-wrap'>
                        {bedroom && <PropertyInfoCard Icon={BedDoubleIcon} title='Bedroom' count={bedroom} />}
                        {bath && <PropertyInfoCard Icon={Bath} title='Bath' count={bath} /> }
                        <PropertyInfoCard Icon={CheckCircle2} title='Active' count={"Active"} />
                        {year_built && <PropertyInfoCard Icon={CalendarDaysIcon} title='Year Built' count={year_built} />}
                        <PropertyInfoCard Icon={FileDigitIcon} title='Units' count={units} />
                    </div>
                    
                    <article>
                        <h4 className='font-bold text-xl mb-2'>About this home</h4>
                        <div dangerouslySetInnerHTML={{ __html: property_description }} />
                    </article>

                    <div className='border border-grey-100 bg-grey-100/5 px-6 py-6 sm:py-4 rounded mt-8'>
                        <p className='font-semibold mb-6'>Listed by property owner</p>
                        <div>
                            <div className='flex sm:items-center flex-col sm:flex-row gap-3 lg:gap-4'>
                                <div className='flex gap-3 lg:gap-4'>
                                    <div className='h-16 w-16 rounded-full overflow-hidden relative'>
                                        <Image
                                            src={downloadImage(agents_table ? agents_table?.profile_image : "")}
                                            fill
                                            alt='God is good'
                                        />
                                    </div>
                                    <div className='mr-auto'>
                                        <h5 className='font-bold text-lg'>{agents_table?.full_name}</h5>
                                        <span className='text-sm font-semibold'>{agents_table?.agency_name}</span>
                                    </div>
                                </div>
                                <div className='ml-auto w-full sm:w-fit flex flex-col sm:flex-row md:flex-col min-[928px]:flex-row min-[928px]:items-center items-stretch gap-3 sm:gap-1 min-[928px]:gap-3 lg:gap-4 pt-4 sm:pt-0'>
                                    <MessageModal 
                                        slug={slug}
                                        agentId={agent_id}
                                    />
                                    <Link href={"tel:"+agents_table?.phone_number} className='block'>
                                        <Button className='text-orange bg-orange/20 font-medium gap-2 w-full'>
                                            <Phone /> Call Agent
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:col-span-4 border border-grey-100/50 rounded p-4">
                    <span className='font-semibold'>Rent price</span>
                    <h3 className='font-semibold mb-3   '><span className='text-orange font-bold text-2xl'>₦{priceToString(rent_price)}</span>/year</h3>
                    <Link href={pathName + "/apply"}>
                        <Button 
                            className='bg-orange text-white font-semibold w-full gap-1'
                        >
                            <FileTextIcon size={18}/> Apply Now
                        </Button>
                    </Link>
                    <RequestTour slug={slug} agentId={agent_id} />
                </div>
                <div className='md:col-span-8'>
                    <div className='py-8 border-t border-b border-grey-100/50 mt-6'>
                        <h4 className='font-bold text-xl mb-2'>Rental Properties</h4>
                        <div className='sm:w-1/2'>
                            <table className='w-full'>
                                <tbody>
                                    <tr>
                                        <td className='py-1.5 font-medium'>Listed on Mavris</td>
                                        <td className='property-details'>{new Date(created_at).toLocaleDateString()}</td>
                                    </tr>
                                    <tr>
                                        <td className='py-1.5 font-medium'>Type</td>
                                        <td className='property-details capitalize'>{property_type.replace("_", " ")}</td>
                                    </tr>
                                    <tr>
                                        <td className='py-1.5 font-medium'>City</td>
                                        <td className='property-details'>{property_location}</td>
                                    </tr>
                                    <tr>
                                        <td className='py-1.5 font-medium'>Year Built</td>
                                        <td className='property-details'>{year_built}</td>
                                    </tr>
                                    <tr>
                                        <td className='py-1.5 font-medium'>Deposit & Fee</td>
                                        <td className='property-details'>₦{priceToString(rent_price)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {(features && features?.length > 0) &&<>
                            <h4 className='font-bold text-xl mb-2 mt-8'>Rental Features</h4>
                            <ul>
                                {features?.map((item, index) => {
                                    return <li key={index}>{item}</li>
                                })}
                            </ul>
                        </>}
                        {additional_details.length > 0 && (additional_details[0].title !== "" && additional_details[0].value !== "") && <>
                            <h4 className='font-bold text-xl mb-2 mt-8'>Additional Features</h4>
                            <table className=''>
                                <tbody>
                                    {additional_details.map((item, index) => {
                                        if(item.title === "" && item.value === "") return;
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
                        </>}
                    </div>
                    <p className='font-medium py-4'>
                        You are agree to mavris' Terms of Use & Privacy Policy. By choosing to contact a property, you also agree theat Estatery Group, landlords, and property managers may call or text yoou about any inquiries you submit through our services, which may involve use of automated means and prerecorded/articial voices. You don't need to consent as a condition of renting any property, or buying any other goods or services. Message/data rates may apply.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PropertyPage