import MovieCard from "@/components/MovieCard";
import { tmdbMovie } from "@/lib/tmdb/movie";

export default async function Home() {
  const toprated = await tmdbMovie.topRated();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-xs">
      {toprated?.results.map((movie) => <MovieCard key={movie.id} {...movie} />)}
    </main>
  );
}


/*
 * https://developer.themoviedb.org/reference/configuration-details
 * https://developer.themoviedb.org/docs/image-basics
 * https://www.themoviedb.org/talk/5f3ef4eec175b200365ee352
 * */
