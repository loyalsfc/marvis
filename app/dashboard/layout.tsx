import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import Aside from '@/components/aside/sidebar'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import ReduxProvider from '@/components/reduxProvider/reduxProvider'

const inter = Quicksand({ 
  weight: ["300", "400", "500", "600", "700"],
  subsets: ['latin'] 
})

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const supabase = createServerComponentClient({cookies})
  const {data, error} = await supabase.auth.getUser();
  console.log(data)
  return (
        <ReduxProvider>
          <div className='md:p-4 h-screen flex md:gap-4'>
            {data?.user && <Aside data={data} />}
            <div className='flex-1 overflow-hidden'>
              {children}
            </div>
          </div>
        </ReduxProvider>
  )
}
