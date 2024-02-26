export interface RentResponse {
    movie: string;
}

export interface RentalsResponse {
    count: number;
    next: string;
    previous: string;
    results: Rental[];
}

export interface Rental {
    uuid: string;
    rental_date: string;
    return_date: string;
    is_paid: boolean;
    user: number;
    movie: string;
}