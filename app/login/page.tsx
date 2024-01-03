import Login from '@/components/authentication/login/login'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Marvris || Login"
}

function Page() {
    return (
        <div className='grid place-content-center px-4 h-full'>
            <Login />
        </div>
    )
}

export default Page