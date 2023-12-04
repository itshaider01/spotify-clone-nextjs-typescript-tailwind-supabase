"use client";
import SongItem from "@/app/(site)/components/SongItem";
import MediaItem from "@/components/MediaItem";
import { Song } from "@/types";
import React from "react";
import LikeButton from "../LikeButton";
import useOnPlay from "@/hooks/useOnPlay";

type SearchContentProps = {
  songs: Song[];
};

const SearchContent = ({ songs }: SearchContentProps) => {
  const onPlay = useOnPlay(songs);
  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 px-6 w-full text-neutral-400">
        No Songs Found
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6">
        {songs.map((song) => (
          <div key={song.id} className="flex items-center gap-x-4 w-full">
            <div className="flex-1">
              <MediaItem
                data={song}
                onClick={(id: string) => {
                  onPlay(id);
                }}
              />
            </div>
            <LikeButton songId={song.id} />
          </div>
        ))}
      </div>
    );
  }
};

export default SearchContent;
