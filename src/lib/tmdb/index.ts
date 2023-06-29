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
  get: (path: string) => {
    options.method = "GET";
    return fetch(tmdb.path(path), options);
  },
  image: async (path: string): Promise<string> => {
    const token = process.env.TMDB_ACCESS_TOKEN;
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      accept: "blob",
    });
    const imageRes = await fetch(tmdb.path(path), { headers });
    console.log(imageRes)
    const reader = new FileReader();
    if (imageRes.ok)
      return new Promise(async (resolve, _) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(await imageRes.blob());
      });
    return "";
  },
};
