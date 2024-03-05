import Image from 'next/image'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Email Confirmation"
}

function Page() {
    return (
        <main className='h-screen w-full px-4 bg-white text-center flex pt-10 items-center justify-center'>
            <article className='flex flex-col max-w-3xl mx-auto items-center'>
                <div className="relative">
                    <Image
                        src="/email.svg"
                        height={250}
                        width={250}
                        alt="Open Email"
                    />
                </div>
                <h1 className='text-2xl font-semibold mb-8'>Verify your email address</h1>
                <p className='mb-4'>We&apos;ve sent an email to the email address you provided to verify your email address and activate your account. The link will expire in 24 hours</p>
                <button className='bg-orange py-3 px-6 mb-10 text-white font-medium rounded-md'>Verify your email</button>
                <p>You can copy the link and paste it directly in your browser</p>
            </article>
        </main>
    )
}

export default Page