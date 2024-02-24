'use client'

import React from 'react'
import TenantForm from '../tenant-form'
import { supabase } from '@/utils/utils'
import { useRouter } from 'next/navigation'
import { tenantFormTypes } from '../formSchema'
import { toast } from 'react-toastify'

function TenantApplication({slug, agent_id}:{slug: string, agent_id: string}) {
    const router = useRouter();

    async function setNewTenant(values:tenantFormTypes, userIdentification:string, avatar: string){
        const {data, error} = await supabase.from("tenants")
            .insert({
                ...values, 
                id_card: userIdentification,
                avatar,
                agent_id,
                is_approved: false
            })
            .select();
        if(data){
            const tenantDetails = data[0]
            const {data: applicationData, error} = await supabase.from("property_applications")
                .insert({
                    tenant_id: tenantDetails.id, 
                    property_slug: slug,
                    agent_id,
                    is_approved: false
                })
                .select();
            if(applicationData){
                toast.success("Application sent");
                router.push(`/properties/${slug}`)
            }
        }
    }

    return (
        <TenantForm saveTenant={setNewTenant} />
    )
}

export default TenantApplication