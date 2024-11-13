'use client';

import Image from 'next/image';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRef, useState } from 'react';

interface ThumbnailsProps {
  thumbnails: string[];
}

export default function Thumbnails({ thumbnails }: ThumbnailsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slider = useRef<Slider>(null);
  const sliderSettings: Settings = {
    dots: false,
    infinite: thumbnails.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (index) => {
      setCurrentIndex(index);
    },
  };
  return (
    <>
      <section className="w-full h-full aspect-square flex flex-col max-w-screen-md relative overflow-hidden">
        <Slider ref={slider} {...sliderSettings}>
          {thumbnails.map((thumbnail) => (
            <div
              key={thumbnail}
              className="w-full h-full aspect-square relative"
            >
              <Image
                src={thumbnail}
                alt="thumbnail"
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-md"
                fill
              />
            </div>
          ))}
        </Slider>
      </section>
      <section className="flex gap-1 md:flex-col">
        {thumbnails.map((thumbnail, index) => (
          <div
            key={thumbnail}
            className={`w-[50px] h-[50px] aspect-square relative ${
              currentIndex === index ? 'border-[2px] border-brown-500' : ''
            } rounded-md`}
            onClick={() => {
              slider.current?.slickGoTo(index);
            }}
          >
            <Image
              src={thumbnail}
              alt="thumbnail"
              fill
              className="rounded-md"
            />
          </div>
        ))}
      </section>
    </>
  );
}
