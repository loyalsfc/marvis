import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'

async function Layout({children}:{children: ReactNode}) {
    const supabase = createClient()
    const {data} = await supabase.auth.getUser();
    if (data?.user) {
        redirect('/dashboard')
    }
    return (
        <div>{children}</div>
    )
}

export default Layout