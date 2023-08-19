import React, { useRef, useState, useEffect } from "react";

interface CardComponentProps {
  artworkUrl600: string;
  name: string;
  author: string;
  description: string;
}

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
        alt={`${name} Artwork`}
        data-testid="podcast-image"
      />
      <div className="w-full pl-2 py-4 border-t border-b">
        <p className="font-bold" data-testid="podcast-name">
          {name}
        </p>
        <p className="italic" data-testid="podcast-author">
          by {author}
        </p>
      </div>
      <div data-testid="description">
        <p className="font-semibold">Description:</p>
        <p className="italic" data-testid="podcast-description">
          {description}
        </p>
      </div>
      {/* Agrega otros elementos con los atributos del podcast */}
    </div>
  );
};

export default CardComponent;
