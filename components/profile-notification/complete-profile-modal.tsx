import React from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'

function CompleteProfileModal() {
    return (
        <div className='h-full w-full fixed grid place-content-center top-0 left-0 z-50'>
            <div className="h-full w-full absolute top-0 left-0 backdrop-blur-sm bg-black/40"/>
            <div className="max-w-md w-full bg-white rounded-md p-8 z-50 font-medium text-center space-y-4">
                <p className='text-lg'>Please complete your profile to continue</p>
                <Link href='/dashboard/settings' className='mx-auto block'>
                    <Button className='bg-orange'>
                        Profile Settings
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default CompleteProfileModal