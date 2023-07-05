import VoteIndicator from "@/components/VoteIndicator";
import { tmdb } from "@/lib/tmdb";
import { tmdbCollection } from "@/lib/tmdb/collection";
import { tmdbMovie } from "@/lib/tmdb/movie";
import { prettyTime } from "@/lib/utils/pretty-time";
import Image from "next/image";

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
        "credits",
    ]);
    if (!detailWithExtra) return "no detailWithExtra";

    const collection =
        detail.belongs_to_collection?.id &&
        (await tmdbCollection.detail(detail.belongs_to_collection.id));

    const backgroundImage = await tmdb.image(
        detailWithExtra.images.backdrops[0].file_path,
        "original",
    );
    if (!backgroundImage) return "no backgroundImage";

    const posterImage = await tmdb.image(detailWithExtra.poster_path, "w300");
    if (!posterImage) return "no posterImage";

    const fromDirecting = detailWithExtra.credits.crew
        .filter((member) => member.department === "Directing")
        ?.map((member) => ({
            name: member.name,
            jobs: detailWithExtra.credits.crew
                .filter((m) => member.name === m.name)
                .map((m) => m.job)
                .join(`, `),
        }));

    return (
        <>
            <div className="w-screen h-screen">
                <Image
                    className="object-cover absolute -z-10 opacity-10"
                    src={backgroundImage}
                    fill
                    alt="backdrop"
                />
                <div className="absolute left-10" style={{ top: "40%" }}>
                    <h1 className="text-8xl font-bold ">{detail.title}</h1>
                    {detail.tagline}
                    <div className="mt-10 max-w-prose">{detail.overview}</div>
                </div>
                <div className="absolute right-10" style={{ top: "40%" }}>
                    <VoteIndicator vote={detail.vote_average} />{" "}
                </div>
            </div>
            <section className="w-full py-7 ">
                <div
                    className="overflow-hidden mx-auto my-0 flex gap-4"
                    style={{ maxWidth: "var(--max-width)" }}
                >
                    <Image
                        className="object-cover rounded-sm"
                        width={300}
                        height={800}
                        src={posterImage}
                        alt="poster"
                    />
                    <div className="py-6">
                        <header>
                            <h1>
                                {detail.title} {detail.release_date}
                            </h1>
                            <h4>
                                {detail.genres.map((g) => g.name).join(", ")} *{" "}
                                {prettyTime(detail.runtime)}
                            </h4>
                        </header>
                        <div>{detail.vote_average} User Score </div>
                        <div>{detail.tagline}</div>
                        <h3>Overview</h3>
                        <div>{detail.overview}</div>
                        <div>{JSON.stringify(fromDirecting)}</div>
                    </div>
                </div>
            </section>
            movie page
            {params.id}
            <div className="my-5">external ids</div>
            <div>{JSON.stringify(externalIds)}</div>
            <div className="my-5">detail</div>
            <div>{JSON.stringify(detail)}</div>
            <div className="my-5">detailWithExtra</div>
            <div>{JSON.stringify(detailWithExtra)}</div>
            <div className="my-5">collection</div>
            <div>{JSON.stringify(collection)}</div>
        </>
    );
};

export default page;
