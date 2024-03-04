import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import './globals.css'
import Aside from '@/components/aside/sidebar'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import ReduxProvider from '@/components/reduxProvider/reduxProvider'

const inter = Quicksand({ 
  weight: ["300", "400", "500", "600", "700"],
  subsets: ['latin'] 
})

export const metadata: Metadata = {
  title: 'Mavris',
  description: 'Tool for House agent to manage their client and customers',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
