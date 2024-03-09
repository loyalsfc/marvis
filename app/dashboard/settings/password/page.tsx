import NewPassword from '@/components/authentication/new-password/new-password'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: "New Password"
}

function Page() {
  return (
    <div className='max-w-sm'>
      <NewPassword />
    </div>
  )
}

export default Page