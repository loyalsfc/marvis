import { useAppSelector } from '@/lib/hooks/hooks'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

interface Prop{
    link: string, 
    Icon: React.FC, 
    text:string,
    className?: string,
    path: string,
    unread?: number | null
}

function Navs({link, Icon, text, className, path, unread}: Prop) {
    const menu = useAppSelector(state => state.menu.value);

    return (
        <li className={className}>
            <Link href={`/dashboard${link}`} className={cn('side-menu-item', path === "/dashboard" + link && 'bg-[#030303] text-white rounded-md relative after:content-[""] after:hidden md:after:block after:h-5 after:w-0.5 after:bg-[#00B578] after:absolute after:right-1.5 after:top-1/2 after:-translate-y-1/2')}>
                <Icon />
                <span className={cn('hidden md:block sm:group-hover:block', menu && "block")}>{text}</span>
                <span 
                    className={cn("hidden group-hover:grid md:grid rounded-full bg-orange text-white font-bold text-sm place-content-center h-5 w-5 ml-auto", !unread ? "invisible" : "")}
                >
                    {unread}
                </span>
            </Link>
            
        </li>
    )
}

export default Navs