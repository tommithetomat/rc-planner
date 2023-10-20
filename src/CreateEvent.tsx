import React, { useState, useEffect, ChangeEvent } from "react";
import { Button, ButtonProps } from "./components/Buttons"; 
import { getCurrentUser, createEventWithParticipants } from "./requests";
import { Input, InputProps } from "./components/InputComp"; 
import ParticipantSelect from "./ParticipantSelect";
import { Participant } from "./components/Participant";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
import { format, parse, addMinutes } from "date-fns";
import PhotoUploader from "./PhotoUploader";
import { calendarSvg } from "./all-func";
import { useCalendarState } from "./calendarState";
import LeaveNeWEvent from "./LeaveNewEvent";

interface CreateEventProps {
  onClose: () => void;
}

export const CreateEvent: React.FC<CreateEventProps> = ({ onClose }) => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    selectedUsers: [] as any[], 
    photos: [] as any[], 
    startDate: null as Date | null,
    location: "",
    time: "",
  });
  const {
    setIsCancelEventModalOpen,
    isCancelEventModalOpen,
    setNewEventData,
  } = useCalendarState();
  const [user, setUser] = useState<any[]>([]);

  const authToken = localStorage.getItem("authToken");

  const closeNewEventLeaveModal = () => {
    setIsCancelEventModalOpen(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser(authToken);
        setUser(response);
      } catch (error) {
        console.error("Ошибка:", error);
      }
    };

    fetchUser();
  }, [authToken]);

  const handleParticipantsChange = (participants: any[]) => {
    setEventData({ ...eventData, selectedUsers: participants });
  };

  const handleInputChange = (field: string, value: string) => {
    setEventData({ ...eventData, [field]: value });
  };

  const handleDateSelect = (date: Date) => {
    setEventData({ ...eventData, startDate: date });
  };

  const handleTimeInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const timePattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    if (value === "" || timePattern.test(value)) {
      setEventData({ ...eventData, [name]: value });
    }
  };

  const combineDateAndTime = (date: Date, time: string) => {
    const corDate = format(date, "dd.MM.yyyy");
    const parsedDate = parse(corDate, "dd.MM.yyyy", new Date());
    const [hours, minutes] = time.split(":").map(Number);

    if (
      Number.isInteger(hours) &&
      hours >= 0 &&
      hours < 24 &&
      Number.isInteger(minutes) &&
      minutes >= 0 &&
      minutes < 60
    ) {
      const combinedDateTime = addMinutes(parsedDate, hours * 60 + minutes);
      const formattedDateTime = format(
        combinedDateTime,
        "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"
      );
      return formattedDateTime;
    } else {
      return "";
    }
  };

  const openCancelEventModal = () => {
    setIsCancelEventModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const participantIds = [
        ...eventData.selectedUsers.map((participant) => participant.id),
        user.id,
      ];

      const eventDat = {
        title: eventData.title,
        description: eventData.description,
        dateStart: combineDateAndTime(eventData.startDate!, eventData.time),
        location: eventData.location,
        participants: participantIds,
        photos: eventData.photos,
      };

      const response = await createEventWithParticipants(eventDat, authToken);

      setNewEventData(response);
      onClose();
    } catch (error) {
      console.error("Ошибка при создании события:", error);
    }
  };

  const handlePhotoUpload = (uploadedPhotos: any[]) => {
    setEventData({ ...eventData, photos: uploadedPhotos });
  };

  const isValidate =
    eventData.title !== "" &&
    eventData.description !== "" &&
    eventData.startDate !== null &&
    eventData.location !== "" &&
    eventData.time !== "";

  return (
    <div className="fixed w-full h-full top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 leading-none">
      <div className="w-[67.25rem] h-[56.6875rem] bg-white rounded-[4rem] shadow-lg relative flex items-center flex-col pt-20 px-16 pb-16">
        <button
          className="absolute top-10 right-10 text-[22px] leading-none text-gray-500 hover:text-gray-700"
          onClick={openCancelEventModal}
        >
          &#10006;
        </button>
        <h2 className="font-redcollar text-4xl">Создание события</h2>
        <div className="flex flex-row space-x-4 mt-16">
          <div className="flex flex-col gap-8">
            <Input
              value={eventData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              size="big"
              label="Название*"
            />
            <Input
              value={eventData.description}
              onChange={(e) =>
                handleInputChange("description", e.target.value)
              }
              typeOf="description"
              label="Описание*"
            />
            <ParticipantSelect
              onParticipantsChange={handleParticipantsChange}
            />
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-row gap-2">
              <DatePicker
                showIcon
                selected={eventData.startDate}
                onChange={handleDateSelect}
                placeholderText="Начало*"
                dateFormat="dd.MM.yyyy"
                className="border border-gray-400 rounded-xl font-ttcommons h-[3.6rem] text-sm font-normal focus:outline-none"
                locale={ru}
                selectsStart
                startDate={eventData.startDate}
                endDate={eventData.endDate}
                icon={calendarSvg}
              />
              <DatePicker
                showIcon
                selected={eventData.endDate}
                onChange={handleDateSelect}
                placeholderText="Конец"
                dateFormat="dd.MM.yyyy"
                className="border border-gray-400 rounded-xl font-ttcommons h-[3.6rem] text-sm font-normal focus:outline-none"
                locale={ru}
                selectsEnd
                startDate={eventData.startDate}
                endDate={eventData.endDate}
                icon={calendarSvg}
              />
            </div>
            <div className="border border-gray-400 rounded-xl font-ttcommons w-[22.125rem] h-[3.75rem] text-sm font-normal p-4 relative">
              <div>
                <div className="text-gray-400 text-sm font-normal font-ttcommons leading-none absolute top-3 r-4">
                  Время*
                </div>
              </div>
              <input
                type="time"
                name="time"
                value={eventData.time}
                placeholder=""
                onChange={handleTimeInputChange}
                className="w-full h-full focus:outline-none mt-3"
              />
            </div>
            <Input
              value={eventData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              size="medium"
              label="Место*"
            />
            <div className="h-10">
              <Participant participant={user} author={true} />
            </div>
          </div>
        </div>
        <div className="flex items-start w-full mt-8 mb-16">
          <PhotoUploader onUploadPhoto={handlePhotoUpload} />
        </div>
        <Button
          color={!isValidate ? "gray" : "black"}
          label="Создать"
          onClick={handleSubmit}
          disabled={!isValidate}
        />
        {isCancelEventModalOpen && (
          <LeaveNeWEvent
            onClose={onClose}
            newEventLeaveModal={closeNewEventLeaveModal}
          />
        )}
      </div>
    </div>
  );
};
