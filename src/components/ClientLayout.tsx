'use client'

import Navbar from '@/components/Navbar';
import SideBar from './SideBar';
import Footer from './Footer';
import LoadingProvider from '@/context/loadingContext';

export default function ClientLayout({ children }: { children: React.ReactNode }) {

    const navLinks = [
        { href: "/", label: "Inicio" },
        { href: "/restaurants", label: "Restaurantes" },
    ];

    return (
        <>
            <LoadingProvider>
                <SideBar navLinks={navLinks} />
                <Navbar href="/" navLinks={navLinks} />
                <main>{children}</main>
                <Footer />
            </LoadingProvider>
        </>
    );
}