'use client'

import { cn, daysToExpire, priceToString } from '@/utils/utils';
import React from 'react'
import Modal from '../modals/modal';
import { PropertyUnitProps } from '@/@types';
import TenantModal from '../modals/tenantModal';

interface Owner{
    id:number,
    created_at:string,
    first_name:string,
    last_name:string,
    email:string,
    mobile_number:string,
    fax_number:string,
    office_number:string,
    biological_information:string,
    address:string,
    profile_picture:string,
}

interface Property {
    id: number,
    property_title: string,
    property_address: string,
    rent_price: number,
    property_type: string,
    property_location: string,
    bedroom: number,
    bath: number,
    year_built: number,
    units: number,
    video_url: string,
    additional_details: {id:string, title:string, value: string}[],
    features: string[],
    property_label: string,
    label_color: string,
    vacant_units: number,
    property_owner: Owner,
    property_image: {url: string, isMarkedFeatured: boolean }[],
    property_units: PropertyUnitProps[]
}

function Properties({
    data, 
    tenant,
    selectedUnit,
}:{
    data: Property[], 
    tenant: {id: number, full_name: string}[] | null,
    selectedUnit: string | undefined
}){
    const {
        id,
        property_title,
        property_address,
        rent_price,
        property_type,
        units,
        vacant_units,
        property_owner,
        property_units
    } = data[0];

    const convertDate = (dateISO:string) => {
        const date = new Date(dateISO);
        const month = date.toLocaleString("en-US", { month: "short" })
        return `${month} ${date.getDate()} ${date.getFullYear()}`
    }

    const expireStatus = (dateISO: string) => {
        const remainingDays = daysToExpire(dateISO);
        return remainingDays < 31 && remainingDays > 0
                ? "text-[#ff9966]"
                : remainingDays < 31
                ? "text-red-500"
                : ''
    }

    const tenantName = (id: string) => {
        const name = tenant?.find(item => item.id === parseInt(id))?.full_name;
        if(name){
            return name;
        } else {
            return "";
        }
    }
    
    return (
        <div className='h-full overflow-scroll relative'>
            <div className='mb-8'>
                <h1 className='text-xl sm:text-2xl font-medium'>{property_title}</h1>
                <h5 className='font-medium text-sm'>{property_address}</h5>
            </div>

            <table className='font-medium'>
                <tbody>
                    <tr>
                        <td className='py-0.5 pr-4'>Owner:</td>
                        <td>{property_owner.first_name + " " + property_owner.last_name}</td>
                    </tr>
                    <tr>
                        <td className='py-0.5 pr-4'>Property Type:</td>
                        <td className='capitalize'>{property_type.replace("_", " ")}</td>
                    </tr>
                    <tr>
                        <td className='py-0.5 pr-4'>Total Units:</td>
                        <td>{units}</td>
                    </tr>
                    <tr>
                        <td className='py-0.5 pr-4'>Vacant Units:</td>
                        <td>{vacant_units}</td>
                    </tr>
                    <tr>
                        <td className='py-0.5 pr-4'>Price:</td>
                        <td>₦{priceToString(rent_price.toString())}</td>
                    </tr>
                </tbody>
            </table>
            <div className='mt-8 overflow-y-scroll sticky top-0'>
                <table className='w-full'>
                    <thead className='bg-orange text-white sticky top-0'>
                        <tr className='sticky top-0'>
                            <th className='p-2'>S/N</th>
                            <th className='p-2'>Unit</th>
                            <th className='p-2'>Status</th>
                            <th className='p-2'>Rent Date</th>
                            <th className='p-2'>Rent Duration</th>
                            <th className='p-2'>Expiry Date</th>
                            <th className='p-2'>Tenant</th>
                            <th className='p-2'></th>
                        </tr>
                    </thead>
                    <tbody className='text-center whitespace-nowrap'>
                        {property_units.map((item, index) => {
                            return(
                                <tr key={item.unit} className={cn('even:bg-orange/10')}>
                                    <td>{index + 1}</td>
                                    <td className='p-2 whitespace-nowrap'>Suite {item.unit}</td>
                                    <td className='p-2'>{item.isAvailable ? "Available" : "Occupied"}</td>
                                    <td className="p-2">{item.rent_date ? convertDate(item.rent_date) : "-"}</td>
                                    <td className="p-2">{item.rent_duration ?? "-"}</td>
                                    <td className={cn('p-2')}>
                                        <span className={item.expiry_date && expireStatus(item.expiry_date)}>{item.expiry_date ? convertDate(item.expiry_date) : "-"}</span>
                                    </td>
                                    <td className='p-2'>{item.tenant ? <TenantModal name={tenantName(item.tenant)} tenantId={item.tenant} /> : "-"}</td>
                                    <td className=''>
                                        <Modal 
                                            item={item} 
                                            allUnits={property_units} 
                                            tenant_list={tenant ?? []}
                                            property_id={id}
                                        />
                                    </td>
                                </tr>
                            ) 
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Properties