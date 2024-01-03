import React, { ReactNode } from 'react'
import { Rubik_Puddles } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import FooterList from '@/components/footer/footer-list'

const rubikPuddles = Rubik_Puddles({weight: "400", subsets: ["latin"]})

function Layout({children}:{children: ReactNode}) {
    return (
        <div className='bg-white flex flex-col min-h-screen'>
            <header className='mx-auto max-w-7xl w-full'>
                <div className="container mx-auto flex items-center justify-between py-4">
                    <Link href="/" className={cn(rubikPuddles.className, "text-2xl bg-orange px-2 text-white block rounded")}>Mavris</Link>
                    <nav>
                        <ul className='flex items-center gap-8 font-medium'>
                            <li className='nav-list'><Link href="/properties">Properties</Link></li>
                            <li className='nav-list'>About Us</li>
                            <li className='nav-list'>Contact Us</li>
                        </ul>
                    </nav>
                    <Link href="/dashboard">
                        <Button className='bg-orange font-medium'>Agent Dashboard</Button>
                    </Link>
                </div>
            </header>
            {children}
            <footer className='mt-auto lg:px-24'>
                <div className="container mx-auto grid grid-cols-4 pt-4 pb-10">
                    <div>
                        <span className={cn(rubikPuddles.className, "text-2xl bg-orange px-2 w-fit text-white block rounded")}>Mavris</span>
                    </div>
                    <div className='flex justify-between col-span-3'>
                        <FooterList
                            title="ABOUT"
                            list={["Company", "How it works", "Contact", "Investors"]}
                        />
                        <FooterList
                            title="RESOURCES"
                            list={["Blog", "Guides", "FAQ", "Help Center"]}
                        />
                        <FooterList
                            title="TERMS & PRIVACY"
                            list={["Trust & Safety", "Terms of Servie", "Privacy Policy"]}
                        />
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Layout