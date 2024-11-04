"use client";
import { getAudiobook, getNewReleases, getSeveralAlbums } from "@/api/utils";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import MiddleData from "@/components/MiddleData";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";

// Define the types for your data
interface Artist {
  name: string;
}

interface ImageData {
  url: string;
}

interface NewRelease {
  id: string;
  name: string;
  artists: Artist[];
  images: ImageData[];
  release_date: string;
  total_tracks: number;
  external_urls: {
    spotify: string;
  };
}

export default function Home() {
  const router = useRouter();
  const [dataNewRelease, setDataNewRelease] = useState<NewRelease[]>([]);
  const [dataSeveralAlbums, setDataSeveralAlbums] = useState<NewRelease[]>([]);
  const [dataAudiobook, setDataAudiobook] = useState<NewRelease[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleGetNewReleases = async () => {
    setLoading(true);
    try {
      const response = await getNewReleases();
      console.log(response);
      setDataNewRelease(response.albums.items);
      console.log(response.albums.items[0].images)
    } catch (error) {
      console.error(error);
      setError("Failed to fetch new releases. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  const handleGetSeveralAlbums = async () => {
    setLoading(true);
    try {
      const response = await getSeveralAlbums();
      setDataSeveralAlbums(response.albums)
      console.log(response, 'Several Albums')
    } catch (error) {
      console.error(error);
      setError("Failed to fetch new releases. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  const handleGetAudiobook = async () => {
    setLoading(true);
    try {
      const response = await getAudiobook();
      setDataAudiobook(response.album)
      console.log(response.album, 'Audiobook')
    } catch (error) {
      console.error(error);
      setError("Failed to fetch Audiobook. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (href : string) => {
    router.push(href)
  }

  useEffect(() => {
    handleGetNewReleases();
    handleGetSeveralAlbums();
    handleGetAudiobook();
  }, []);

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">Welcome back</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            <ListItem
              image="/images/liked.jpg"
              name="Liked Songs"
              href="Liked"
            />
          </div>
        </div>
      </Header>
      <MiddleData data={dataNewRelease} heading="New Releases" musicType="New Releases"/>
      <MiddleData data={dataNewRelease} heading="Audio Book" musicType="New Releases"/>
      <MiddleData data={dataNewRelease} heading="Several Albums" musicType="New Releases"/>
      {/* <MiddleData data={dataSeveralAlbums} heading="Several Albums" musicType="Several Albums"/> */}
      {/* <MiddleData data={dataAudiobook} heading="Audio book" musicType="Audio book"/> */}
    </div>
  );
}
