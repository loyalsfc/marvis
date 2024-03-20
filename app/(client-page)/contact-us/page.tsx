import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import aboutImage from "../../../public/contact-us.png"
import Image from 'next/image'
import { Mail, MapPin, PhoneCall } from 'lucide-react'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Contact Us"
}

function Page() {
    return (
        <div className=''>
             <section className='text-center px-8 z-10 py-20 bg-[url("/real-estate.jpg")] text-white bg-center relative'>
                <div className='h-full w-full absolute -z-10 top-0 left-0 bg-black/70' />
                <div className='mx-auto max-w-xl'>
                    <h2 className='text-4xl font-bold mb-4'>Contact Us</h2>
                </div>
            </section>
            <div className='py-10 md:py-20 max-w-7xl mx-auto'>
                <div className="container mx-auto px-4 md:px-8">
                    <section className='flex items-center'>
                        <form action="" className='w-full md:w-5/12 space-y-6'>
                            <h4 className='font-bold text-3xl md:text-5xl text-orange text-center md:text-left'>Get in touch</h4>
                            <Input
                                placeholder='Full Name'
                                className='border-orange'
                            />
                            <Input
                                placeholder='Email'
                                type='email'
                                className='border-orange'
                            />
                            <Textarea
                                placeholder='Message'
                                className='border-orange'
                            />
                            <Button className='bg-orange shadow-md px-8 w-full sm:w-fit'>Submit</Button>
                        </form>
                        <div className='pl-10 flex-1 hidden md:block'>
                            <Image
                                src={aboutImage}
                                alt='About us illustration'
                                placeholder='blur'
                            />
                        </div>
                    </section>

                    <section className='pt-20'>
                        <h3 className="text-4xl mb-8 font-bold text-orange text-center">Let's Chat</h3>
                        <div className='flex flex-col sm:flex-row justify-around gap-4 text-center font-medium'>
                            <div className='flex flex-col items-center'>
                                <PhoneCall className='mb-2' color='#FF5B19' />
                                <span>Call us at</span>
                                <Link className='hover:text-orange hover:underline' href="tel:(555) 555-1234">(555) 555-1234</Link>
                            </div>
                            <div className='flex flex-col items-center'>
                                <MapPin className='mb-2' color='#FF5B19'/>
                                <p>123 Main Street, <br/>Anytown, USA 12345</p>
                            </div>
                            <div className='flex flex-col items-center'>
                                <Mail className='mb-2' color='#FF5B19' />
                                <span>Email us at</span>
                                <Link className='hover:text-orange hover:underline' href="mailto:info@mavris.com">info@mavris.com</Link>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Page