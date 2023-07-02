import { handleResponse } from "../utils/handle-response";
import { Tmdb } from "./types";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
  },
};

export const tmdb = {
  path: (path: string) => {
    return `https://api.themoviedb.org/3/${path}`;
  },
  get: async <T>(path: string) => {
    options.method = "GET";
    return handleResponse<T>(await fetch(tmdb.path(path), options));
  },
  image: async <TImageType extends Tmdb.ImageType>(
    path: string,
    size: Tmdb.ImageSizeFromType<TImageType>
  ): Promise<string> => {
    const config = await tmdb.config();
    if (!config) return "";

    return `${config.images.secure_base_url}${size}${path}`;
  },
  config: async () => {
    return tmdb.get<Tmdb.Configuration>("configuration");
  },
};
