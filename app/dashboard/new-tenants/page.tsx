import TenantForm from '@/components/tenant-form/tenant-form'
import React from 'react'

function Page() {
  return (
    <div className='h-full w-full flex flex-col page-wrapper overflow-y-scroll'>
      <TenantForm/>
    </div>
  )
}

export default Page