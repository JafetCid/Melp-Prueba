'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoFastFood } from "react-icons/io5";

import { PropsNavbar } from "@/types/components/navbar";

export default function Navbar({ navLinks, href }: PropsNavbar) {

    const pathname = usePathname();

    return (
        <header className="hidden md:block z-10">
            <nav className="w-full flex items-center justify-between py-3 px-3 md:px-6 bg-transparent">
                <div className="flex items-center gap-3">
                    <Link href={href as string} className="inline-flex items-center gap-3">
                        <IoFastFood size={30} className="text-orange-400" />
                        <h1 className="text-3xl font-bold">Melp</h1>
                    </Link>
                </div>

                {/* Desktop links */}
                <nav className="hidden md:flex items-center gap-4">
                    {navLinks.map(({ href, label }) => {
                        const isActive = pathname === href;
                        return (
                            <Link key={href} href={href} className="relative inline-flex items-center gap-2 font-medium rounded-md px-3 py-1">
                                <span className="hover:text-orange-400">{label}</span>
                                {isActive && (
                                    <span className="absolute -bottom-0.5 left-2 right-2 h-0.5 rounded-lg bg-orange-400" />
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </nav>
            <div className="h-px border border-gray-100 mb-8" />
        </header>
    );
}
