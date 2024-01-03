import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function NotFound() {
    return (
        <div className='h-full flex flex-col items-center text-center justify-center page-wrapper'>
            <div className='w-1/2 aspect-[1.5/1] relative'>
                <Image
                    src="/undraw_page_not_found_re_e9o6.svg"
                    fill
                    alt='404 illustration'
                />
            </div>
            <h3 className='font-bold text-4xl py-8'>Page Not Found</h3>
            <Link className='btn btn-primary w-fit' href="/">Return to Dashboard</Link>
        </div>
    )
}

export default NotFound