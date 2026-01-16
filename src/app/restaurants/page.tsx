'use client'

import { useEffect, useState } from 'react'

import Card from '@/components/Card';
import { useLoading } from '@/context/loadingContext';
import { Restaurants } from '@/types/views/restaurants';
import Loading from '@/components/Loading';
import ScrollToTop from '@/components/ScrollTop';

export default function page() {

    const { setIsLoading } = useLoading();
    const [restaurants, setRestaurants] = useState<Restaurants[]>([]);

    useEffect(() => {
        const getRestaurants = async () => {
            try {
                setIsLoading(true);
                const res = await fetch("/api/restaurants");
                const data = await res.json();
                setRestaurants(data);
            } catch (error) {
                console.error("Error al cargar restaurantes:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getRestaurants();
    }, []);

    // Ordenar de mayor a menor
    const sortedRestaurants = [...restaurants].sort((a, b) => b.rating - a.rating);

    if (restaurants.length === 0) return <Loading />

    return (
        <>
            <div className="flex flex-col w-full px-8 mt-10 mb-10">
                <h2 className="text-2xl text-center font-bold mb-10">Ranking de Restaurantes</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {sortedRestaurants.map((restaurant, index) => (
                        <Card
                            key={index}
                            srcImg="/images/platillo2.png"
                            rating={restaurant.rating}
                            name={restaurant.name}
                            state={restaurant.address.state}
                            city={restaurant.address.city}
                            street={restaurant.address.street}
                            phone={restaurant.contact.phone}
                            site={restaurant.contact.site}
                            email={restaurant.contact.email}
                        />
                    ))}
                </div>
            </div>
            <ScrollToTop/>
        </>
    )
}
