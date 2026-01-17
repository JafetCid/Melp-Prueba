'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import Loading from '@/components/Loading';
import { IoArrowForward } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import dynamic from "next/dynamic";

import Card from '@/components/Card'
import { Restaurants } from '@/types/views/restaurants';
import { useLoading } from '@/context/loadingContext';
import { analyzeRestaurantsInRadius } from '@/domain/services/analyzeRestaurantsInRadius';
import { getRestaurants } from '@/api/getRestaurants';

const RestaurantsMap = dynamic(
  () => import("../components/FilterMap"),
  { ssr: false }
);

const basePath = process.env.NODE_ENV === 'production' ? '/Melp-Prueba' : '';

export default function Home() {

  const route = useRouter();
  const { setIsLoading } = useLoading();
  const [restaurants, setRestaurants] = useState<Restaurants[]>([]);
  const [radius, setRadius] = useState(1000); // metros
  const [center, setCenter] = useState({ // Centro del mapa CDMX
    lat: 19.4326,
    lng: -99.1332,
  });

  useEffect(() => {
    const getRestaurant = async () => {
      try {
        setIsLoading(true);
        const res = await getRestaurants();
        setRestaurants(res);
      } catch (error) {
        console.error("Error al cargar restaurantes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getRestaurant();
  }, []);

  const result = useMemo(() => {
    return analyzeRestaurantsInRadius(
      restaurants,
      center.lat,
      center.lng,
      radius
    );
  }, [restaurants, center, radius]);

  // Ordenar de mayor a menor
  const sortedRestaurants = [...restaurants].sort((a, b) => b.rating - a.rating).slice(0, 6);

  if (restaurants.length === 0) return <Loading />

  return (
    <>
      <div className="flex justify-center items-center p-2 mb-10 md:p-8">
        <h1 className="absolute text-center text-3xl w-80 text-white font-bold hover:text-gray-200 md:w-2xl md:text-5xl lg:w-4xl lg:text-6xl">¡Descubre la Comida que se Encuentra en Tu Ciudad!</h1>
        <Image src={`${basePath}/images/platillo.jpg`} alt="img-1" width={800} height={500} className="object-cover w-full h-112.5 rounded-2xl" />
      </div>

      <div className="flex flex-col w-full px-8 mb-16">
        <div>
          <span className="text-lg font-semibold text-orange-400">Recomendado</span>
        </div>
        <div className="flex flex-col justify-between w-full mb-10 md:flex-row">
          <h2 className="text-2xl font-bold">Top 6 Mejores Restaurantes</h2>
          <p onClick={() => route.push("restaurants")} className="flex items-center text-lg gap-2 cursor-pointer mt-5 hover:-translate-y-1 transition-all duration-300 md:mt-0">Ver todos <IoArrowForward size={20} /></p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedRestaurants.map((restaurant, index) => (
            <Card
              key={index}
              srcImg={`${basePath}/images/platillo.jpg`}
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

      <RestaurantsMap
        center={center}
        radius={radius}
        restaurants={result.restaurants}
        onChangeCenter={(lat, lng) => setCenter({ lat, lng })}
        onChange={(value) => setRadius(Number(value))}
      />
    </>
  )
}