import React, { ReactNode } from 'react'
import { Rubik_Puddles } from 'next/font/google'
import { cn } from '@/lib/utils'
import FooterList from '@/components/footer/footer-list'
import Header from '@/components/header/header'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const supabase = createServerComponentClient({cookies})

const rubikPuddles = Rubik_Puddles({weight: "400", subsets: ["latin"]})

async function Layout({children}:{children: ReactNode}) {
    const {data} = await supabase.auth.getUser();

    return (
        <div className='bg-white flex flex-col min-h-screen'>
            <Header userId={data.user?.id}/>
            {children}
            <footer className='mt-auto lg:px-24'>
                <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 sm:grid-cols-4 pt-4 pb-10 gap-4">
                    <div>
                        <span className={cn(rubikPuddles.className, "text-2xl bg-orange px-2 w-fit text-white block rounded")}>Mavris</span>
                    </div>
                    <div className='grid grid-cols-1 min-[344px]:grid-cols-2 sm:grid-cols-3 sm:col-span-3 gap-6'>
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