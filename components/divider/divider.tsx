import { cn } from '@/lib/utils'
import React from 'react'

function Divider({note, className}:{note: string, className?: string}) {
    return (
        <div className='text-xl flex items-center pt-8'>
            <p className="flex-1 h-px bg-primary"/>
            <p className={cn('font-medium px-2', className)}>{note}</p>
            <p className="flex-1 h-px bg-primary"/>
        </div>
    )
}

export default Divider