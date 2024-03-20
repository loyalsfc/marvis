import NewTenant from '@/components/tenant-form/new-tenant/new-tenant';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Add New Tenant"
}

function Page() {
  return (
    <div className='h-full w-full flex flex-col page-wrapper overflow-y-scroll'>
      <NewTenant />
    </div>
  )
}

export default Page