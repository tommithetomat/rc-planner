import React from "react";
import { parseISO } from "date-fns";
import { formatDate, dayOfTheWeek, formatTime } from "./func";
import info from "./img/Info.png";
import  {EventInfoModalProps}  from "./Event";

interface EventDetailsProps {
  event: EventInfoModalProps["event"];
}

const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  if (!event) return null;
  const isEventActive = parseISO(event.dateStart) >= new Date();

  return (
    <div className="flex justify-center flex-col  mt-20">
      <h2 className="text-4xl font-semibold mb-2 font-redcollar text-center">
        {event.title}
      </h2>
      {!isEventActive && (
        <div className="flex items-center flex-col justify-center mt-4">
          <div className="h-10 px-3 py-2 bg-neutral-50 rounded-xl items-center gap-2 inline-flex">
            <img src={info} alt="info" />
            <p className="text-[0.875rem]">
              Мероприятие уже прошло
            </p>
          </div>
        </div>
      )}
      <div className="flex mx-16 gap-8 font-normal mt-10">
        <div
          className={`flex min-w-[13.25rem] flex-col border-none rounded-3xl bg-neutral-50 pl-4 pr-3 py-3.5 ${
            isEventActive ? "text-stone-950" : "text-gray-500"
          } text-lg`}
        >
          <div className="pb-2 border-b border-zinc-200 font-redcollar">
            <p className="">{dayOfTheWeek(event.dateStart)}</p>
            <p className="">{formatDate(event.dateStart)}</p>
            <p className="">{formatTime(event.dateStart)}</p>
          </div>
          <div className=""></div>
          <p className="text-lg">{event.location}</p>
        </div>
        <p className="text-stone-950 text-xl font-medium max-h-36 overflow-auto">
          {event.description}
        </p>
      </div>
    </div>
  );
};

export default EventDetails;