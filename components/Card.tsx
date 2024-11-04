import Link from "next/link";
import React from "react";
import { FaPlay } from "react-icons/fa";

interface CardProps {
  data: {
    external_urls: {spotify : string};
    images?: { url: string }[]; // Define images as an array of objects with a `url` property
  };
  index: string;
  musicType: string;
}

const Card: React.FC<CardProps> = ({ data, index, musicType }) => {
    console.log(data,'ok')
  return (
    <Link href={data.external_urls.spotify } className="relative hover:opacity-40 group"> {/* Ensures accessibility and styling */}
      {data.images && data.images.length > 0 ? (
        <img
          src={data.images[2].url} // Access the `url` property of the first image object
          alt={`Image for ${musicType} ${index}`}
          className="w-full h-full object-cover" // Add styling as needed
        />
      ) : (
        <div className="bg-neutral-800 h-full w-full flex justify-center items-center text-white">
          No Image Found
        </div>
      )}
     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 ">
        <div className="bg-green-500 rounded-full p-5">
          <FaPlay className="text-black text-md" />
        </div>
      </div>
    </Link>
  );
};

export default Card;
