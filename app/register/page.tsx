import Register from '@/components/authentication/register/register'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Mavris || Register"
}

function Page() {
    return (
        <div className='h-full grid place-content-center'>
            <Register />
        </div>
    )
}

export default Page