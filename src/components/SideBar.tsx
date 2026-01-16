'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { PropsNavbar } from '@/types/components/navbar';
import { IoFastFood } from 'react-icons/io5';

export default function SideBar({ navLinks }: PropsNavbar) {

    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen((prev) => !prev);

    useEffect(() => {
        if (isOpen) {
            // Bloquea el scroll del body
            document.body.style.overflow = "hidden";
        } else {
            // Restaura el scroll cuando se cierra el menú
            document.body.style.overflow = "auto";
        }
    }, [isOpen]);


    return (
        <>
            <nav className={`flex justify-between items-center py-4 px-4 md:hidden z-10 ${isOpen ? "touch-none overflow-y-hidden" : ""}`} >
                <div className="flex items-center gap-3">
                    <IoFastFood size={30} className="text-orange-400" />
                    <h1 className="text-3xl font-bold">Melp</h1>
                </div>
                <button onClick={toggleSidebar} className={`relative z-20 w-7 h-5 flex flex-col justify-between items-center`}>
                    <span className={`block h-1 w-full bg-black rounded transform transition duration-300 ease-in-out ${isOpen ? "rotate-45 translate-y-2" : ""}`}></span>
                    <span className={`block h-1 w-full bg-black rounded transition-all duration-300 ease-in-out ${isOpen ? "opacity-0" : "opacity-100"}`}></span>
                    <span className={`block h-1 w-full bg-black rounded transform transition duration-300 ease-in-out ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
                </button>

                {/* Sidebar */}
                <div className={`fixed top-0 right-0 h-screen w-64 bg-white text-black shadow-lg transform transition-transform duration-700 ease-in-out z-10
                    ${isOpen ? "translate-x-0 p-8" : "translate-x-full p-8"}`}
                >
                    <div className="flex flex-col gap-6 pt-10">
                        {navLinks.map(({ href, label }) => (
                            <div key={label}>
                                <Link href={href} onClick={() => setIsOpen(false)} className="flex gap-2">
                                    <p className="flex flex-col">
                                        {label}
                                        {pathname === href && (
                                            <span className="relative left-0 bottom-0 h-0.5 w-full bg-orange-400"></span>
                                        )}
                                    </p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </nav>
        </>
    );
}