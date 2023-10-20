import React from "react";
import { CustomSlider } from "./components/Carousel";
import { EventInfoModalProps } from "./Event";

interface EventPhotosProps {
  photos: EventInfoModalProps["event"]["photos"];
}

const EventPhotos: React.FC<EventPhotosProps> = ({ photos }) => {
  return (
    <div className="mt-4 w-full overflow-hidden">
      {photos && photos.length > 0 && <CustomSlider images={photos}></CustomSlider>}
    </div>
  );
};

export default EventPhotos;