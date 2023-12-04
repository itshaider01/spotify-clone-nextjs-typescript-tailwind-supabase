import React, { useEffect, useRef } from "react";
import * as RadixSlider from "@radix-ui/react-slider";
import Howler from "howler";

type ProgressBarProps = {
  howl: Howler.Howl | null;
  onChange?: (value: number) => void;
};

const ProgressBar = ({ howl, onChange }: ProgressBarProps) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let progressUpdateInterval: NodeJS.Timeout;

    const updateProgress = () => {
      if (howl) {
        const currentProgress = (howl.seek() / howl.duration()) * 100;
        sliderRef.current?.setAttribute(
          "aria-valuenow",
          currentProgress.toString()
        );
        onChange?.(currentProgress);
      }
    };

    if (howl) {
      howl.on("seek", updateProgress);

      progressUpdateInterval = setInterval(updateProgress, 100);
    }

    return () => {
      clearInterval(progressUpdateInterval);
      if (howl) {
        howl.off("seek", updateProgress);
      }
    };
  }, [howl, onChange]);

  const handleChange = (newValue: number[]) => {
    const seekTime = (newValue[0] / 100) * howl?.duration()!;
    howl?.seek(seekTime);
  };

  return (
    <RadixSlider.Root
      ref={sliderRef}
      className="relative flex items-center select-none touch-none w-full h-10 cursor-pointer"
      defaultValue={[0]}
      value={howl ? [(howl.seek() / howl.duration()) * 100] : [0]}
      onValueChange={handleChange}
      max={100}
      step={0.1}
      aria-label="Song Progress"
    >
      <RadixSlider.Track className="bg-neutral-600 relative cursor-pointer grow rounded-full h-2">
        <RadixSlider.Range className="absolute cursor-pointer bg-gradient-to-r from-green-200 via-green-300 to-blue-500 rounded-full h-full" />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
};

export default ProgressBar;
