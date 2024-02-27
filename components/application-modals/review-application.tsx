'use client'

import React, { useRef, useState } from 'react'
import { AspectRatio } from '../ui/aspect-ratio'
import Image from 'next/image'
import { downloadImage } from '@/utils/utils'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

function ReviewApplication({userIdentification}:{userIdentification: string}) {
    const [_, setShowId] = useState<boolean>(false);
    const modalRef = useRef<HTMLDivElement>(null)
    const modalContentRef = useRef<HTMLDivElement>(null)

    const showId = () => {
        modalRef.current?.classList.remove("hidden")
        setTimeout(() => {
            modalContentRef.current?.classList.remove("scale-0")
        }, 100);
    }

    const hideId = () => {
        setTimeout(() => {
            modalContentRef.current?.classList.add("scale-0")
        }, 3000);
        modalRef.current?.classList.add("hidden")
    }

    return (
        <div>
            <div className="max-w-[450px] mx-auto mb-8 sm:my-8 relative">
                <AspectRatio ratio={3.375 / 2.125} onClick={showId} className='hover:scale-105 cursor-pointer transition-all'>
                    <Image src={downloadImage(userIdentification, "identity_cards")} fill alt="Image" className="rounded-md object-contain" />
                </AspectRatio>
            </div>

            <div ref={modalRef} className={cn("fixed h-screen w-full top-0 left-0 z-50 hidden")}>
                <div 
                    onClick={hideId} 
                    className={cn("absolute top-0 left-0 h-full w-full bg-primary/40 backdrop-blur-sm")}
                    
                />
                <button 
                    className='absolute top-4 sm:top-8 right-4 sm:right-8 h-10 w-10 grid text-white place-content-center hover:bg-orange hover:text-white rounded-full z-50' 
                    onClick={hideId}
                >
                    <X/>
                </button>
                <div ref={modalContentRef} className=" w-11/12 sm:w-2/3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 transition-all">
                    <AspectRatio ratio={3.375 / 2.125}>
                        <Image src={downloadImage(userIdentification, "identity_cards")} fill alt="Image" className="rounded-md object-contain" />
                    </AspectRatio>
                </div>
            </div>
        </div>
    )
}

export default ReviewApplication