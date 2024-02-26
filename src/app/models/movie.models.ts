export interface MoviesResponse {
    count: number;
    next: string;
    previous: string;
    results: Movie[];
}

export interface Movie {
    uuid: string;
    title: string;
    pub_date: number;
    duration: number;
    rating: number;
    description: string;
    poster_url: string;
}

export interface MovieCategory {
    name: string;
}

export interface NewMovie {
    title: string;
    pub_date: number;
    duration: number;
    rating: number;
    description: string;
    categories: string[]
  }