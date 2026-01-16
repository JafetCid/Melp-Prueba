'use client'

import Image from 'next/image'
import { useState } from 'react';
import { IoCall, IoGlobeOutline, IoLocationSharp, IoMailSharp, IoShareSocialSharp, IoThumbsUpSharp } from 'react-icons/io5';

import { PropsCard } from '@/types/components/card';

export default function Card({ rating, srcImg, name, state, city, street, email, phone, site }: PropsCard) {

    // Estado si el usuario ya dio like
    const [liked, setLiked] = useState<boolean>(false);
    // Estado contador de likes
    const [likes, setLikes] = useState<number>(1200);

    const toggleLike = () => {
        if (liked) {
            // Si ya estaba en me gusta, lo quitamos
            setLiked(false);
            setLikes(likes - 1);
        } else {
            // Si no estaba, lo agregamos
            setLiked(true);
            setLikes(likes + 1);
        }
    }

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: name,
                    url: site,
                });
            } catch (error) {
                console.error("Error al compartir:", error);
            }
        }
    }

    return (
        <div className="flex flex-col shadow-xl rounded-xl w-fit">
            <div className="flex">
                <span className="absolute bg-white py-1 px-4 m-2 rounded-xl">⭐ {rating}</span>
                <Image src={srcImg} alt="" width={500} height={500} className="object-center rounded-t-xl" />
            </div>
            <div className="flex flex-col gap-4 p-5 text-gray-500">
                <p className="text-lg font-semibold break-all text-black">{name}</p>
                <p className="flex gap-2 break-all"><IoCall size={20} /> {phone}</p>
                <p className="flex gap-2 break-all"><IoGlobeOutline size={20} /> {site}</p>
                <p className="flex gap-2 break-all"><IoMailSharp size={20} /> {email}</p>
                <p className="flex gap-2 break-all"><IoLocationSharp size={20} /> {street}, {state}, {city}</p>
                <div className="h-px border border-gray-200"></div>
                <div className="flex flex-wrap gap-2 justify-between">
                    <div className="flex gap-3 items-center">
                        <button
                            onClick={toggleLike}
                            className={`flex items-center gap-1 cursor-pointer hover:-translate-y-1 transition-all duration-300 ${liked ? "text-orange-400" : "text-gray-500"
                                } hover:text-orange-400`}
                        >
                            <IoThumbsUpSharp size={20} />
                            {likes}
                        </button>

                        <button onClick={handleShare} className="flex items-center gap-1 cursor-pointer hover:text-orange-400 hover:-translate-y-1 transition-all duration-300"><IoShareSocialSharp size={20} /> Compartir</button>
                    </div>
                    <p className="py-1 px-4 bg-green-200 text-green-600 rounded-lg w-fit">Abierto</p>
                </div>
            </div>
        </div>
    )
}
