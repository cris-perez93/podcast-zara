import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

interface CardComponentProps {
  artworkUrl600: string;
  name: string;
  author: string;
  description: string;
}

/**
 * @description This component is used to render the podcast card
 * @param artworkUrl600 Podcast image
 * @param name Podcast name
 * @param author Podcast author
 * @param description Podcast description
 */

const CardComponent: React.FC<CardComponentProps> = ({
  author,
  description,
  name,
  artworkUrl600,
}) => {
  const [showMore, setShowMore] = useState(false);

  // crear usememo que en el caso de que la descripcion sea muy larga, que se corte y se muestre un boton de leer mas
  const descriptionMemo = useMemo(() => {
    if (description && description.length > 350 && !showMore) {
      return description.slice(0, 350) + "...";
    }
    return description;
  }, [description, showMore]);

  return (
    <div className=" p-5 shadow-md  w-[300px] hover:shadow-xl translate-x-0">
      <Link to="/" className="flex flex-col items-center gap-7">
        <img
          src={artworkUrl600}
          width={200}
          onError={(e) => {
            e.currentTarget.src =
              "https://www.freeiconspng.com/uploads/no-image-icon-4.png";
          }}
          alt={`${name} Artwork`}
          data-testid="podcast-image"
        />
        <div className="w-full pl-2 py-4 border-t border-b">
          <p className="font-bold" data-testid="podcast-name">
            {name}
          </p>
          {author && author.length > 0 && (
            <p className="italic" data-testid="podcast-author">
              by {author}
            </p>
          )}
        </div>
      </Link>
      <div className="max-w-full py-2 break-words" data-testid="description">
        {descriptionMemo && <p className="font-semibold">Description:</p>}
        <p className="italic" data-testid="podcast-description">
          {descriptionMemo}
        </p>
        {description && description.length > 350 && (
          <button
            className="text-blue-400 hover:underline font-semibold py-2 rounded"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default CardComponent;
