import { cn } from '@/lib/utils'
import React from 'react'
import { AspectRatio } from '../ui/aspect-ratio'
import Image, { StaticImageData } from 'next/image'
import { Bath, BedDoubleIcon } from 'lucide-react'

function HeroCard({image, price, name, location, className}:{image:StaticImageData, price:string, name:string, location:string, className:string}) {
    return (
        <div className={cn("rounded-lg overflow-hidden bg-white", className)}>
            <AspectRatio ratio={16 / 9}>
                <Image
                    src={image}
                    fill
                    alt='Demo Image'
                    placeholder='blur'
                />
            </AspectRatio>
            <div className="py-6 px-4">
                <h4 className='font-bold'><span className='text-orange text-xl'>₦{price}/</span>annum</h4>
                <p className='text-2xl font-semibold'>{name}</p>
                <span>{location}</span>
                <div className='flex items-center gap-4 pt-4 mt-5 border-t border-t-gray-500/60'>
                    <p className='flex gap-2 items-center'>
                        <BedDoubleIcon color='#FF5B19'/>
                        4
                    </p>
                    <p className='flex gap-2 items-center'>
                        <Bath color='#FF5B19'/>
                        2
                    </p>
                </div>
            </div>
        </div>
    )
}

export default HeroCard