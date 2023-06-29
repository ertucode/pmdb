import { tmdb } from ".";
import { Tmdb } from "./types";

const handleResponse = <T>(res: Response) => {
    return res.ok ? res.json() as T : undefined
}

export const tmdbMovie = {
    topRated: async() => handleResponse<Tmdb.ListResponse<Tmdb.Movie>>(await tmdb.get('movie/top_rated'))
}
