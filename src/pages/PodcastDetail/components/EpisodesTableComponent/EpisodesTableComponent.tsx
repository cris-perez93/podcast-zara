import React from "react";
import { Link } from "react-router-dom";
import { IEpisode } from "../../../../types/CommonTypes";
import {
  formatDateString,
  getCleanedTitle,
  formatDuration,
} from "../../../../utils/formats";

type EpisodeTableProps = {
  episodes: IEpisode[];
  podcastId: string;
  totalEpisodes?: number;
};

const EpisodeTableComponent: React.FC<EpisodeTableProps> = ({
  episodes,
  podcastId,
  totalEpisodes,
}) => {
  return (
    <div className="w-full">
      <div className="flex font-bold w-full shadow-md py-2 px-3 text-xl gap-2">
        <h2>Episodes:</h2>
        <p data-testid="podcast-episodes">{totalEpisodes || 0}</p>
      </div>
      <div className="w-full mt-5 p-5 shadow-md">
        <table
          data-testid="podcast-episodes-table"
          className=" table-fixed w-full"
        >
          <thead>
            <tr className="text-left">
              <th className="p-3  font-bold  border-b">Title</th>
              <th className="p-3 font-bold  border-b">Date</th>
              <th className="p-3 font-bold  border-b">Duration</th>
            </tr>
          </thead>
          <tbody>
            {episodes.map((episode, index) => (
              <tr
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-100"
                } hover:bg-gray-200 transition-all`}
                key={episode.id}
              >
                <td className="p-3 border-b text-blue-400 hover:underline transition-all">
                  <Link to={`/podcast/${podcastId}/episode/${episode.id}`}>
                    {getCleanedTitle(episode.title)}
                  </Link>
                </td>
                <td className="p-3 border-b">
                  {formatDateString(episode.date)}
                </td>
                <td className="p-3 border-b">
                  {formatDuration(episode.duration)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EpisodeTableComponent;
