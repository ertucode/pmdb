import { tmdb } from "@/lib/tmdb";
import { Tmdb } from "@/lib/tmdb/types";
import type { NextComponentType, NextPageContext } from "next";
import Image from 'next/image'

interface Props extends Tmdb.Movie {}

const MovieCard: NextComponentType<NextPageContext, {}, Props> = async (
  props: Props,
) => {
  return (
    <div className="bg-slate-150 rounded">
        <Image src={tmdb.path(props.poster_path.substring(1))} width={200} height={400} alt={ props.title } />
        {props.title}</div>
  )
}

export default MovieCard

