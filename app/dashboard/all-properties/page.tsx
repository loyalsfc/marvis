import { AllProperties } from '@/components/all-properties/all-properties'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Metadata } from 'next';
import React from 'react'
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: "All Properties"
}

async function Page() {
  const supabase = createServerComponentClient({cookies})

  const { data: {user}, error } = await supabase.auth.getUser();
  const { data } = await supabase
    .from('property_table')
    .select(`
      *,
      property_owner(
        first_name, last_name, id
      )
    `)
    .eq("agent_id", user?.id)

  return (
    <div className='page-wrapper h-full overflow-hidden'>
      <AllProperties property={data} />
    </div>
  )
}

export default Page