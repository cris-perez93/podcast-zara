import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EpisodeTableComponent from "./components/EpisodesTableComponent";
import CardComponent from "./components/CardComponent";
import { IEpisode } from "../../types/CommonTypes";
import { getCleanedTitle } from "../../utils/formats";
import Loading from "../../components/Loading";
import usePodcastDetail from "./hooks/usePodcastDetail";

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

  const {
    getPodcastDetail, // get the podcast detail
    podcastDetail, // podcast detail
    totalEpisodes, // total episodes of the podcast
    visibleEpisodes, // visible episodes of the podcast
    visibleCount, // visible count of the episodes
    onLoadMoreEpisodes, // load more episodes
    loading, // loading state
  } = usePodcastDetail({ id: id as string });

  /**
   * @description This effect is used to get the podcast detail
   */
  useEffect(() => {
    getPodcastDetail();
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
            <div className="flex flex-col w-full shadow-md  px-5 pt-5 justify-evenly">
              <div>
                <h1
                  data-testid="episode-title"
                  className="text-2xl font-bold mb-5"
                >
                  {currentEpisode?.title &&
                    getCleanedTitle(currentEpisode.title)}
                </h1>
                <p data-testid="episode-description" className="mb-5 italic">
                  {currentEpisode.description}
                </p>
              </div>
              <audio
                data-testid="audio-player"
                className="mb-5 w-full"
                src={currentEpisode.audio}
                controls
              ></audio>
            </div>
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
