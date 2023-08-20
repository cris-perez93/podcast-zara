import { IEpisode } from "../../types/CommonTypes";
import { useParams } from "react-router-dom";

interface EpisodeDetailProps {}

const EpisodeDetail: React.FC<EpisodeDetailProps> = () => {
  const { episodeId } = useParams();
  console.log(episodeId, "episodeId");

  return (
    <div>
      <h1>{"episode"}</h1>
    </div>
  );
};
export default EpisodeDetail;
