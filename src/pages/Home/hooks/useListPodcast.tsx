import { useMutation } from "../../../hooks/useMutation";
import { useState } from "react";
import { usePodcast } from "../../../context/PodcastContext/PodcastContext";

const useListPodcast = () => {
  const [fetchListPodcast, isLoading] = useMutation(
    `/us/rss/toppodcasts/limit=100/genre=1310/json`
  );
  const [lastFetchTime, setLastFetchTime] = useState<number | null>(
    localStorage.getItem("lastFetchTime")
      ? parseInt(localStorage.getItem("lastFetchTime") || "")
      : null
  );
  const { setPodcasts } = usePodcast();

  const onGetListPodcast = async () => {
    const { success, data, error } = await fetchListPodcast({
      method: "get",
    });
    if (success && data) {
      const podcastEntries = data.feed.entry.map((entry: any) => {
        const id = entry.id.attributes["im:id"];
        const name = entry["im:name"].label;
        const author = entry["im:artist"].label;
        const image = entry["im:image"][2].label;
        const description = entry.summary.label;
        return {
          id,
          name,
          author,
          image,
          description,
        };
      });
      setPodcasts(podcastEntries);
      setLastFetchTime(Date.now());
      localStorage.setItem("lastFetchTime", Date.now().toString());
      localStorage.setItem("cachedPodcasts", JSON.stringify(podcastEntries));
    } else {
      const cachedPodcasts = JSON.parse(
        localStorage.getItem("cachedPodcasts") || ""
      );
      setPodcasts(cachedPodcasts);
      if (error) {
        console.log(error);
      }
    }
  };

  return {
    onGetListPodcast,
    loading: isLoading.loading,
    lastFetchTime,
  };
};

export default useListPodcast;
