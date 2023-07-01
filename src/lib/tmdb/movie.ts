import { tmdb } from ".";
import { Tmdb } from "./types";

export const tmdbMovie = {
    topRated: async() => await tmdb.get<Tmdb.ListResponse<Tmdb.Movie>>('movie/top_rated')
}
