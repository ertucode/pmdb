import MovieCarousel from "@/components/movie/MovieCarousel";
import { tmdbMovie } from "@/lib/tmdb/movie";

export default async function Home() {
  const toprated = await tmdbMovie.topRated();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-xs">
      {toprated && <MovieCarousel movies={toprated.results} />}
    </main>
  );
}
