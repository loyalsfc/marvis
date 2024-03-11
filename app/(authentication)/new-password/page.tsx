import FormGreetings from '@/components/authentication/form-greetings/form-greetings'
import NewPassword from '@/components/authentication/new-password/new-password'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Set New Password"
}

function Page() {
    return (
        <div className='h-screen w-full bg-white grid place-content-center'>
            <div className='max-w-md p-4 shadow-lg rounded-md space-y-8'>
                <FormGreetings
                    title='Reset Password'
                    subtitle='Enter your new password'
                />
                <NewPassword />
            </div>
        </div>
    )
}

export default Page