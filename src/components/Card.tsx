'use client'

import Image from 'next/image' 
import { IoCall, IoGlobeOutline, IoLocationSharp, IoMailSharp } from 'react-icons/io5';

import { PropsCard } from '@/types/components/card';

export default function Card({ rating, srcImg, name, state, city, street, email, phone, site }:PropsCard) {
    return (
        <div className="flex flex-col shadow-xl rounded-xl w-fit hover:-translate-y-1 transition-all duration-300">
            <div className="flex">
                <span className="absolute bg-white py-1 px-4 m-2 rounded-xl">⭐ {rating}</span>
                <Image src={srcImg} alt="" width={500} height={500} className="object-center rounded-t-xl" />    
            </div>
            <div className="flex flex-col gap-2 p-5">
                <p className="text-lg font-semibold break-all">{name}</p>
                <p className="flex gap-2 break-all"><IoCall size={20} /> {phone}</p>
                <p className="flex gap-2 break-all"><IoGlobeOutline size={20} /> {site}</p>
                <p className="flex gap-2 break-all"><IoMailSharp size={20} /> {email}</p>
                <p className="flex gap-2 break-all"><IoLocationSharp size={20} /> {street}, {state}, {city}</p>
            </div>
        </div>
    )
}
