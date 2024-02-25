'use client'

import React, { ChangeEvent, useState } from 'react'
import ModalWrapper from '../modals/wrapper'
import { PropertyProps, PropertyUnitProps } from '@/@types'
import { supabase } from '@/utils/utils'
import { toast } from 'react-toastify'

function ConfirmApplication({units, tenantId}:{units: PropertyUnitProps[], tenantId: string}) {
    const [selectedUnit, setSelectedFile] = useState<string>("")
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedFile(e.currentTarget.value)
    }

    const confirmTenancy = async() => {
        const { error} = await supabase
            .from("tenants")
            .update({"is_approved": true})
            .eq("id", tenantId)

        if(error){
            toast.error("An error occured")
            return;
        }

        const { error: appError} = await supabase
            .from("property_applications")
            .update({"is_approved": true})
            .eq("id", tenantId)

        if(appError){
            toast.error("An error occured")
            return;
        }
    }

    return (
        <div>
            <ModalWrapper
                modalTitle='Confirm Tenancy Application'
                btnText='Confirm Application'
                btnClass='btn btn-primary mx-auto'
            >
                <h4>Please select a unit</h4>
                <div className='grid grid-cols-3 gap-3'>
                    {units.map(item => {
                        return(
                            <div key={item.unit} className='flex items-center gap-1'>
                                <input 
                                    type="radio" 
                                    name="unitRadio" 
                                    id={"unit"+item.unit} 
                                    disabled={!item.isAvailable} 
                                    className='peer'
                                    onChange={handleChange}
                                    value={item.unit}
                                />
                                <label htmlFor={"unit"+item.unit} className=' peer-disabled:text-muted'>Unit {item.unit}</label>
                            </div>
                        )
                    })}
                    
                </div>
                <button disabled={selectedUnit === ""} className='btn btn-primary  justify-center mt-4 disabled:bg-muted disabled:border-muted disabled:pointer-events-none'>Confirm</button>
            </ModalWrapper>
        </div>
    )
}

export default ConfirmApplication