import { Button } from '@/components/ui/button'
import { Metadata } from 'next'
import Link from 'next/link'
import React, { ReactNode } from 'react'

export const metadata: Metadata = {
    title: "Profile Settings"
}

function SettingsLayout({
    children
}:{
    children: ReactNode
}) {
    return (
        <div className='page-wrapper h-full flex'>
            <aside className='w-fit border-r border-r-orange h-full pr-8'>
                <nav className='flex flex-col gap-4'>
                    <Link href={"/dashboard/settings"}>
                        <Button variant={"ghost"} className='text-xl font-semibold'>
                            Profile
                        </Button>
                    </Link>
                    <Link href={"/dashboard/settings/password"}>
                        <Button variant={"ghost"} className='text-xl font-semibold'>
                            Password
                        </Button>
                    </Link>
                </nav>
            </aside>
            <main className='flex-1 h-full px-8 overflow-scroll'>{children}</main>
        </div>
    )
}

export default SettingsLayout