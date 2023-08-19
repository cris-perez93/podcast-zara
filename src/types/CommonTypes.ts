export interface IEpisode {
  date: string;
  duration: number;
  title: string;
  audio: string;
}

export interface IPodcast {
  id: string;
  name: string;
  description: string;
  image: string;
  author: string;
  artworkUrl100: string;
  episodes: IEpisode[];
}
