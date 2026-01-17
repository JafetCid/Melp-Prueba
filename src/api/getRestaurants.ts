export const getRestaurants = async () => {

  const basePath = process.env.NODE_ENV === 'production' ? '/Melp-Prueba' : '';

  const response = await fetch(`${basePath}/data/restaurants.json`);

  if (!response.ok) {
    throw new Error("Error al obtener los restaurantes");
  }

  return response.json();
}