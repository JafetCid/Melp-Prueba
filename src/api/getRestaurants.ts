export const getRestaurants = async () => {
  const response = await fetch("/data/restaurants.json");

  if (!response.ok) {
    throw new Error("Error al obtener los restaurantes");
  }

  return response.json();
}