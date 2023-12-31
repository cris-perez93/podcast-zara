export interface IEpisode {
  date: string;
  duration: number;
  title: string;
  audio: string;
  id: string | number;
  description: string;
}

export interface IPodcast {
  id: string | number;
  name: string;
  description: string;
  image: string;
  author: string;
  episodes: IEpisode[];
  lastFetchTime?: number;
}
