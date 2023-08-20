import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { IPodcast } from "../../types/CommonTypes";

interface PodcastContextType {
  podcastDetail: IPodcast;
  setPodcastDetail: React.Dispatch<React.SetStateAction<IPodcast>>;
  podcasts: IPodcast[];
  setPodcasts: React.Dispatch<React.SetStateAction<IPodcast[]>>;
}

const PodcastContext = createContext<PodcastContextType | undefined>(undefined);

export const PodcastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [podcastDetail, setPodcastDetail] = useState<IPodcast>({} as IPodcast);
  const [podcasts, setPodcasts] = useState<IPodcast[]>([]);

  const onGetPodcastsFromLocalStorage = () => {
    const podcastsFromLocalStorage = localStorage.getItem("cachedPodcasts");
    if (podcastsFromLocalStorage) {
      setPodcasts(JSON.parse(podcastsFromLocalStorage));
    }
  };
  useEffect(() => {
    onGetPodcastsFromLocalStorage();
  }, []);

  return (
    <PodcastContext.Provider
      value={{ podcastDetail, setPodcastDetail, podcasts, setPodcasts }}
    >
      {children}
    </PodcastContext.Provider>
  );
};

export const usePodcast = () => {
  const context = useContext(PodcastContext);
  if (!context) {
    throw new Error("usePodcast must be used within a PodcastProvider");
  }
  return context;
};
