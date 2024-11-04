"use client";
import { getNewReleases } from "@/api/utils";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";

interface NewRelease {
  id: string;
  name: string;
  images: ImageData[];
  release_date: string;
  total_tracks: number;
  external_urls: {
    spotify: string;
  };
}

const Library = () => {
  const [dataNewRelease, setDataNewRelease] = useState<NewRelease[]>([]);

  const onClick = () => {}; // Consider implementing functionality

  const handleGetNewReleases = async () => {
    try {
      const response = await getNewReleases();
      setDataNewRelease(response.albums.items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetNewReleases();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="text-neutral-400 font-medium text-md">Your Library</p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      <div className="flex flex-col gap-y-3 mt-4 px-3">
        {dataNewRelease.map((item) => (
          <div
            key={item.id}
            className="flex items-center p-3 bg-neutral-800 rounded-xl hover:bg-gradient-to-r from-neutral-500 to-green-300 shadow-md transition-all hover:scale-110 cursor-pointer group"
          >
            <div className="flex-grow">
              <p className="text-white font-semibold truncate group-hover:text-black transition">
                {item.name}
              </p>
              <p className="text-sm text-neutral-400 group-hover:text-black transition">
                {item.release_date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;
