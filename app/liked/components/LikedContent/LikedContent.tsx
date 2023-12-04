"use client";
import LikeButton from "@/app/search/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type LikedContentProps = {
  songs: Song[];
};

const LikedContent = ({ songs }: LikedContentProps) => {
  const router = useRouter();

  const { isLoaded, user } = useUser();

  const onPlay = useOnPlay(songs);

  useEffect(() => {
    if (!isLoaded && !user) {
      router.replace("/");
    }
  }, [isLoaded, user, router]);

  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No Liked Songs
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-y-2 w-full p-6 text-neutral-400">
        {songs.map((song) => (
          <div key={song.id} className="flex items-center w-full gap-x-4">
            <div className="flex-1">
              <MediaItem
                onClick={(id: string) => {
                  onPlay(id);
                }}
                data={song}
              />
            </div>
            <LikeButton songId={song.id} />
          </div>
        ))}
      </div>
    );
  }
};

export default LikedContent;
