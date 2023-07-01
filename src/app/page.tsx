import MovieCarousel from "@/components/movie/MovieCarousel";
import { tmdbMovie } from "@/lib/tmdb/movie";
import MainPageSection from "./MainPageSection";

export default async function Home() {
  const toprated = await tmdbMovie.topRated();
  const trending = await tmdbMovie.trending('day');

  if (!toprated) return;
  if (!trending) return;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-xs">
        <MainPageSection header="Top Rated">
          <MovieCarousel movies={toprated.results} />
        </MainPageSection>{" "}
        <MainPageSection header="Trending">
          <MovieCarousel movies={trending.results} />
        </MainPageSection>{" "}
    </main>
  );
}
