'use client'

import { useEffect, useState } from 'react'

import Card from '@/components/Card';
import { useLoading } from '@/context/loadingContext';
import { Restaurants } from '@/types/views/restaurants';
import Loading from '@/components/Loading';
import ScrollToTop from '@/components/ScrollTop';
import { getRestaurants } from '@/api/getRestaurants';

const basePath = process.env.NODE_ENV === 'production' ? '/Melp-Prueba' : '';

export default function page() {

    const { setIsLoading } = useLoading();
    const [restaurants, setRestaurants] = useState<Restaurants[]>([]);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);

    useEffect(() => {
        const getRestaurant = async () => {
            try {
                setIsLoading(true);
                const res = await getRestaurants();
                setRestaurants(res);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getRestaurant();
    }, []);

    // Ordenar de mayor a menor
    const sortedRestaurants = [...restaurants].sort((a, b) => b.rating - a.rating);

    const filteredRestaurants = selectedRating === null
        ? sortedRestaurants
        : restaurants.filter(r => r.rating === selectedRating);

    if (restaurants.length === 0) return <Loading />

    return (
        <>
            <div className="flex flex-col w-full px-8 mt-10 mb-10">
                <h2 className="text-2xl text-center font-bold mb-8">Ranking de Restaurantes</h2>
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    <button
                        onClick={() => setSelectedRating(null)}
                        className={`px-4 py-2 rounded-lg border transition ${selectedRating === null ? "bg-orange-400 text-white" : "bg-white hover:bg-orange-100"}`}
                    >
                        Todos
                    </button>

                    {[4, 3, 2, 1, 0].map(rating => (
                        <button
                            key={rating}
                            onClick={() => setSelectedRating(rating)}
                            className={`px-4 py-2 rounded-lg border transition ${selectedRating === rating ? "bg-orange-400 text-white" : "bg-white hover:bg-orange-100"}`}
                        >
                            ⭐ {rating}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredRestaurants.map((restaurant, index) => (
                        <Card
                            key={index}
                            srcImg={`${basePath}/images/platillo2.jpg`}
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
            <ScrollToTop />
        </>
    )
}
