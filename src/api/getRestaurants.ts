export const getRestaurants = async () => {

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const response = await fetch(`${basePath}/data/restaurants.json`);

  if (!response.ok) {
    throw new Error("Error al obtener los restaurantes");
  }

  return response.json();
}