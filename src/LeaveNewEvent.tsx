import React from "react";
import { Button } from "./components/Buttons";

interface LeaveNewEventProps {
  onClose: () => void;
  newEventLeaveModal: () => void;
}

const LeaveNewEvent: React.FC<LeaveNewEventProps> = ({
  onClose,
  newEventLeaveModal,
}) => {
  return (
    <div className="fixed w-full h-full top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 pl-8">
      <div className="w-[44.375rem] h-[21.25rem] bg-white rounded-[4rem] shadow-lg relative">
        <button
          className="absolute top-10 right-10 text-[22px] leading-none text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &#10006;
        </button>
        <div className="h-full mt-[5.5rem] ml-24 mr-24 font-redcollar flex flex-col items-center">
          <h2 className="text-4xl mb-16 text-center">Передумали создавать событие?</h2>
          <div className="flex flex-row gap-6 justify-center items-center">
            <Button border="black" label={"Нет"} onClick={newEventLeaveModal} width={null} />
            <Button color="black" label={"Да"} onClick={onClose} width={null} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveNewEvent;
