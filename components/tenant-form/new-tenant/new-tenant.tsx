'use client'

import React from 'react'
import TenantForm from '../tenant-form'
import { supabase } from '@/utils/utils'
import { useRouter } from 'next/navigation'
import { tenantFormTypes } from '../formSchema'
import { useAppSelector } from '@/lib/hooks/hooks'

function NewTenant() {
    const router = useRouter();
    const userId = useAppSelector(state => state.user.user?.id);

    async function setNewTenant(values:tenantFormTypes, userIdentification:string, avatar: string){
        const {data, error} = await supabase.from("tenants")
            .insert({
                ...values, 
                id_card: userIdentification,
                avatar,
                agent_id: userId
            })
        if(!error){
            router.push("/dashboard/all-properties");
        }
    }

    return (
        <TenantForm saveTenant={setNewTenant} />
    )
}

export default NewTenant