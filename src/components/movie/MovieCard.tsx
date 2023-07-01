import { tmdb } from "@/lib/tmdb";
import { Tmdb } from "@/lib/tmdb/types";
import type { NextComponentType, NextPageContext } from "next";
import { Star } from "../svgs";
import Plus from "../svgs/Plus";
import Link from "next/link";

import styles from './image-overlay.module.css'

interface Props extends Tmdb.Movie {}

const MovieCard: NextComponentType<NextPageContext, {}, Props> = async (
  props: Props
) => {
  const image = await tmdb.image<"poster">(props.poster_path, "w342");
  const href = `/movie/${props.id}`
  return (
    <div className="bg-zinc-800 rounded text-white overflow-hidden flex flex-col gap-2 h-full">
      <div style={{ maxHeight: "70%", width: "100%", display: "block" }}>
        <Link className={`${styles['image-link']} block`} href={href}>
          <img src={image} alt={props.title} className="object-cover w-full h-full" />
          <div className={ styles['image-overlay'] }></div>
        </Link>
      </div>
      <div className="p-2 flex flex-col gap-2 h-full">
        <div className="flex gap-1 items-center">
          <Star className="text-yellow-400 w-3 h-3" />
          <div className="text-base opacity-70">{props.vote_average}</div>
        </div>
        <Link href={href} className="font-medium text-sm hover:underline">{props.title}</Link>
        <button className="text-cyan-500 flex gap-2 items-center justify-center font-bold bg-slate-300 bg-opacity-10 rounded py-2 hover:bg-opacity-20 transition-colors mt-auto">
          <Plus width={15} strokeWidth="0.5" stroke="currentColor" />
          Watchlist
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
