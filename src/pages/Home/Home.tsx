import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { usePodcast } from "../../context/PodcastContext/PodcastContext";
import useListPodcast from "./hooks/useListPodcast";
import Loading from "../../components/Loading";

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
    <div className="flex flex-col  py-5  px-5  w-full mx-auto ">
      {loading && <Loading />}
      {filteredPodcasts.length > 0 && (
        <div className=" flex justify-end py-5 w-full m-auto">
          <input
            type="text"
            data-testid="search-input"
            className="border px-2 border-gray-300 outline-none rounded-sm p-1"
            placeholder="Filter podcasts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <ul
        ref={divRef}
        className="xl:grid xl:grid-cols-4 flex justify-center flex-wrap min-w-full m-auto gap-5 mt-10"
      >
        {filteredPodcasts &&
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
          ))}
      </ul>
    </div>
  );
};

export default Home;
