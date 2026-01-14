import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface BaseSliderProps {
  onSelectRange: (range: [number, number]) => void;
  min?: number;
  max?: number;
}

export default function BaseSlider({
  onSelectRange,
  min = 0,
  max = 1000,
}: BaseSliderProps) {
  const [value, setValue] = useState<[number, number]>([min, max]);

  const handleChange = (v: number[]) => {
    const [from, to] = v;

    // chặn vượt
    if (from > to) return;

    const range: [number, number] = [from, to];
    setValue(range);
    onSelectRange(range);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between text-(--color-text) mb-3">
        <span>£{value[0]}</span>
        <span>£{value[1]}</span>
      </div>

      <Slider
        value={value}
        onValueChange={handleChange}
        min={min}
        max={max}
        step={10}
        minStepsBetweenThumbs={1}
      />
    </div>
  );
}
