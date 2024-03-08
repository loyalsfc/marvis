"use client"

import { cn } from '@/lib/utils'
import { MenuIcon, X } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from '../ui/button'

function MobileMenu() {
    const [showMenu, setShowMenu] = useState(false)
    return (
        <div className='md:hidden'>
            <button 
                onClick={()=>setShowMenu(true)}
                className='md:hidden h-8 w-8 grid place-content-center rounded-md hover:bg-orange/40 transition-all'
            >
                <MenuIcon size={24} />
            </button>
            <div className={cn("fixed h-screen w-full md:hidden top-0 transition-all bg-primary z-50 flex items-center justify-center", showMenu ? "left-0": "-left-full")}>
                <button 
                    onClick={()=>setShowMenu(false)}
                    className='md:hidden h-8 w-8 grid place-content-center rounded-md hover:bg-orange/40 transition-all absolute top-8 right-8'
                >
                    <X color='#FFF' size={24} />
                </button>
                <nav className=''>
                    <ul className='flex flex-col items-center justify-center font-medium gap-6 text-white'>
                        <li className=''><Link href="/properties">Properties</Link></li>
                        <li className=''><Link href="/saves">Saves</Link></li>
                        <li className=''><Link href="/about-us">About Us</Link></li>
                        <li className=''><Link href="/contact-us">Contact Us</Link></li>
                    </ul>
                    <Link className='block mx-auto w-fit pt-6' href="/dashboard">
                        <Button className='bg-orange font-medium'>Agent Dashboard</Button>
                    </Link>
                </nav>
            </div>
        </div>
    )
}

export default MobileMenu