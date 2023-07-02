import { tmdbCollection } from "@/lib/tmdb/collection";
import { tmdbMovie } from "@/lib/tmdb/movie";

const page = async ({ params }: { params: { id: string } }) => {
  const externalIds = await tmdbMovie.externalId(parseInt(params.id));
  if (!externalIds) return "no external ids";

  const detail = await tmdbMovie.detail(parseInt(params.id));
  if (!detail) return "no detail";

  const detailWithExtra = await tmdbMovie.detailWithExtra(parseInt(params.id), [
    "external_ids",
    "images",
    "recommendations",
    "reviews",
    "lists",
    "similar",
    "keywords",
  ]);
  if (!detailWithExtra) return "no detailWithExtra";

  const collection =  (detail.belongs_to_collection?.id) && await tmdbCollection.detail(detail.belongs_to_collection.id) 
  
  return (
    <>
      movie page
      {params.id}
      <div className="my-5">external ids</div>
      <div>{JSON.stringify(externalIds)}</div>
      <div className="my-5">detail</div>
      <div>{JSON.stringify(detail)}</div>
      <div className="my-5" >detailWithExtra</div>
      <div>{JSON.stringify(detailWithExtra)}</div>
      <div className="my-5">collection</div>
      <div>{JSON.stringify(collection)}</div>
    </>
  );
};

export default page;
