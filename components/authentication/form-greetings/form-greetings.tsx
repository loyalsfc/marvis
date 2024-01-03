import React from 'react'

function FormGreetings({title, subtitle}:{title: string, subtitle: string}) {
    return (
        <div className=''>
            <h3 className='text-3xl font-bold mb-1.5 text-orange'>{title}</h3>
            <p className='text-sm'>{subtitle}</p>
        </div>
    )
}

export default FormGreetings