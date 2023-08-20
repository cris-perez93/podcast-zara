import { getCleanedTitle } from "../../../../utils/formats";
import DOMPurify from "dompurify";

interface DetailEpisodeComponentProps {
  title: string;
  description: string;
  audio: string;
}

const DetailEpisodeComponent: React.FC<DetailEpisodeComponentProps> = ({
  title,
  description,
  audio,
}) => {
  return (
    <div className="flex flex-col w-full shadow-md  px-5 pt-5 justify-evenly">
      <div>
        <h1 data-testid="episode-title" className="text-2xl font-bold mb-5">
          {title && getCleanedTitle(title)}
        </h1>
        <p
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
          data-testid="episode-description"
          className="mb-5 italic"
        />
      </div>
      <audio
        data-testid="audio-player"
        className="mb-5 w-full"
        src={audio}
        controls
      ></audio>
    </div>
  );
};

export default DetailEpisodeComponent;
