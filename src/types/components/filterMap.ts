import { Restaurants } from "../views/restaurants";

export interface PropsFilterMap {
    center: {lat: number, lng: number};
    radius: number;
    restaurants: Restaurants[];
    onChange: (value: string) => void;
    onChangeCenter: (lat: number, lng: number) => void;    
}