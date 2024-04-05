'use client'

import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import Navs from './navs'
import { usePathname } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hooks'
import { login } from '@/lib/features/user/user'
import { BadgeHelp, Bell, FilePlus, HomeIcon, LayoutDashboard, LocateFixedIcon, LogOut, Mail, MenuSquare, PlusSquare, SettingsIcon } from 'lucide-react'
import { cn, downloadImage } from '@/utils/utils'
import { close, open } from '@/lib/features/mobilemenu/mobilemenu'

interface Props {
    data: any;
    userData: {
        profile_image: any;
        full_name: any;
    },
    unread_message: number | null
}

function Aside({
    data,
    userData,
    unread_message
}: Props) {
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
            className={cn('bg-dark-100 z-50 w-fit transition-all md:rounded-2xl group shadow-aside text-grey-100 py-4 md:px-4 h-full flex flex-col', menu && "absolute top-0 left-0 px-4")}
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
                <div className='relative h-20 w-20 rounded-full overflow-hidden border mb-3'>
                    <Image
                        src={userData?.profile_image ?downloadImage(userData?.profile_image) : "/profile-img-placeholder.png"}
                        fill
                        alt='Profile Picture'
                        className='object-cover object-top'
                    />
                </div>
                <h4 className='text-xl font-bold leading-none text-white pb-2'>{userData?.full_name}</h4>
                <p className='text-sm leading-none'>Real Estate Agent</p>
            </div>
            <ul className={cn('flex-1 flex flex-col gap-4 md:gap-0 sm:group-hover:gap-0', menu && "gap-0")}>
                <Navs
                    Icon={LayoutDashboard}
                    link=''
                    text='Dashboard'
                    path={pathName}
                />
                <Navs
                    Icon={HomeIcon}
                    link='/all-properties'
                    text='All Properties'
                    path={pathName}
                />
                <Navs
                    Icon={PlusSquare}
                    link='/new-property'
                    text='Add Property'
                    path={pathName}
                />
                <Navs
                    Icon={Mail}
                    link='/messages'
                    text='Messages'
                    path={pathName}
                    unread={unread_message}
                />
                <Navs
                    Icon={FilePlus}
                    link='/property-applications'
                    text='Applications'
                    path={pathName}
                />
                <Navs
                    Icon={LocateFixedIcon}
                    link='/booked-tours'
                    text='Booked Tours'
                    path={pathName}
                />
                <Navs
                    Icon={Bell}
                    link='/notifications'
                    text='Notification'
                    path={pathName}
                    // unread={7}
                />
                <Navs
                    Icon={SettingsIcon}
                    link='/settings'
                    text='Settings'
                    path={pathName}
                />
                <Navs
                    className='mt-auto'
                    Icon={BadgeHelp}
                    link='/help-support'
                    text='Help & Support'
                    path={pathName}
                />
                <li>
                    <form action="/auth/signout" method="post">
                        <button className="side-menu-item w-full text-[#F10A0A]" type="submit">
                            <LogOut /> 
                            <span className={cn('hidden md:block sm:group-hover:block', menu && "block")}>Sign out</span>
                        </button>
                    </form>
                </li>
            </ul>
        </aside>
    )
}

export default Aside