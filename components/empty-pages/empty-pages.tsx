import Image, { StaticImageData } from 'next/image'
import React from 'react'

function EmptyPages({
    emptyImage,
    note
}:{
    emptyImage: StaticImageData,
    note: string
}) {
    return (
        <div>
            <div className='max-w-md mx-auto'>
                <Image
                    src={emptyImage}
                    alt='Empty Image'
                />
            </div>
            <p className='text-xl font-semibold text-center'>{note}</p>
        </div>
    )
}

export default EmptyPages