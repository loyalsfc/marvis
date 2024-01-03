import React, { ReactNode } from 'react'

function PropertyCounter({count, note, InnerIcon, OuterIcon}:{count:string, note:string, InnerIcon: ReactNode, OuterIcon:ReactNode}) {
    return (
        <div className='text-center w-fit pr-8 last:pr-0'>
            <div className='h-14 w-14 rounded-full bg-orange/5 p-0.5 border border-orange/50 mx-auto'>
                <div className="h-full w-full rounded-full bg-orange/50 grid place-content-center relative">
                    {InnerIcon}
                    <div className='h-6 w-6 rounded-full bg-orange grid place-content-center absolute -right-1.5 -bottom-1.5'>
                        {OuterIcon}
                    </div>
                </div>
            </div>
            <h5 className='text-orange text-3xl font-bold mt-3'>{count}</h5>
            <p className=' text-grey-100 font-medium text-sm'>{note}</p>
        </div>
    )
}

export default PropertyCounter