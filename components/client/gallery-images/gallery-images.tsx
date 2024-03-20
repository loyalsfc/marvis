'use client'

import { PropertyProps } from '@/@types';
import { downloadImage } from '@/utils/utils';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Virtual, Zoom } from 'swiper/modules';
import { X } from 'lucide-react';

function GalleryImages({galleryImages}:{galleryImages: PropertyProps["property_image"]}) {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const router = useRouter()
    const showGallery = searchParams.has('gallery-view');

    const hideGallery = () => {
        //Hide gallery by removing the search parameters
        router.push(pathName);
    }
    return (
        <>
            {showGallery && <div className='h-screen w-full fixed top-0 left-0 z-[100]'>
                <div onClick={hideGallery} className='h-full w-full absolute top-0 left-0 bg-black/90' />
                <div className='h-full w-full px-20 py-10'>
                    <button 
                        onClick={hideGallery} 
                        className='absolute top-4 right-4 h-8 w-8 grid place-content-center hover:bg-slate-700 hover:text-white'
                    >
                        <X />
                    </button>
                    <Swiper
                        navigation={true} 
                        modules={[Navigation, Virtual]} 
                        className="mySwiper"
                    >
                        {galleryImages.map((item, index) => {
                            return(
                                <SwiperSlide>
                                    <span className='absolute top-4 left-4'>{index+1}/{galleryImages.length}</span>
                                    <div className='h-full w-full relative shrink-0 transition-all'>
                                        <Image
                                            src={downloadImage(item.url, "property_images")}
                                            fill
                                            alt='Property Image'
                                            className='object-contain'
                                        />
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
            </div>}
        </>
    )
}

export default GalleryImages