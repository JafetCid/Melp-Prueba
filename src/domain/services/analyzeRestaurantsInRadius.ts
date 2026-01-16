import { Restaurants } from '@/types/views/restaurants';

// Grados a radianes
const toRadians = (degrees: number) => degrees * (Math.PI / 180);

// Distancia entre dos puntos (metros)
const getDistanceInMeters = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371000; // Radio de la tierra en metros

  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

// 3 Restaurantes mas cercanos
export const getClosestRestaurants = (center: { lat: number; lng: number }, restaurants: Restaurants[], limit = 4) => {
  return restaurants
    .map((restaurant) => {
      const distance = getDistanceInMeters(
        center.lat,
        center.lng,
        restaurant.address.location.lat,
        restaurant.address.location.lng
      );

      return {
        ...restaurant,
        distance,
      };
    })
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
};

type Center = {
  lat: number;
  lng: number;
}

export const countRestaurantsRadius = (center: Center, restaurants: Restaurants[], radius: number ): number => {
   return restaurants.filter((restaurant) => {
    const distance = getDistanceInMeters(
      center.lat,
      center.lng,
      restaurant.address.location.lat,
      restaurant.address.location.lng
    );

    return distance <= radius;
  }).length;
}


// Función principal
export const analyzeRestaurantsInRadius = (restaurants: Restaurants[], centerLat: number, centerLng: number, radiusMeters: number) => {
  const filtered = restaurants.filter((restaurant) => {
    const { lat, lng } = restaurant.address.location;

    const distance = getDistanceInMeters(
      centerLat,
      centerLng,
      lat,
      lng
    );

    return distance <= radiusMeters;
  });

  const count = filtered.length;

  const averageRating =
    count === 0
      ? 0
      : filtered.reduce((acc, r) => acc + r.rating, 0) / count;

  const variance =
    count === 0
      ? 0
      : filtered.reduce((acc, r) => {
        return acc + Math.pow(r.rating - averageRating, 2);
      }, 0) / count;

  const standardDeviation = Math.sqrt(variance);

  return {
    count,
    averageRating,
    standardDeviation,
    restaurants: filtered,
  };
};
