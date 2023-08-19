import { useParams } from "react-router-dom";
import { useMutation } from "../../hooks/useMutation";
import { useEffect, useState } from "react";
import { usePodcast } from "../../context/PodcastContext/PodcastContext";
import EpisodeTableComponent from "./components/EpisodesTableComponent";
import CardComponent from "./components/CardComponent";

const PodcastDetail = () => {
  const { id } = useParams();
  const [fetchDetail] = useMutation(`/lookup`);
  const { podcastDetail, setPodcastDetail, podcasts } = usePodcast();
  const [totalEpisodes, setTotalEpisodes] = useState(0);
  const [visibleEpisodes, setVisibleEpisodes] = useState([] as any[]);
  const [visibleCount, setVisibleCount] = useState(10); // Initial visible count
  const episodesPerPage = 10;

  const getPodcastDetail = async () => {
    const { data, success } = await fetchDetail({
      method: "get",
      addToURL: `?id=${id}`,
    });
    if (success && data) {
      const currentPodcast = podcasts?.find(
        (podcast: any) => podcast.id === id
      );
      const description = currentPodcast?.description;
      const NewPodcastDetail = {
        ...data.results[0],
        name: data.results[0].trackName,
        author: data.results[0].artistName,
        description,
      };
      setPodcastDetail(NewPodcastDetail);
      // Obtener los episodios del podcast a través de collectionViewUrl
      if (data.results[0].collectionViewUrl) {
        const { data: episodesData, success: episodesSuccess } =
          await fetchDetail({
            method: "get",
            addToURL: `?id=${data.results[0].collectionId}&country=US&media=podcast&entity=podcastEpisode&limit=100`,
          });
        if (episodesSuccess && episodesData) {
          // guardar la informacion que necesitamos de los episodios
          const episodes = episodesData.results.map((episode: any) => {
            return {
              date: episode.releaseDate,
              duration: episode.trackTimeMillis,
              title: episode.trackName,
              audio: episode?.previewUrl,
              id: episode.trackId,
            };
          });
          setTotalEpisodes(episodes.length);
          // filtrar solo los episodios que no tengan audo undefined
          const episodesWithAudio = episodes.filter(
            (episode: any) => episode.audio !== undefined
          );
          setPodcastDetail((prevState: any) => ({
            ...prevState,
            // guardar solo los 10 primeros episodios
            episodes: episodesWithAudio,
          }));
          setVisibleEpisodes(episodesWithAudio.slice(0, visibleCount));
        }
      }
    }
  };

  useEffect(() => {
    if (podcasts.length > 0) {
      getPodcastDetail();
    }
  }, [podcasts]);

  const loadMoreEpisodes = () => {
    setVisibleCount(visibleCount + episodesPerPage);
    setVisibleEpisodes(
      podcastDetail.episodes.slice(0, visibleCount + episodesPerPage)
    );
  };

  return (
    <div className="py-10 flex gap-14 ">
      {podcastDetail && (
        <>
          <div className=" flex flex-col items-center">
            <CardComponent
              artworkUrl600={podcastDetail.artworkUrl600}
              name={podcastDetail.name}
              author={podcastDetail.author}
              description={podcastDetail.description}
            />
          </div>
          <div className="w-full">
            <div className="flex font-bold w-full shadow-md py-2 px-3 text-xl gap-2">
              <h2>Episodes:</h2>
              <p data-testid="podcast-episodes">
                {totalEpisodes && totalEpisodes}
              </p>
            </div>
            <div>
              {visibleEpisodes && (
                <>
                  <EpisodeTableComponent
                    episodes={visibleEpisodes}
                    podcastId={id as string}
                  />
                  <div className="w-full flex justify-center">
                    {visibleCount < totalEpisodes && (
                      <button
                        className=" uppercase text-center text-blue-400 underline font-semibold py-2 px-4 rounded"
                        onClick={loadMoreEpisodes}
                      >
                        {`Load More Episodes (${visibleCount}/${totalEpisodes})`}
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PodcastDetail;
