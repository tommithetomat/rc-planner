import React from "react";
import { Button } from "./components/Buttons";
import { leaveEvent } from "./requests";

export interface LeaveEventProps {
  event: {
    id: number;
    title: string;
  };
  userToken: string | null;
  onClose: () => void;
  leaveModal: () => void;
}

const LeaveEvent: React.FC<LeaveEventProps> = ({
  event,
  userToken,
  onClose,
  leaveModal,
}) => {
  if(event) {
    
  }
  const leaveJoinEvent = async () => {
    try {
      await leaveEvent(event.id, userToken);
      onClose();
    } catch (error) {
      console.error(`Ошибка при отмене участия: ${event.title}`, error);
    }
  };

  return (
    <div className="fixed w-full h-full top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 pl-8">
      <div className="w-[44.375rem] h-[21.25rem] bg-white rounded-[4rem] shadow-lg relative">
        <button
          className="absolute top-10 right-10 text-[22px] leading-none text-gray-500 hover:text-gray-700"
          onClick={leaveModal}
        >
          &#10006;
        </button>
        <div className="h-full mt-[5.5rem] ml-24 mr-24 font-redcollar flex flex-col items-center">
          <h2 className="text-4xl mb-16 text-center">
            Вы действительно хотите отменить участие?
          </h2>
          <div className="flex flex-row gap-6 justify-center items-center">
            <Button border="black" width={null} label={"Нет"} onClick={leaveModal} />
            <Button color="black" width={null} label={"Да"} onClick={leaveJoinEvent} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveEvent;
