export namespace Tmdb {
  export type ListResponse<T> = {
    total_pages: number;
    total_results: number;
    results: T[];
    page: number;
  };

  export type MovieList = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  };

  export type MovieExternalId = {
    id: number;
    imdb_id: string;
    wikidata_id: string;
    facebook_id: string;
    instagram_id: string;
    twitter_id: string;
  };

  export type MovieImage = {
    aspect_ratio: string;
    height: number;
    iso_639_1: null | string;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
  };

  export type MovieImages = {
    backdrops: MovieImage[];
    logos: MovieImage[];
    posters: MovieImage[];
  };

  export type MovieKeywords = {
    // not a typo
    keywords: {
      id: number;
      name: string;
    }[];
  };

  export type MovieReviews = Tmdb.ListResponse<{
    author: string;
    author_details: {
      name: string;
      username: string;
      avatar_path: string | null;
      rating: number | null;
    };
    content: string;
    created_at: string;
    id: string;
    updated_at: string;
    url: string;
  }>;

  export type MovieSimilar = ListResponse<MovieList>;

  export type MixedList =
    | ({
        media_type: "movie";
      } & MovieList)
    | ({
        media_type: "tv";
      } & TvList);

  export type MovieListByUser = ListResponse<{
    description: string;
    favorite_count: number;
    id: number;
    item_count: number;
    iso_639_1: string;
    list_type: "movie";
    name: string;
    poster_path: null | string;
  }>;

  export type MovieDetailExtraMap = {
    external_ids: MovieExternalId;
    images: MovieImages;
    keywords: MovieKeywords;
    reviews: MovieReviews;
    similar: MovieSimilar;
    recommendations: ListResponse<MixedList>;
    lists: MovieListByUser;
  };

  export type MovieDetailExtra = keyof MovieDetailExtraMap;

  export type MovieDetail = {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: {
      id: number;
      name: string;
      poster_path: string;
      backdrop_path: string;
    };
    budget: number;
    genres: { id: number; name: string }[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
    }[];
    production_countries: {
      iso_3166_1: string;
      name: string;
    }[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: {
      english_name: string;
      iso_639_1: string;
      name: string;
    }[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  };

  export type TvList = {
    adult: boolean;
    backdrop_path: string;
    id: number;
    name: string;
    original_language: string;
    original_name: string;
    overview: string;
    poster_path: string;
    genre_ids: number[];
    popularity: number;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
    origin_country: string[];
  };

  export type CollectionDetail = {
    id: number;
    name: string;
    overview: string;
    poster_path:string;
    backdrop_path:string;
    parts: MixedList[];
  };

  export type Configuration = {
    images: {
      base_url: string;
      secure_base_url: string;
      backdrop_sizes: ["w300", "w780", "w1280", "original"];
      logo_sizes: ["w45", "w92", "w154", "w185", "w300", "w500", "original"];
      poster_sizes: ["w92", "w154", "w185", "w342", "w500", "w780", "original"];
      profile_sizes: ["w45", "w185", "h632", "original"];
      still_sizes: ["w92", "w185", "w300", "original"];
    };
    change_keys: string[];
  };

  export type ImageType = {
    [K in keyof Configuration["images"]]: K extends `${infer T}_sizes`
      ? T
      : never;
  }[keyof Configuration["images"]];

  export type ImageSizeFromType<T extends ImageType> =
    Configuration["images"][`${T}_sizes`][number];
}
