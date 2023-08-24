import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EpisodeTableComponent from "./components/EpisodesTableComponent";
import CardComponent from "./components/CardComponent";
import { IEpisode, IPodcast } from "../../types/CommonTypes";
import Loading from "../../components/Loading";
import usePodcastDetail from "./hooks/usePodcastDetail";
import DetailEpisodeComponent from "./components/DetailEpisodeComponent";
import { usePodcast } from "../../context/PodcastContext/PodcastContext";

interface PodcastDetailProps {
  episodeDetail?: boolean;
}

/**
 * @description This component is used to show the podcast detail and the episodes of the podcast
 * @param episodeDetail If true, show the episode detail
 */
const PodcastDetail = ({ episodeDetail }: PodcastDetailProps) => {
  const { id, episodeId } = useParams();
  const [currentEpisode, setCurrentEpisode] = useState({} as IEpisode);

  const { setPodcastDetail } = usePodcast();

  const {
    podcastDetail, // podcast detail
    totalEpisodes, // total episodes of the podcast
    visibleEpisodes, // visible episodes of the podcast
    visibleCount, // visible count of the episodes
    loading, // loading state
    listPodcastDetail, // list of podcast detail
    onLoadMoreEpisodes, // load more episodes
    getPodcastDetail, // get the podcast detail
    setTotalEpisodes, // set the total episodes
    setVisibleEpisodes, // set the visible episodes
  } = usePodcastDetail({ id: id as string });

  /**
   * @description This effect is used to get the podcast detail from the local storage or from the api.
   */
  useEffect(() => {
    const currentTime = Date.now();
    const podcastFromLocalStorage = listPodcastDetail.find(
      (podcast: IPodcast) => podcast.id === parseFloat(id as string)
    );
    if (
      !podcastFromLocalStorage ||
      !podcastFromLocalStorage.lastFetchTime ||
      currentTime - podcastFromLocalStorage.lastFetchTime > 24 * 60 * 60 * 1000
    ) {
      getPodcastDetail();
    } else {
      setPodcastDetail(podcastFromLocalStorage);
      setTotalEpisodes(podcastFromLocalStorage.episodes.length);
      setVisibleEpisodes(
        podcastFromLocalStorage.episodes.slice(0, visibleCount)
      );
    }
  }, []);

  /**
   * @description This effect is used to get the current episode detail
   */
  useEffect(() => {
    if (episodeDetail && podcastDetail.episodes && episodeId) {
      const idEpisode = parseFloat(episodeId);
      const currentEpisode = podcastDetail.episodes.find(
        (episode: IEpisode) => episode.id === idEpisode
      );
      setCurrentEpisode(currentEpisode as IEpisode);
    }
  }, [podcastDetail, episodeId]);

  return (
    <div className="py-5 flex gap-14 items-start justify-center ">
      {loading && <Loading />}
      {podcastDetail && !loading && (
        <>
          <div className=" flex flex-col items-center">
            <CardComponent
              artworkUrl600={podcastDetail.image}
              name={podcastDetail.name}
              author={podcastDetail.author}
              description={podcastDetail.description}
            />
          </div>
          {episodeDetail && currentEpisode && (
            <DetailEpisodeComponent
              title={currentEpisode.title}
              description={currentEpisode.description}
              audio={currentEpisode.audio}
            />
          )}
          {!episodeDetail && visibleEpisodes && (
            <div className="flex flex-col">
              <EpisodeTableComponent
                episodes={visibleEpisodes}
                podcastId={id as string}
                totalEpisodes={totalEpisodes}
              />
              <div className="w-full flex justify-center">
                {visibleCount < totalEpisodes && (
                  <button
                    className=" uppercase text-center text-blue-400 underline font-semibold py-2 px-4 rounded"
                    onClick={onLoadMoreEpisodes}
                  >
                    {`Load More Episodes (${visibleCount}/${totalEpisodes})`}
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PodcastDetail;
