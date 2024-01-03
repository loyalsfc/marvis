import React from 'react'

function PropertyCountCard({title, count, subtite}:{title: string, count: number | undefined, subtite: string}) {
    return (
        <div className='rounded-xl bg-grey-200/40 border border-grey-200 shadow px-3 min-[1080px]:px-5 py-6 hover:shadow-md transition-all hover:scale-105 cursor-pointer hover:shadow-orange'>
            <h5 className='text-xl lg:text-2xl font-medium leading-tight mb-4 text-orange'>{title} <br/> {subtite}</h5>
            <span className='text-sm block text-end'>{count} propert{count && count > 1 ? "ies" : "y"}</span>
        </div>
    )
}

export default PropertyCountCard