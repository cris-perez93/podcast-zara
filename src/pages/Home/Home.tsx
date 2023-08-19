import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";

interface IPodcast {
  id: string;
  name: string;
  artist: string;
  image: string;
}

const Home = () => {
  // Almacenamos los podcasts en el estado
  const [podcasts, setPodcasts] = useState<IPodcast[]>([]);
  // Almacenamos el término de búsqueda en el estado
  const [searchTerm, setSearchTerm] = useState<string>("");
  // Agarramos el último tiempo de actualización de localStorage en el caso de que exista o lo inicializamos a null
  const [lastFetchTime, setLastFetchTime] = useState<number | null>(
    localStorage.getItem("lastFetchTime")
      ? parseInt(localStorage.getItem("lastFetchTime") || "")
      : null
  );

  // ref para un ul
  const divRef = useRef<HTMLUListElement>(null);

  // Obtiene los podcasts de la API de iTunes
  const fetchPodcast = async () => {
    try {
      const currentTime = Date.now();
      // Si no hay lastFetchTime o si han pasado más de 24 horas desde la última actualización, actualizamos los podcasts
      if (!lastFetchTime || currentTime - lastFetchTime > 24 * 60 * 60 * 1000) {
        const response = await fetch(
          "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
        );
        const data = await response.json();
        const podcastEntries = data.feed.entry.map((entry: any) => {
          const id = entry.id.attributes["im:id"];
          const name = entry["im:name"].label;
          const artist = entry["im:artist"].label;
          const image = entry["im:image"][2].label;
          return {
            id,
            name,
            artist,
            image,
          };
        });
        setPodcasts(podcastEntries);
        setLastFetchTime(currentTime);
        localStorage.setItem("lastFetchTime", currentTime.toString());
        localStorage.setItem("cachedPodcasts", JSON.stringify(podcastEntries));
      } else {
        const cachedPodcasts = JSON.parse(
          localStorage.getItem("cachedPodcasts") || ""
        );
        setPodcasts(cachedPodcasts);
      }
    } catch (error) {
      console.error("Error al obtener los podcasts:", error);
    }
  };

  useEffect(() => {
    fetchPodcast();
  }, []);

  useEffect(() => {
    // Almacenamos en caché los podcasts en localStorage
    if (podcasts.length > 0) {
      localStorage.setItem("cachedPodcasts", JSON.stringify(podcasts));
    }
  }, [podcasts]);

  // Filtra los podcasts según el término de búsqueda tanto por name como por artist
  const filteredPodcasts = podcasts.filter(
    (podcast) =>
      podcast.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      podcast.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // agregar animación cada vez que se filtra un podcast
  useEffect(() => {
    if (divRef.current) {
      divRef.current.classList.add("animate-fade-in");
      setTimeout(() => {
        divRef.current?.classList.remove("animate-fade-in");
      }, 1000);
    }
  }, [filteredPodcasts]);

  return (
    <div className="flex flex-col  py-5  px-5  w-full mx-auto ">
      <div className=" flex justify-end py-5 w-full m-auto">
        <input
          type="text"
          className="border px-2 border-gray-300 outline-none rounded-sm p-1"
          placeholder="Filter podcasts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul
        ref={divRef}
        className="xl:grid xl:grid-cols-4 flex justify-center flex-wrap min-w-full m-auto gap-5 mt-10"
      >
        {filteredPodcasts.map((podcast) => (
          <Link key={podcast.id} to={`/podcast/${podcast.id}`}>
            <li className="flex mt-32 bg-white hover:-translate-y-2 transition-all px-5 py-2 flex-col relative min-h-[180px] m-auto shadow-md w-[260px] rounded-sm items-center justify-center">
              <img
                className="m-auto w-28 absolute -top-20 left-1/2 transform -translate-x-1/2 rounded-full"
                src={podcast.image}
                alt={podcast.name}
              />
              <div className="text-center mt-10">
                <h2 className="uppercase font-medium">{podcast.name}</h2>
                <p className="text-gray-400">Author:{podcast.artist}</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Home;
