import React from 'react'

function FooterList({title, list}:{title:string; list: string[]}) {
    return (
        <div>
            <h4 className='text-orange font-bold mb-3 sm:mb-6'>{title}</h4>
            <ul className='text-sm font-medium space-y-2'>
                {list.map((item, index) => {
                    return <li key={index} className='hover:underline hover:text-orange cursor-pointer'>{item}</li>
                })}
            </ul>
        </div>
    )
}

export default FooterList