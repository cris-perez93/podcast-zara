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
};

const EpisodeTableComponent: React.FC<EpisodeTableProps> = ({
  episodes,
  podcastId,
}) => {
  return (
    <div className="w-full mt-5 p-5 shadow-md">
      <table className=" table-fixed w-full">
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
              className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
              key={episode.id}
            >
              <td className="p-3 border-b">
                <Link to={`/podcast/${podcastId}/episode/${episode.id}`}>
                  {getCleanedTitle(episode.title)}
                </Link>
              </td>
              <td className="p-3 border-b">{formatDateString(episode.date)}</td>
              <td className="p-3 border-b">
                {formatDuration(episode.duration)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EpisodeTableComponent;
