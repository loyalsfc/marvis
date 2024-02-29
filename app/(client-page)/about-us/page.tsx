import { cn } from '@/lib/utils'
import { ArrowDown, EyeIcon, Star, Target } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { FaStar } from 'react-icons/fa'

const testimonials = [
    {
        name: "Obisesan Thomas",
        designation: "Tenant",
        text: "I have used their rental service twice, and I’m currently living in one of the houses I got through them for the past six years."
    },
    {
        name: "Bayonle Estate Agent",
        designation: "Agent",
        text: "As an Estate Agent, Mavris has been very useful to me. I use Mavris to manage my properties, and make my work easier to do."
    },
    {
        name: "Iyiola Barnabas",
        designation: "Tenant",
        text: "Mavris is one of the best real estate companies I've ever heard of, the professionalism and efficiency in their deliveries are quite remarkable."
    }
]

const partners = [
    "/partners/partner-5.png", 
    "/partners/partner-1.jpg",
    "/partners/partner-2.png",
    "/partners/partner-3.png", 
    "/partners/partner-4.jpg"
]

function Page() {
    return (
        <main>
            <section className='text-center px-8 pt-24 z-10 pb-6 bg-[url("/real-estate.jpg")] text-white bg-center relative'>
                <div className='h-full w-full absolute -z-10 top-0 left-0 bg-black/70' />
                <div className='mx-auto max-w-xl'>
                    <h2 className='text-5xl font-bold mb-4'>About Us</h2>
                    <p className='font-semibold text-lg'>Discover a revolutionary platform where you can rent, let, or lease your properties without worrying about commissions</p>

                    <span className='flex flex-col items-center cursor-pointer hover:scale-105 transition-all mt-14 justify-center gap-0.5 text-xs font-bold leading-none'>
                        READ MORE
                        <ArrowDown />
                    </span>
                </div>
            </section>
            <section className="container mx-auto px-4 md:px-8 py-10 text-center">
                <h3 className='text-3xl font-bold text-orange'>Our Mission and Vision</h3>
                <div className='grid grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto pt-8 gap-10 sm:gap-0'>
                    <div className='space-y-2 sm:space-y-4 max-w-[400px] mx-auto'>
                        <Target className='w-fit mx-auto' color='#FF5B19' size={200} />
                        <h5 className='text-2xl font-semibold text-orange'>Our Mission</h5>
                        <p className='font-medium'>To ensure tenants experience luxury tailored to their unique needs with our premium end-to-end real estate services.</p>
                    </div>
                    <div className='space-y-2 sm:space-y-4 max-w-[400px] mx-auto'>
                        <EyeIcon className='w-fit mx-auto' color='#FF5B19' size={200} />
                        <h5 className='text-2xl font-semibold text-orange'>Our Vision</h5>
                        <p className='font-medium'>To make homes available for all</p>
                    </div>
                </div>
            </section>
            <section className='bg-[url("/real-estate.jpg")] bg-left-bottom py-16 md:py-28 relative z-10'>
                <div className="h-full w-full bg-black/70 absolute top-0 left-0 -z-10"/>
                <div className="container mx-auto px-4 md:px-8">
                    <div className="md:w-3/5 lg:w-2/5 text-center md:text-right leading-loose ml-auto text-white text-xl font-medium md:mr-10">
                        <p>At Mavris, we pride ourselves on delivering unparalleled excellence, ensuring every client enjoys the luxury they can afford. From personalized consultations to bespoke property solutions, we are dedicated to exceeding your expectations at every turn. Discover a new standard of excellence in real estate with Mavris."</p>
                    </div>
                </div>
            </section>
            <section>
                <div className="container mx-auto px-4 md:px-8 py-16">
                    <h2 className='text-4xl font-bold  text-orange text-center mb-8'>Our Partners</h2>
                    <ul className='flex justify-around'>
                        {partners.map((item, index) => {
                            return(
                                <li key={index} className='h-20 sm:h-28 w-20 sm:w-28 rounded-md relative overflow-hidden'>
                                    <Image
                                        src={item}
                                        fill
                                        alt='Partner Logo'
                                        className='object-contain'
                                    />
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </section>
            <section className='bg-[#F7f7f7] py-14 '>
                <div className="container mx-auto px-4 md:px-8">
                    <div className='text-center'>
                        <h2 className='text-4xl font-bold  text-orange'>Testimonials</h2>
                        <div className="w-20 h-0.5 mx-auto bg-orange my-6"></div>
                        <p className='text-sm font-semibold'>What our client say about us</p>
                    </div>
                    <ul className='space-y-8 md:space-y-0 md:flex md:flex-nowrap overflow-x-scroll py-8 no-scrollbar'>
                        {testimonials.map((item, index) =>{
                            return(
                                <li key={index} className='w-full md:w-1/3 px-2 lg:px-4'>
                                    <div className='h-full flex flex-col'>
                                        <div className={cn("bg-white p-6 gap-6 text-[15px] font-bold text-primary flex-1 flex flex-col relative","after:content-[''] after:block after:h-6 after:w-6 after:bg-white after:rotate-45 after:absolute after:left-7 after:-bottom-3")}>
                                            <p>{item.text}</p>

                                            <div className='text-orange text-lg flex items-center gap-1 mt-auto'>
                                                <FaStar />
                                                <FaStar />
                                                <FaStar />
                                                <FaStar />
                                                <FaStar />
                                            </div>
                                        </div>  
                                        <div className='pt-4'>
                                            <h5 className='text-primary font-semibold leading-none'>{item.name}</h5>
                                            <span className='font-medium'>{item.designation}</span>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </section>
        </main>
    )
}

export default Page