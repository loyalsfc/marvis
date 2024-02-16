import React, { ReactNode } from 'react'

function PropertyCounter({count, note, InnerIcon, OuterIcon}:{count:string, note:string, InnerIcon: ReactNode, OuterIcon:ReactNode}) {
    return (
        <div className='sm:text-center w-fit sm:pr-4 lg:pr-8 last:pr-0 flex sm:block items-center py-4 sm:py-0 sm:w-1/3'>
            <div className='h-14 w-14 rounded-full bg-orange/5 p-0.5 border border-orange/50 sm:mx-auto mr-4 sm:mr-auto'>
                <div className="h-full w-full rounded-full bg-orange/50 grid place-content-center relative">
                    {InnerIcon}
                    <div className='h-6 w-6 rounded-full bg-orange grid place-content-center absolute -right-1.5 -bottom-1.5'>
                        {OuterIcon}
                    </div>
                </div>
            </div>
            <div>
                <h5 className='text-orange text-xl sm:text-3xl font-bold sm:mt-3'>{count}</h5>
                <p className=' text-grey-100 font-medium text-sm'>{note}</p>
            </div>
        </div>
    )
}

export default PropertyCounter