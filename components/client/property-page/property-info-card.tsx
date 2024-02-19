import React from 'react'

interface Props {
    Icon: React.FC;
    title: string;
    count: string;
}

function PropertyInfoCard({Icon, title, count}: Props) {
    return (
        <div className='shrink-0'>
            <p className='font-semibold mb-1 whitespace-nowrap'>{title}</p>
            <span className='flex items-center gap-1'><Icon />  {count}</span>
        </div>
    )
}

export default PropertyInfoCard