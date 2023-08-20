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
  return (
    <div className=" p-5 shadow-md card-hovering w-[300px]  gap-7  flex flex-col items-center hover:shadow-xl translate-x-0">
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
      <div className="max-w-full break-words" data-testid="description">
        {description && <p className="font-semibold">Description:</p>}
        <p className="italic" data-testid="podcast-description">
          {description}
        </p>
      </div>
    </div>
  );
};

export default CardComponent;
