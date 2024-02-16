import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Rubik_Puddles } from 'next/font/google'
import MobileMenu from './mobile-menu'

const rubikPuddles = Rubik_Puddles({weight: "400", subsets: ["latin"]})

function Header() {
    return (
        <header className='mx-auto max-w-7xl w-full'>
            <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">
                <Link 
                    href="/" 
                    className={cn(rubikPuddles.className, "text-2xl bg-orange px-2 text-white block rounded hover:scale-105 transition-all")}
                >
                    Mavris
                </Link>
                <nav className='hidden md:block'>
                    <ul className='flex items-center gap-8 font-medium'>
                        <li className='nav-list'><Link href="/properties">Properties</Link></li>
                        <li className='nav-list'>About Us</li>
                        <li className='nav-list'>Contact Us</li>
                    </ul>
                </nav>
                <Link className='hidden md:block' href="/dashboard">
                    <Button className='bg-orange font-medium'>Agent Dashboard</Button>
                </Link>
                <MobileMenu />
            </div>
        </header>
    )
}

export default Header