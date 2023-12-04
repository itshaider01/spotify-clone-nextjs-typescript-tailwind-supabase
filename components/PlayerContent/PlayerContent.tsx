import { Song } from "@/types";
import React, { useState, useEffect } from "react";
import MediaItem from "../MediaItem";
import LikeButton from "@/app/search/components/LikeButton";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import useSound from "use-sound";
import Slider from "../Slider";
import usePlayer from "@/hooks/usePlayer";
import ProgressBar from "../ProgressBar";

type PlayerContentProps = {
  songs: Song;
  songUrl: string;
};

const PlayerContent = ({ songUrl, songs }: PlayerContentProps) => {
  const player = usePlayer();

  const [volume, setVolume] = useState(1);

  const [isPlaying, setIsPlaying] = useState(false);

  const [progress, setProgress] = useState<number>(0);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;

  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);

    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      player.setId(player.ids[0]);
    } else {
      player.setId(nextSong);
    }
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);

    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      player.setId(player.ids[player.ids.length - 1]);
    } else {
      player.setId(previousSong);
    }
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => {
      setIsPlaying(true);
    },
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    setVolume((prevVolume) => (prevVolume === 0 ? 1 : 0));
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center h-full">
        <div className="flex w-full justify-start">
          <div className="flex items-center gap-x-4">
            <MediaItem data={songs} />
            <LikeButton songId={songs.id} />
          </div>
        </div>
        <div className="flex md:hidden justify-end col-auto w-full items-center">
          <AiFillStepBackward
            onClick={onPlayPrevious}
            size={30}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
          />
          <div
            className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
            onClick={handlePlay}
          >
            <Icon size={30} className="text-black" />
          </div>
          <AiFillStepForward
            className="text-neutral-400 cursor-pointer hover:text-white transition"
            size={30}
            onClick={onPlayNext}
          />
        </div>

        <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
          <AiFillStepBackward
            onClick={onPlayPrevious}
            size={30}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
          />
          <div
            onClick={handlePlay}
            className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer"
          >
            <Icon size={30} className="text-black" />
          </div>

          <AiFillStepForward
            className="text-neutral-400 cursor-pointer hover:text-white transition"
            size={30}
            onClick={onPlayNext}
          />
        </div>
        <div className="hidden md:flex pr-2 w-full justify-end">
          <div className="flex items-center gap-x-2 w-[120px]">
            <VolumeIcon
              onClick={toggleMute}
              size={34}
              className="cursor-pointer"
            />
            <Slider value={volume} onChange={(value) => setVolume(value)} />
          </div>
        </div>
      </div>
      <ProgressBar howl={sound} onChange={(value) => setProgress(value)} />
    </div>
  );
};

export default PlayerContent;
