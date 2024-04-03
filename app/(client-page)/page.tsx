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
import PropertyCard from '@/components/client/property-card/property-card'
import Link from 'next/link'
import testimony1 from "../../public/attend1.jpg" 
import testimony2 from "../../public/attend2.jpg" 
import testimony3 from "../../public/attend3.jpg"
import { getFeaturedImage, supabase } from '@/utils/utils'

async function Page() {
    const {data} = await supabase.from("property_table")
        .select()
        .limit(6)

    return (
        <div>
            <div className="bg-[#F7f7f7] py-14 relative">
                <div className="bg-[url('/maps.png')] h-full w-3/6 hidden md:block opacity-40 absolute top-0 right-0 bg-cover bg-no-repeat" />
                <div className="mx-auto max-w-7xl relative">
                    <div className="mx-auto container px-4 md:px-8">
                        <div className='flex flex-col md:flex-row'>
                            <article className='md:max-w-md text-center md:text-left'>
                                <h1 className={cn(montserrat.className, 'text-4xl md:text-5xl mb-5 font-bold')}>Rent, let or lease your property easily</h1>
                                <p className='text-base md:text-sm font-semibold mb-5 lg:text-lg'>A great platform to rent, let or even lease your properties without any commissions.</p>
                                <div className='md:hidden mb-10'>
                                    <SearchBar />
                                </div>
                                <div className='flex gap-8 md:gap-4 '>
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
                            <div className='ml-auto hidden md:block lg:flex-1 lg:px-16'>
                                <HeroCard
                                    image={demo2}
                                    price='250,000'
                                    name='Flo Housing'
                                    location='Ibeju Lekki, Lagos'
                                    className='max-w-[220px] shrink-0 absolute right-12 top-2/4 hidden lg:block'
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
                        <div className='hidden md:block'>
                            <SearchBar />
                        </div>
                    </div>
                </div>
            </div>
            <section>
                <div className="max-w-7xl mx-auto py-20">
                    <div className="container mx-auto px-4 md:px-8">
                        <div className='flex flex-col sm:flex-row gap-10 lg:gap-20 items-center pb-20 sm:pb-32'>
                            <div className='flex-1 pl-4 sm:pl-8 md:pl-24 lg:pr-16 relative w-full sm:w-fit mb-14 sm:mb-0'>
                                <div className='shadow-lg shadow-orange/50 p-2 sm:p-4 rounded-lg pr-4 sm:pr-10 flex items-center absolute left-0 top-4 z-10 bg-white'>
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
                                <div className='shadow-xl shadow-orange/40 p-4 rounded-lg pr-10 sm:pr-16 flex items-center absolute -bottom-10 left-1/2 -translate-x-1/2 z-10 bg-white w-10/12 sm:w-fit'>
                                    <div className='h-9 sm:h-10 w-9 sm:w-10 rounded-full bg-orange border border-white grid place-content-center absolute right-8 -top-4 sm:-top-5' >
                                        <Home color='#FFF' size={18} />
                                    </div>
                                    <div className='text-orange'>
                                        <h5 className='font-semibold'>Virtual Home Tour</h5>
                                        <p className='text-sm whitespace-nowrap'>We provide you virtual tour</p>
                                    </div>
                                </div>
                            </div>
                            <article className='flex-1 space-y-6 sm:space-y-3 lg:space-y-4 md:pl-5 lg:pl-10 text-center sm:text-left'>
                                <div className='bg-orange/20 border border-orange/80 rounded p-1 flex w-fit mx-auto sm:mx-0'>
                                    <Button className='bg-white shadow text-orange font-medium'>For Tenants</Button>
                                    <Button variant="ghost" >For Tenants</Button>
                                </div>
                                <h3 className='text-2xl lg:text-3xl text-orange font-semibold'>We make it easy for tenants and landlords</h3>
                                <p className='text-sm lg:text-base'>Whether it&apos;s letting your current home, manage your properties or looking for house to rent, we make it easy and efficient, The best part? you&apos;ll save a bunch of money and time with our services.</p>
                                <Button className='bg-orange font-medium flex items-center gap-2 w-full sm:w-fit'>See More <FaAngleRight/></Button>
                            </article>
                        </div>

                        <div className='bg-orange/10 shadow-sm min-[885px]:flex py-5 sm:py-16'>
                            <article className='p-4 sm:p-10 flex flex-col sm:items-center min-[885px]:block'>
                                <h4 className='text-3xl text-orange font-bold min-[885px]:max-w-sm'>The new way to find your new home</h4>
                                <p className='font-medium min-[885px]:max-w-xs py-4 lg:pb-8'>Find your dream place to live in with more than 10k+ properties listed</p>
                                <div className='flex flex-col sm:flex-row'>
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
                            <div className='sm:hidden min-[885px]:block h-fit'>
                                <Image
                                    src={building}
                                    alt='Building illustration'
                                />
                            </div>
                        </div>

                        <div className='py-24'>
                            <div className='sm:flex text-center justify-between items-center mb-8'>
                                <div>
                                    <h4 className='text-2xl font-bold text-orange mb-3'>Based on your location</h4>
                                    <p>Some of our pick properties near you</p>
                                </div>
                                <Link 
                                    href="/properties" 
                                    className='py-4 px-8 bg-orange text-white text-sm rounded-md hover:bg-primary hidden sm:block'
                                >
                                    Browse More Properties
                                </Link>
                            </div>
                            <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8'>
                                {data?.map(item => {
                                    return <PropertyCard
                                        key={item.id}
                                        image={getFeaturedImage(item.property_image) ?? ""}
                                        price={item.rent_price}
                                        name={item.property_title}
                                        location={item.property_address}
                                        bed={item.bedroom}
                                        bathroom={item.bath}
                                        slug={item.slug}
                                    />
                                })}
                            </ul>
                            <Link 
                                href="/properties" 
                                className='py-4 mt-8 text-center block bg-orange text-white text-sm rounded-md hover:bg-primary sm:hidden font-medium'
                            >
                                Browse More Properties
                            </Link>
                        </div>

                        <div className='text-center'>
                            <h4 className="text-3xl font-bold mb-6 text-orange">Testimonials</h4>
                            <p className='max-w-sm mx-auto font-semibold'>See what our property managers, landlords, and tenants have to say</p>

                            <div className='pt-8'>
                                <p className='max-w-xl mx-auto font-medium mb-4'>&quot;As a young professional constantly on the move for new opportunities, finding the perfect place to live can feel like a daunting task. Between hectic job searches and navigating unfamiliar cities, the last thing I want is to waste precious time sifting through endless listings or dealing with unreliable landlords. That&apos;s where Mavris came in and completely transformed my rental experience.&quot;</p>
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

            <section className="bg-primary px-4 py-10 sm:py-16 mb-20">
                <div className="container px-0 mx-auto">
                    <div className='flex text-white flex-col items-center text-center max-w-xl mx-auto'>
                        <h5 className='text-primary text-xl font-semibold'>No Spam, P   romise</h5>
                        <h6 className=' font-bold text-3xl mb-5'>Are you a landlord?</h6>
                        <p>Discover ways to increase your home&apos;s value and get listed. No Spam</p>
                        <form className='flex flex-col sm:flex-row items-center w-full my-5 relative'>
                            <input type="text" className='flex-1 w-full bg-white text-primary p-2.5 sm:p-4 rounded-md border border-transparent focus:border-orange' />
                            <Button className='bg-orange/90 px-8 py-3 sm:py-2.5 sm:absolute sm:right-2 w-full sm:w-fit mt-4 sm:mt-0 border border-transparent hover:border-orange hover:text-orange'>Submit</Button>
                        </form>
                        <p>Join <span>10,000+</span> other landlord in mavris community.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Page