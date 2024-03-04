import Register from '@/components/authentication/register/register'
import { Metadata } from 'next'
import Image from 'next/image'
import React from 'react'
import backgroundImage from '../../public/real-estate.jpg'

export const metadata: Metadata = {
    title: "Mavris || Register"
}

function Page() {
    return (
        <div className=" max-w-[1500px] mx-auto">
            <div className='h-screen flex bg-white flex-row-reverse items-center justify-center md:items-stretch'>
                <div className='p-4 sm:p-8 h-full items-center flex'>
                    <Register />
                </div>
                <div className='relative flex-1 h-full hidden md:block'>
                    <Image
                        src={backgroundImage}
                        placeholder='blur'
                        fill
                        alt='Image'
                        className='object-cover'
                    />
                </div>
            </div>
        </div>
    )
}

export default Page