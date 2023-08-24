// cinstruir el hook para usePodcast donde haremos las llamadas a la API de iTunes

import { useMutation } from "../../../hooks/useMutation";
import { IPodcast } from "../../../types/CommonTypes";
import { usePodcast } from "../../../context/PodcastContext/PodcastContext";
import { useState } from "react";

interface usePodcastDetailProps {
  id: string;
}

/**
 * @description This hook is used to get the podcast detail
 * @param id Podcast id
 **/

const usePodcastDetail = ({ id }: usePodcastDetailProps) => {
  const { podcastDetail, setPodcastDetail, podcasts } = usePodcast();
  const [totalEpisodes, setTotalEpisodes] = useState(0);
  const [visibleEpisodes, setVisibleEpisodes] = useState([] as any[]);
  const [visibleCount, setVisibleCount] = useState(10); // Initial visible count
  const [fetchDetailPodcast, isLoading] = useMutation(`/lookup`);
  const [listPodcastDetail, setListPodcastDetail] = useState<IPodcast[]>(
    JSON.parse(localStorage.getItem("cachedListPodcastDetail") || "[]")
  );

  // get the podcast detail
  const getPodcastDetail = async () => {
    const { success, data } = await fetchDetailPodcast({
      method: "get",
      addToURL: `?id=${id}&country=US&media=podcast&entity=podcastEpisode&limit=100`,
    });
    if (success && data) {
      const podcastData = data.results[0];
      const episodesData = data.results.slice(1);
      const podcast: IPodcast = {
        id: podcastData.collectionId,
        name: podcastData.collectionName,
        author: podcastData.artistName,
        image: podcastData.artworkUrl600,
        description:
          podcasts.find((podcast) => podcast.id === id)?.description || "",
        episodes: episodesData.map((episode: any) => {
          return {
            date: episode.releaseDate,
            duration: episode.trackTimeMillis,
            title: episode.trackName,
            audio: episode?.previewUrl,
            id: episode.trackId,
            description: episode.description,
          };
        }),
      };
      setListPodcastDetail([...listPodcastDetail, podcast]);
      const dataPodcast = {
        ...podcast,
        lastFetchTime: Date.now(),
      };
      localStorage.setItem(
        "cachedListPodcastDetail",
        JSON.stringify([...listPodcastDetail, dataPodcast])
      );
      setPodcastDetail(podcast);
      setTotalEpisodes(podcast.episodes.length);
      setVisibleEpisodes(podcast.episodes.slice(0, visibleCount));
    }
  };

  const onLoadMoreEpisodes = () => {
    setVisibleCount(visibleCount + 10);
    setVisibleEpisodes(podcastDetail.episodes.slice(0, visibleCount + 10));
  };

  return {
    getPodcastDetail,
    podcastDetail,
    totalEpisodes,
    visibleEpisodes,
    visibleCount,
    setVisibleCount,
    onLoadMoreEpisodes,
    setTotalEpisodes,
    setVisibleEpisodes,
    loading: isLoading.loading,
    listPodcastDetail,
  };
};

export default usePodcastDetail;
