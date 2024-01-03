'use client'

import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import { Dashboard, Funnel, Help, Home, Logout, Notification, RoundedPlus, Settings } from '../icons/icons'
import Navs from './navs'
import { usePathname } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hooks'
import { login } from '@/lib/features/user/user'
import { MenuSquare } from 'lucide-react'
import { cn } from '@/utils/utils'
import { close, open } from '@/lib/features/mobilemenu/mobilemenu'

function Aside({data}:{data: any}) {
    const dispatch = useAppDispatch();
    const pathName = usePathname();
    const menu = useAppSelector(state => state.menu.value)
    const sideMenu = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        dispatch(login(data.user));
    },[])

    useEffect(()=>{
        collapseMenu();
    },[pathName])

    const collapseMenu = () => {
        dispatch(close(false));
    }

    return (
        <aside 
            className={cn('bg-dark-100 z-50 w-fit transition-all md:rounded-2xl group shadow-aside text-grey-100 pt-8 pb-4 md:px-4 h-full flex flex-col', menu && "absolute top-0 left-0 px-4")}
            ref={sideMenu}
        >
            {menu && <div onClick={collapseMenu} className='h-full w-screen absolute -z-10 bg-black/20 top-0 left-0' />}
            {!menu && <button 
                onClick={()=>dispatch(open(true))}
                className='side-menu-item sm:hidden mb-8'
            >
                <MenuSquare/>
            </button>}
            <div className={cn('hidden md:flex sm:group-hover:flex flex-col items-center pb-5', menu && 'flex')}>
                <div className='relative h-24 w-24 rounded-full overflow-hidden border mb-3'>
                    <Image
                        src="/profilePic.jpg"
                        fill
                        alt='Profile Picture'
                        className='object-cover object-top'
                    />
                </div>
                <h4 className='text-2xl font-bold leading-none text-white pb-2'>{data?.user?.user_metadata?.full_name}</h4>
                <p className='text-sm leading-none'>Real Estate Agent</p>
            </div>
            <ul className={cn('flex-1 flex flex-col gap-4 md:gap-0 sm:group-hover:gap-0', menu && "gap-0")}>
                <Navs
                    Icon={Dashboard}
                    link=''
                    text='Dashboard'
                    path={pathName}
                />
                <Navs
                    Icon={Home}
                    link='/all-properties'
                    text='All Properties'
                    path={pathName}
                />
                <Navs
                    Icon={RoundedPlus}
                    link='/new-property'
                    text='Add Property'
                    path={pathName}
                />
                <Navs
                    Icon={Funnel}
                    link='/export'
                    text='Export Properties'
                    path={pathName}
                />
                <Navs
                    Icon={Notification}
                    link='/notifications'
                    text='Notification'
                    path={pathName}
                />
                <Navs
                    Icon={Settings}
                    link='/settings'
                    text='Settings'
                    path={pathName}
                />
                <Navs
                    className='mt-auto'
                    Icon={Help}
                    link='/help-support'
                    text='Help & Support'
                    path={pathName}
                />
                <li>
                    <form action="/auth/signout" method="post">
                        <button className="side-menu-item w-full text-[#F10A0A]" type="submit">
                            <Logout/> 
                            <span className={cn('hidden md:block sm:group-hover:block', menu && "block")}>Sign out</span>
                        </button>
                    </form>
                </li>
            </ul>
        </aside>
    )
}

export default Aside