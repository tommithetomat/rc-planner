import React from "react";
import hand from "./img/hand.png";
import { formatDate, dayOfTheWeek, formatTime } from "./func";
import { Button } from "./components/Buttons";

export interface JoinEventProps {
  event: {
    title: string ;
    dateStart: string;
    location: string;
  };
  onClose: () => void;
}

const backgroundStyle = {
  backgroundImage: `url(${hand})`,
  backgroundSize: "contain",
  backgroundPosition: "calc(100% - 2.16rem) 50%",
  backgroundRepeat: "no-repeat",
};

const JoinEvent: React.FC<JoinEventProps> = ({ event, onClose }) => {
  return (
    <div className="fixed w-full h-full top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 pl-8">
      <div
        className="w-[48.125rem] h-[31.875rem] bg-white rounded-[4rem] shadow-lg relative"
        style={backgroundStyle}
      >
        <button
          className="absolute top-10 right-10 text-[22px] leading-none text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &#10006;
        </button>
        <div className="h-full mt-[5.5rem] ml-[5rem] font-redcollar">
          <h2 className="text-[4rem]">Поздравляем!</h2>
          <h2 className="text-[1.125rem]">Теперь вы участник</h2>
          <h2 className="text-[1.125rem] text-red-600">{event.title}</h2>
          <div className="flex flex-row items-center mt-[4.44rem] gap-4 text-lg">
            <p>{dayOfTheWeek(event.dateStart)}</p>
            <div className="w-4 h-px rotate-90 bg-gray-400" />
            <p>{formatDate(event.dateStart)}</p>
            <div className="w-4 h-px rotate-90 bg-gray-400" />
            <p>{formatTime(event.dateStart)}</p>
          </div>
          <p className="font-ttcommons mt-2 mb-10 text-xl leading-none">
            {event.location}
          </p>
          <Button color="black" label={"Отлично"} width={null} onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default JoinEvent;