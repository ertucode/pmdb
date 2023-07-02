import { tmdb } from ".";
import { Tmdb } from "./types";



export const tmdbCollection = {
    detail: async(id: number) => await tmdb.get<Tmdb.CollectionDetail>(`collection/${id}`)
}
