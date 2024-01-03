import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { Button } from '../ui/button'

function TooltipModal({text}:{text: string}) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button type='button' className='btn btn-secondary opacity-75'>{text}</button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Please fill the basic details</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default TooltipModal