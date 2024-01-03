import React from 'react'
import { Montserrat } from 'next/font/google'
import { cn } from '@/lib/utils'
import HeroCard from '@/components/hero-card/hero-card'
const montserrat = Montserrat({subsets: ["latin"]})
import demo1 from '../../public/demo1.jpg'
import demo2 from '../../public/demo2.jpg'
import building from '../../public/building.svg'
import SearchBar from '@/components/client/search-bar/search-bar'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { FaAngleRight } from 'react-icons/fa'
import { AlignHorizontalJustifyEnd, BadgeDollarSignIcon, BarChart, Check, Home, PercentSquareIcon, PlaySquare, Search } from 'lucide-react'
import PropertyCounter from '@/components/client/property-counter/property-counter'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import PropertyCard from '@/components/client/property-card/property-card'
import Link from 'next/link'
import testimony1 from "../../public/attend1.jpg" 
import testimony2 from "../../public/attend2.jpg" 
import testimony3 from "../../public/attend3.jpg"
import { getFeaturedImage } from '@/utils/utils'


async function Page() {
    const supabase = createServerComponentClient({cookies});
    const {data, error} = await supabase.from("property_table")
        .select()
        .limit(6)

    return (
        <div>
            <div className="bg-[#F7f7f7] py-14">
                <div className="mx-auto max-w-7xl relative">
                    <div className="mx-auto container">
                        <div className='flex'>
                            <article className='max-w-md'>
                                <h1 className={cn(montserrat.className, 'text-5xl mb-5 font-bold')}>Rent, let or lease your property easily</h1>
                                <p className='text-sm font-semibold mb-5 lg:text-lg'>A great platform to rent, let or even lease your properties without any commissions.</p>
                                <div className='flex gap-4'>
                                    <p className='flex flex-col px-4 border-l border-l-grey-100'>
                                        <span className='text-4xl font-bold text-orange'>50k+</span> 
                                        <span className='text-sm text-grey-100'>Renters</span>
                                    </p>
                                    <p className='flex flex-col px-4 border-l border-l-grey-100'>
                                        <span className='text-4xl font-bold text-orange'>10k+</span> 
                                        <span className='text-sm text-grey-100'>Properties</span>
                                    </p>
                                </div>
                            </article>
                            <div className='flex-1 px-16'>
                                <HeroCard
                                    image={demo2}
                                    price='250,000'
                                    name='Flo Housing'
                                    location='Ibeju Lekki, Lagos'
                                    className='max-w-[220px] shrink-0 absolute right-12 top-2/4'
                                />
                                    <HeroCard
                                        image={demo1}
                                        price='400,000'
                                        name='Coastland Estate'
                                        location='Airport road, Lagos'
                                        className='max-w-[300px] shrink-0'
                                    />
                            </div>
                        </div>
                        <SearchBar />
                    </div>
                </div>
            </div>
            <section>
                <div className="max-w-7xl mx-auto py-20">
                    <div className="container mx-auto">
                        <div className='flex gap-20 items-center pb-32'>
                            <div className='flex-1 pl-24 pr-16 relative'>
                                <div className='shadow-lg shadow-orange/30 p-4 rounded-lg pr-10 flex items-center absolute left-0 top-4 z-10 bg-white'>
                                    <div className='h-10 w-10 rounded-full bg-orange/30 grid place-content-center' >
                                        <PlaySquare color='#FF5B19' />
                                    </div>
                                    <div className='text-orange pl-4'>
                                        <h5 className='font-semibold'>Virtual Home Tour</h5>
                                        <p className='text-sm'>We provide you virtual tour</p>
                                    </div>
                                </div>
                                <AspectRatio ratio={9 / 10} className='overflow-hidden rounded-lg'>
                                    <Image
                                        src={demo1}
                                        fill
                                        alt='Property Image'
                                        className='object-cover'
                                    />
                                </AspectRatio>
                                <div className='shadow-lg shadow-orange/30 p-4 rounded-lg pr-16 flex items-center absolute -bottom-10 left-1/2 -translate-x-1/2 z-10 bg-white'>
                                    <div className='h-10 w-10 rounded-full bg-orange border border-white grid place-content-center absolute right-8 -top-5' >
                                        <Home color='#FFF' size={18} />
                                    </div>
                                    <div className='text-orange'>
                                        <h5 className='font-semibold'>Virtual Home Tour</h5>
                                        <p className='text-sm'>We provide you virtual tour</p>
                                    </div>
                                </div>
                            </div>
                            <article className='flex-1 space-y-4 pl-10'>
                                <div className='bg-orange/20 border border-orange/80 rounded p-1 flex w-fit'>
                                    <Button className='bg-white shadow text-orange font-medium'>For Tenants</Button>
                                    <Button variant="ghost" >For Tenants</Button>
                                </div>
                                <h3 className='text-3xl text-orange font-semibold'>We make it easy for tenants and landlords</h3>
                                <p>Whether it's letting your current home, manage your properties or looking for house to rent, we make it easy and efficient, The best part? you'll save a bunch of money and time with our services.</p>
                                <Button className='bg-orange font-medium flex items-center gap-2'>See More <FaAngleRight/></Button>
                            </article>
                        </div>

                        <div className='bg-orange/10 shadow-sm flex py-16'>
                            <article className='p-10'>
                                <h4 className='text-3xl text-orange font-bold max-w-sm'>The new way to find your new home</h4>
                                <p className='font-medium max-w-xs pt-4 pb-8'>Find your dream place to live in with more than 10k+ properties listed</p>
                                <div className='flex'>
                                    <PropertyCounter
                                        InnerIcon={<PercentSquareIcon color='#FFF' size={20} />} 
                                        OuterIcon={<BarChart color='#FFF' size={16} />}
                                        count='7.4%'
                                        note='Property Return Rate'
                                    />
                                    <PropertyCounter 
                                        InnerIcon={<AlignHorizontalJustifyEnd color='#FFF' size={20} />} 
                                        OuterIcon={<Search color='#FFF' size={16} />}
                                        count='3,856'
                                        note='Property in rent'
                                    />
                                    <PropertyCounter 
                                        InnerIcon={<BadgeDollarSignIcon color='#FFF' size={20} />} 
                                        OuterIcon={<Check color='#FFF' size={16} />}
                                        count='2,540'
                                        note='Daily Completed Transactions'
                                    />
                                </div>
                            </article>
                            <div className=''>
                                <Image
                                    src={building}
                                    alt='Building illustration'
                                />
                            </div>
                        </div>

                        <div className='py-24'>
                            <div className='flex justify-between items-center mb-8'>
                                <div>
                                    <h4 className='text-2xl font-bold text-orange mb-3'>Based on your location</h4>
                                    <p>Some of our pick properties near you</p>
                                </div>
                                <Link href="" className='py-4 px-8 block bg-orange text-white text-sm rounded-md'>Browse More Properties</Link>
                            </div>
                            <ul className='grid grid-cols-3 gap-8'>
                                {data?.map(item => {
                                    return <PropertyCard
                                        key={item.id}
                                        image={getFeaturedImage(item.property_image) ?? ""}
                                        price={item.rent_price}
                                        name={item.property_title}
                                        location={item.property_address}
                                        bed={item.bedroom}
                                        bathroom={item.bath}
                                    />
                                })}
                            </ul>
                        </div>

                        <div className='text-center'>
                            <h4 className="text-3xl font-bold mb-6 text-orange">Testimonials</h4>
                            <p className='max-w-sm mx-auto font-semibold'>See what our property managers, landlords, and tenants have to say</p>

                            <div className='pt-8'>
                                <p className='max-w-xl mx-auto font-medium mb-4'>"As a young professional constantly on the move for new opportunities, finding the perfect place to live can feel like a daunting task. Between hectic job searches and navigating unfamiliar cities, the last thing I want is to waste precious time sifting through endless listings or dealing with unreliable landlords. That's where Mavris came in and completely transformed my rental experience."</p>
                                <p className='font-semibold text-sm'>Ayo, Ayoade, <span className='font-normal'>Render</span></p>

                                <ul className='flex justify-center items-center gap-4 pt-8'>
                                    <li>
                                        <div className="h-fit w-fit rounded-full p-0.5 bg-white overflow-hidden border-2 border-orange border-l-orange/30">
                                            <div className='h-12 w-12 rounded-full overflow-hidden'>
                                                <Image 
                                                    src={testimony1}
                                                    height={48}
                                                    width={48}
                                                    alt='Testimony'
                                                    className='object-cover object-top'
                                                />
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="h-12 w-12 rounded-full overflow-hidden">
                                            <Image 
                                                src={testimony2}
                                                height={48}
                                                width={48}
                                                alt='Testimony'
                                                className='object-cover object-top'
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="h-12 w-12 rounded-full overflow-hidden">
                                            <Image 
                                                src={testimony3}
                                                height={48}
                                                width={48}
                                                alt='Testimony'
                                                className='object-cover object-top'
                                            />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-orange px-4 py-16 mb-20">
                <div className="container mx-auto">
                    <div className='flex text-white flex-col items-center text-center max-w-xl mx-auto'>
                        <h5 className='text-primary text-xl font-semibold'>No Spam, P   romise</h5>
                        <h6 className=' font-bold text-3xl mb-5'>Are you a landlord?</h6>
                        <p>Discover ways to increase your home's value and get listed. No Spam</p>
                        <form className='bg-white p-3 rounded-md flex items-center w-full my-5'>
                            <input type="text" className='flex-1 bg-transparent' />
                            <Button className='bg-orange/90 px-8 py-2.5'>Submit</Button>
                        </form>
                        <p>Join <span>10,000+</span> other landlord in mavris community.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Page