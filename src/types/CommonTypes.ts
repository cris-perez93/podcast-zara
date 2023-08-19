export interface IEpisode {
  date: string;
  duration: number;
  title: string;
  audio: string;
  id: string;
}

export interface IPodcast {
  id: string;
  name: string;
  description: string;
  image: string;
  author: string;
  artworkUrl600: string;
  episodes: IEpisode[];
}
