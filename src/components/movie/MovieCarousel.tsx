import { Tmdb } from "@/lib/tmdb/types";
import type { NextComponentType, NextPageContext } from "next";
import MovieCard from "./MovieCard";
import MovieCarouselArrow from "./MovieCarouselArrow";

interface Props {
  movies: Tmdb.MovieList[];
}

export const CAROUSEL_CONTAINER_CLASS = 'carousel-container' 
export const CAROUSEL_SCROLL_CONTAINER_CLASS = 'carousel-scroll-container' 
export const CAROUSEL_CARD_CLASS = 'carousel-card' 

const MovieCarousel: NextComponentType<NextPageContext, {}, Props> = (
  props: Props
) => {
  const numVisible = 6;
  const style = {'--num-visible': numVisible} as React.CSSProperties
  const gap = '1.5rem'
  
  return (
    <div className={`relative w-full ${CAROUSEL_CONTAINER_CLASS}`} style={style}>
      <MovieCarouselArrow variant="left"/>
      <div
        className={ `flex overflow-x-scroll w-full items-stretch scroll-smooth ${CAROUSEL_SCROLL_CONTAINER_CLASS}` }
        style={{ gap}}
      >
        {props.movies.map((movie) => (
          <div
            className={ `flex-grow-0 flex-shrink-0 ${CAROUSEL_CARD_CLASS}` }
            style={{
              flexBasis: `calc((100% - ${
                numVisible - 1
              } * ${gap}) / ${numVisible})`,
            }}
          >
            <MovieCard key={movie.id} {...movie} />
          </div>
        ))}
      </div>
      <MovieCarouselArrow variant="right"/>
    </div>
  );
};

export default MovieCarousel;
