import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import Aside from '@/components/aside/sidebar'
import ReduxProvider from '@/components/reduxProvider/reduxProvider'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

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
  const supabase = createClient()
  const {data, error} = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/')
  }

  const {data: userData, error: userError} = await supabase
        .from("agents_table")
        .select(`profile_image, full_name`)
        .eq("agent_id", data.user?.id)
        .limit(1)
        .single()

  const {count: messages, error: messageError} = await supabase
    .from("messages")
    .select(`question`, { count: 'exact', head: false })
    .eq("agent_id", data.user?.id)
    .eq("isread", false)

  return (
        <ReduxProvider>
          <div className='md:p-4 h-screen flex md:gap-4'>
            {userData && <Aside data={data} userData={userData} unread_message={messages}/>}
            <div className='flex-1 overflow-hidden'>
              {children}
            </div>
          </div>
        </ReduxProvider>
  )
}
