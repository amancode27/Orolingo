import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

const items = [
  {
    src: "https://source.unsplash.com/1920x400/?films",
    altText: 'Orolingo',
    caption: 'Slide 1'
  },
  {
    src: "https://source.unsplash.com/1920x400/?nature",
    altText: 'Orolingo',
    caption: 'Slide 2'
  },
  {
    src: "https://source.unsplash.com/1920x400/?travel",
    altText: 'Orolingo',
    caption: 'Slide 3'
  },
];

const CarouselTop = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} />
        <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
      </CarouselItem>
    );
  });

  return (
    <Carousel
      width = "100%"
      height = "300px"
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} color="#3f50b5"/>
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} color="#3f50b5"/>
    </Carousel>
  );
}
export default CarouselTop