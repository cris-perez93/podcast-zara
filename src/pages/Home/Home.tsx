import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { usePodcast } from "../../context/PodcastContext/PodcastContext";
import useListPodcast from "./hooks/useListPodcast";
import Loading from "../../components/Loading";

/**
 * @description This component is used to show the list of podcasts
 */

const Home = () => {
  const { podcasts } = usePodcast();
  // Almacenamos el término de búsqueda en el estado
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { onGetListPodcast, lastFetchTime, loading } = useListPodcast();

  // ref para la lista de podcasts
  const divRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const currentTime = Date.now();
    if (!lastFetchTime || currentTime - lastFetchTime > 24 * 60 * 60 * 1000) {
      onGetListPodcast();
    }
  }, []);

  // Filtra los podcasts según el término de búsqueda tanto por name como por artist
  const filteredPodcasts = podcasts.filter(
    (podcast) =>
      podcast.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      podcast.author.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="flex flex-col w-full mx-auto ">
      {loading && <Loading />}

      <div className=" flex sm:justify-end justify-center py-5 w-full m-auto">
        <input
          type="text"
          data-testid="search-input"
          className="border px-2 border-gray-300 outline-none rounded-sm p-1"
          placeholder="Filter podcasts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ul
        ref={divRef}
        className=" flex flex-wrap sm:justify-around justify-center min-w-full m-auto gap-5 mt-10"
      >
        {filteredPodcasts && filteredPodcasts.length > 0 ? (
          filteredPodcasts.map((podcast) => (
            <Link key={podcast.id} to={`/podcast/${podcast.id}`}>
              <li
                data-testid={`podcast-card-${podcast.id}`}
                className="flex mt-32 bg-white hover:-translate-y-2 transition-all px-5 py-2 flex-col relative min-h-[180px] m-auto shadow-md w-[260px] rounded-sm items-center justify-center"
              >
                <img
                  className="m-auto w-28 absolute -top-20 left-1/2 transform -translate-x-1/2 rounded-full"
                  src={podcast.image}
                  alt={podcast.name}
                />
                <div className="text-center mt-10">
                  <h2 className="uppercase font-medium">{podcast.name}</h2>
                  <p className="text-gray-400">Author:{podcast.author}</p>
                </div>
              </li>
            </Link>
          ))
        ) : (
          <div className="flex flex-col justify-center absolute left-1/2 transform -translate-x-1/2 items-center">
            <p className="text-2xl font-bold">No results found</p>
            <p className="text-gray-400">Try different keywords</p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Home;
