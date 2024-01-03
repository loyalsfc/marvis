'use client'

import Link from "next/link";
import { ExportIcon, RoundedPlus, Search } from "../icons/icons";
import FilterBtn from "../filter-btn/filter-btn";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useAppSelector } from "@/lib/hooks/hooks";
import { cn } from "@/utils/utils";
import {DeleteProperty} from "../deleteProperty/delete-property";

export function AllProperties({property}:{property: any[] | null}){
    const [filter, setFilter] = useState<string>("All properties");
    const mobileMenuExpanded = useAppSelector(state => state.menu.value);
    
    return(
        <div className={cn("overflow-hidden h-full flex flex-col", mobileMenuExpanded && "pl-12")}>
            <header className="flex justify-between items-start flex-col gap-4 sm:flex-row md:flex-col min-[1021px]:flex-row">
                <h2 className="text-xl sm:text-2xl min-[1065px]:text-3xl font-bold text-[#1c1c1c]">Properties Management</h2>
                <div className="flex gap-3 sm:gap-[22px] justify-end ml-auto">
                    <Link href={"/dashboard/export-properties"} className="gap-2.5 btn btn-secondary border border-orange">
                        <ExportIcon />
                        Export
                    </Link>
                    <Link href={"/dashboard/new-property"} className='btn btn-primary whitespace-nowrap'>
                        <RoundedPlus color='#FFF' />
                        Add Property
                    </Link>
                </div>
            </header>
            <div className="flex items-center sm:w-5/6 border border-[#D0D5DD] py-2 mt-8 px-3 gap-2 rounded-md">
                <Search />
                <input type="text" placeholder="Search properties" disabled={property?.length === 0} className="focus:outline-none" />
            </div>
            <div className="gap-9 hidden mb-7 pt-8 guest-spacing border-b border-[#E1E1E1]">
                <FilterBtn name="All properties"  count={112} activeBtn={filter} setFunc={setFilter} />
                <FilterBtn name="Vacant Properties" count={80} activeBtn={filter} setFunc={setFilter} />
                <FilterBtn name="Expired Properties"  count={2} activeBtn={filter} setFunc={setFilter} />
                <FilterBtn name="Pre-expired Properties"  count={20} activeBtn={filter} setFunc={setFilter} />
            </div>
            <div className="overflow-y-scroll mt-7">
                <div className="relative border overflow-scroll no-scrollbar">
                    <table className="w-full">
                        <thead className="bg-orange text-white">
                            <tr>
                                <th className="p-2">Name</th>
                                <th className="p-2">Address</th>
                                <th className="p-2">Price</th>
                                <th className="p-2 hidden min-[1200px]:table-cell">Type</th>
                                <th className="p-2 hidden min-[1200px]:table-cell">Location</th>
                                <th className="p-2">Units</th>
                                <th className="p-2">Vacant</th>
                                <th className="p-2">Owner</th>
                            </tr>
                        </thead>
                        <tbody>
                            {property && property.map((item) => {
                                    return(
                                        <tr key={item.id} className="even:bg-orange/10">
                                            <td className="p-2.5 cursor-pointer overflow-hidden">
                                                <Link href={'/dashboard/all-properties/' + item.slug} className="max-w-full block min-w-[200px] hover:underline">
                                                    {item.property_title}
                                                </Link>
                                                <div className="font-medium text-sm flex gap-2 pt-1">
                                                    <Link href={`/dashboard/all-properties/${item.slug}/edit`} className="hover:underline">Edit</Link>
                                                    <DeleteProperty propertyId={item.id} />
                                                </div>
                                            </td>
                                            <td className="p-2 text-end">
                                                <p className="min-w-[200px]">{item.property_address}</p>
                                            </td>
                                            <td className="text-center p-2">{item.rent_price}</td>
                                            <td className="text-center p-2 hidden min-[1200px]:table-cell">{item.property_type}</td>
                                            <td className="text-center p-2 hidden min-[1200px]:table-cell">{item.property_location}</td>
                                            <td className="text-center p-2">{item.units}</td>
                                            <td className="text-center p-2">{item.vacant_units ?? "-"}</td>
                                            <td className="text-center p-2 whitespace-nowrap">{item.property_owner.first_name + " " + item.property_owner.last_name}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    {property?.length === 0 && (
                        <div className="py-14 text-[#282828]">
                            <Link href="/dashboard/new-property" className=" text-3xl mx-auto grid place-content-center h-20 w-20 rounded-full bg-orange/20">
                                <FaPlus />
                            </Link>
                            <p className="font-medium text-2xl text-center pt-4">Add Properties</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}