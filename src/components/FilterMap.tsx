'use client'

import { MapContainer, TileLayer, Marker, Circle, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { PropsFilterMap } from "@/types/components/filterMap";
import { getClosestRestaurants } from "@/domain/services/analyzeRestaurantsInRadius";
import Image from "next/image";
import { IoRestaurantSharp } from "react-icons/io5";


export default function FilterMap({ center, radius, restaurants, onChangeCenter, onChange }: PropsFilterMap) {
    
    // Captura click en el mapa
    const ClickHandler = ({ onChangeCenter }: { onChangeCenter: (lat: number, lng: number) => void }) => {
        useMapEvents({
            click(e) {
                onChangeCenter(e.latlng.lat, e.latlng.lng);
            },
        });

        return null;
    }

    const closestRestaurants = getClosestRestaurants(center, restaurants);
    
    const markerIcon = new L.Icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    });

    const markerIconRestaurants = new L.Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    });
    
    return (
        <div className="px-8 mb-10">
            <h1 className="text-xl font-bold mb-5">Seleccione una ubicación para ver los detalles del restaurante</h1>
            <div className="bg-white mb-5 w-full md:w-fit">
                <label className="flex justify-between items-center font-semibold mb-1">
                    Radio <span className="bg-orange-100 text-orange-500 py-.5 px-3 rounded-full">{(radius / 1000).toFixed(1)} km</span>
                </label>
                <input
                    type="range"
                    min={500}
                    max={5000}
                    step={500}
                    value={radius}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-full appearance-none accent-orange-400 sm:w-56"
                />
            </div>
            <div className="flex flex-col gap-5 xl:flex-row">
                <MapContainer
                    className="w-full h-125 xl:w-[50%]"
                    center={center}
                    zoom={14}
                    scrollWheelZoom
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="© OpenStreetMap contributors"
                    />

                    {/* Detectar click */}
                    <ClickHandler onChangeCenter={onChangeCenter} />

                    {/* Centro, ubicación seleccionada */}
                    <Marker
                        position={center}
                        draggable
                        icon={markerIconRestaurants}
                        eventHandlers={{
                            dragend: (e) => {
                                const marker = e.target as L.Marker;
                                const pos = marker.getLatLng();
                                onChangeCenter(pos.lat, pos.lng);
                            },
                        }}
                    />

                    {/* Radio */}
                    <Circle
                        center={center}
                        radius={radius}
                        pathOptions={{
                            color: "orange",
                            fillColor: "orange",
                            fillOpacity: 0.15,
                        }}
                    />

                    {/* Restaurantes */}
                    {restaurants.map((r) => (
                        <Marker
                            key={r.id}
                            position={[
                                r.address.location.lat,
                                r.address.location.lng,
                            ]}
                            icon={markerIcon}
                        >
                            <Popup closeButton={false}>
                                <div className="flex items-center gap-3 p-2 min-w-45">
                                    <img
                                        src="/images/platillo2.png"
                                        alt=""
                                        className="w-10 h-10 rounded-full object-cover"
                                    />

                                    <div>
                                        <p className="font-semibold text-sm">
                                            {r.name}
                                        </p>

                                        <div className="flex items-center gap-1 text-orange-500">
                                            ⭐
                                            <span className="text-sm font-medium text-black">
                                                {r.rating}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>

                {/* Recomendaciones */}
                <div className="w-full xl:w-1/2">
                    <div className="flex justify-center gap-2">
                        <IoRestaurantSharp size={25} className="text-orange-400" />
                        <h2 className="text-xl text-center font-bold text-orange-400 mb-5">Recomendaciones más cercanas</h2>
                    </div>
                    <div className="h-px border border-gray-200 mb-8" />
                    {closestRestaurants.length === 0 ? (
                        <p className="text-center text-lg text-gray-500">No se encontraron recomendaciones disponibles para esta ubicación.</p>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 place-items-center sm:grid-cols-2">
                            {closestRestaurants.map((r, index) => (
                            <div key={index} className="flex flex-col w-full max-w-md bg-gray-50 rounded-xl shadow-md p-6 transition hover:shadow-lg sm:flex-row sm:items-center">
                                <div className="shrink-0 flex justify-center sm:justify-start">
                                    <Image
                                        src="/images/platillo2.png"
                                        alt={r.name}
                                        width={80}
                                        height={80}
                                        className="w-20 h-20 rounded-full object-cover"
                                    />
                                </div>

                                <div className="flex flex-col justify-between flex-1 mt-4 sm:mt-0 sm:ml-5">
                                    <div className="space-y-1">
                                        <p className="font-semibold text-center sm:text-left line-clamp-1">
                                            {r.name}
                                        </p>
                                        <p className="text-sm text-gray-500 text-center sm:text-left line-clamp-1">
                                            {r.address.street}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        <span className="font-medium">⭐ {r.rating}</span>
                                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-600">
                                            Abierto
                                        </span>
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
}