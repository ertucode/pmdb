import { tmdb } from ".";
import { UnionToIntersection } from "../utils/types";
import { Tmdb } from "./types";

export const tmdbMovie = {
  topRated: async () =>
    await tmdb.get<Tmdb.ListResponse<Tmdb.MovieList>>("movie/top_rated"),
  trending: async (timeWindow: "day" | "week") =>
    await tmdb.get<Tmdb.ListResponse<Tmdb.MovieList>>(
      `trending/movie/${timeWindow}`
    ),
  externalId: async (id: number) =>
    await tmdb.get<Tmdb.MovieExternalId>(`movie/${id}/external_ids`),
  detail: async (id: number) => await tmdb.get<Tmdb.MovieDetail>(`movie/${id}`),
  detailWithExtra: async <TExtra extends Tmdb.MovieDetailExtra>(
    id: number,
    extra: TExtra[]
  ) =>
    await tmdb.get<Tmdb.MovieDetail & UnionToIntersection<Tmdb.MovieDetailExtraMap[TExtra]>>(
      `movie/${id}?append_to_response=${extra.join(",")}`
    ),
};

