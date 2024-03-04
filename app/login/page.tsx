import Login from '@/components/authentication/login/login'
import { Metadata } from 'next'
import React from 'react'
import backgroundImage from '../../public/real-estate.jpg'
import Image from 'next/image'

export const metadata: Metadata = {
    title: "Marvris || Login"
}

function Page() {
    return (
        <div className=" max-w-[1500px] mx-auto">
            <div className='h-screen flex bg-white items-center justify-center md:items-stretch'>
                <div className='p-4 sm:p-8 h-full items-center flex'>
                    <Login />
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