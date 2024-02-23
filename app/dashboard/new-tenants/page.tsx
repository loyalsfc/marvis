import NewTenant from '@/components/tenant-form/new-tenant/new-tenant';
import React from 'react'

function Page() {
  return (
    <div className='h-full w-full flex flex-col page-wrapper overflow-y-scroll'>
      <NewTenant />
    </div>
  )
}

export default Page