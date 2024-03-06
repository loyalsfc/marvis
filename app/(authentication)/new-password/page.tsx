import ForgetPassword from '@/components/authentication/forget-password/forget-password'
import NewPassword from '@/components/authentication/new-password/new-password'
import React from 'react'

function Page() {
    return (
        <div className='h-screen w-full bg-white grid place-content-center'>
            <NewPassword />
        </div>
    )
}

export default Page