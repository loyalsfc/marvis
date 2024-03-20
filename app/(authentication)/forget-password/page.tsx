import ForgetPassword from '@/components/authentication/forget-password/forget-password'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Password Reset"
}

function Page() {
    return (
        <div className='h-screen w-full bg-white grid place-content-center'>
            <ForgetPassword />
        </div>
    )
}

export default Page