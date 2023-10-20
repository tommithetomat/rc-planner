import React from "react";
import head from "../img/Ellipse 1.png";

interface ParticipantProps {
  participant: {
    id: number;
    username: string;
    photo?: string; 
  };
  author?: boolean; 
  onlyImg?: boolean; 
}

export const Participant: React.FC<ParticipantProps> = ({
  participant,
  author,
  onlyImg,
}) => {
  return (
    <div className="flex flex-row items-center h-full max-w-[8rem]">
      {participant.photo ? (
        <img
          src={participant.photo}
          alt={participant.username}
          className="w-full h-full rounded-full mr-2"
        />
      ) : (
        <img
          src={head}
          alt={participant.username}
          className="w-auto h-full rounded-full mr-2"
        />
      )}
      {!onlyImg && (
        <div className="flex flex-col w-[4.75rem] h-full items-start justify-center">
          <p className="w-full text-start truncate p-px">
            {participant.username}
          </p>
          {typeof author === "boolean" && (
            author ? (
              <div className="h-4 px-1 py-[0.4rem] bg-purple-200 rounded-lg items-center inline-flex">
                Организатор
              </div>
            ) : (
              <div className="h-4 p-px py-[0.4rem] rounded-lg items-center inline-flex text-gray-400">
                Участник
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};
