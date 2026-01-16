export interface Restaurants {
    id: string;
    rating: number;
    name: string;
    contact: {
        site: string;
        email: string;
        phone: string;
    };
    address: {
        street: string;
        city: string;
        state: string;
        location: {
            lat: number;
            lng: number;
        }
    }
}