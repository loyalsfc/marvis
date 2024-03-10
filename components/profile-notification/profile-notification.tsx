import Link from 'next/link'
import React from 'react'

function ProfileNotification() {
    return (
        <Link 
            href="/dashboard/settings"
            className='block px-4 py-2 text-center rounded-md bg-orange/30 font-semibold hover:underline mb-4 text-orange'
        >
            Click here to complete your profile
        </Link>
    )
}

export default ProfileNotification