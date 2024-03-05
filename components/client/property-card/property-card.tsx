import { cn } from '@/lib/utils'
import React from 'react'
import { AspectRatio } from '../../ui/aspect-ratio'
import Image, { StaticImageData } from 'next/image'
import { Bath, BedDoubleIcon, Heart } from 'lucide-react'
import Link from 'next/link'
import { priceToString } from '@/utils/utils'

interface Props {
    image:string, 
    price:string, 
    name:string, 
    location:string,
    bed: number | null,
    bathroom: number | null,
    slug: string
}

function PropertyCard({image, price, name, location, bed, bathroom, slug}:Props) {
    return (
        <li>
            <div className={cn("rounded-lg relative bg-white border z-10 border-grey-100/50 flex flex-col hover:shadow transition-all h-full")}>
                <Link href={"/properties/"+slug}>
                    <AspectRatio ratio={16 / 9} className='rounded-t-lg overflow-hidden'>
                        <Image
                            src={image}
                            fill
                            alt='Demo Image'
                            className='object-cover hover:scale-110 transition-all'
                        />
                    </AspectRatio>
                </Link>
                <div className="py-4 lg:py-6 px-2 lg:px-4 flex flex-col flex-1 relative">
                    {/* <span className={cn("h-10 px-4 grid place-content-center rounded-md absolute z-20 -left-2.5 -top-5 bg-orange text-sm font-medium text-white", "after:content-[] after:block after:w-0 after:h-0 after:border-l-[20px] after:border-r-[20px] after:border-b-[20px] after:border-l-transparent after:border-r-transparent after:border-b-black after:-rotate-90 after:absolute after:-left-2.5 after:-bottom-2 after:-z-50")}>Now Selling</span> */}
                    <h4 className='font-bold flex items-center justify-between mb-1'>
                        <p className='flex-1 overflow-hidden'><span className='text-orange text-lg lg:text-xl'>₦{priceToString(price)}/</span>annum</p>
                        <button className="h-8 lg:h-10 w-8 lg:w-10 rounded-full border text-lg lg:text-2xl border-grey-100/50 grid place-content-center">
                            <Heart color='#FF5B19' size={20} />
                        </button>
                    </h4>
                    <Link href={"/properties/"+slug} className='lg:text-xl font-semibold capitalize hover:text-orange hover:underline'>{name}</Link>
                    <span className='mt-auto block font-medium pt-0.5 text-ellipsis overflow-hidden whitespace-nowrap text-sm lg:text-base'>{location}</span>
                    <div className='flex items-center gap-4 pt-4 mt-5 border-t border-t-gray-500/60'>
                        {bed && <p className='flex gap-2 items-center'>
                            <BedDoubleIcon color='#FF5B19'/>
                            {bed} <span className='hidden lg:inline'>bedrooms</span>
                        </p>}
                        {bathroom && <p className='flex gap-2 items-center'>
                            <Bath color='#FF5B19'/>
                            {bathroom} <span className='hidden lg:inline'>bathrooms</span>
                        </p>}
                    </div>
                </div>
            </div>
        </li>
    )
}

export default PropertyCard