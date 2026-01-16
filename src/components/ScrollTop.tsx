'use client'

import { useEffect, useState } from "react";
import { IoArrowUp } from "react-icons/io5";

export default function ScrollToTop() {

    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (!visible) return null;

    return (
        <button
            onClick={scrollToTop}
            aria-label="Ir arriba"
            className="fixed bottom-6 right-6 z-50 p-3 cursor-pointer rounded-full bg-orange-400 text-white shadow-lg transition hover:bg-amber-500 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-300" >
            <IoArrowUp size={22} />
        </button>
    );
}
