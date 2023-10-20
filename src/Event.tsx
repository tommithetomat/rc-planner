import React, { useState } from "react";
import { Button, ButtonProps } from "./components/Buttons";
import EventDetails from "./EventDetails";
import { EventParticipants } from "./EventParticipants";
import EventPhotos from "./EventPhotos";
import { joinEvent } from "./requests";
import LeaveEvent from "./LeaveEvent";
import { parseISO } from "date-fns";
import {AuthModal} from "./AuthModal"; 

interface EventInfoModalProps {
  event: {
    id: number;
    dateStart: string;
    title: string;
    description: string;
    location: string;
    dateEnd: string;
    createdAt: string;
    updatedAt: string;
    photos: Array<{
      id: number;
      name: string;
      alternativeText: string | null;
      caption: string | null;
      width: number;
      height: number;
      formats: {
        thumbnail: {
          ext: string;
          url: string;
          hash: string;
          mime: string;
          name: string;
          path: string | null;
          size: number;
          width: number;
          height: number;
        };
      };
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string | null;
      provider: string;
      provider_metadata: string | null;
      createdAt: string;
      updatedAt: string;
    }>;
    participants: Array<{
      id: number;
      username: string;
      createdAt: string;
    }>;
    owner?: {
      id: number;
    };
  } | null;
  onClose: () => void;
  joinEventModalOpen: (isOpen: boolean) => void;
}

export const EventInfoModal: React.FC<EventInfoModalProps> = ({
  event,
  onClose,
  joinEventModalOpen,
}) => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isLeaveModalOpen, setLeaveModalOpen] = useState(false);
  const userId = localStorage.getItem("userId");
  const userToken = localStorage.getItem("authToken");
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const handleJoinEvent = async () => {
    if (event) {
      try {
        const response = await joinEvent(event.id, userToken);

        console.log(
          "Пользователь успешно присоединился к событию:",
          event.title
        );

        onClose();

        joinEventModalOpen(true);
      } catch (error) {
        console.error(
          `Ошибка при присоединении к событию: ${event.title}`,
          error
        );
      }
    }
  };

  const openLeaveModal = () => {
    setLeaveModalOpen(true);
  };

  const closeLeaveModal = () => {
    setLeaveModalOpen(false);
  };

  const checkUser = event?.participants.some(
    (participant) => participant.id === +userId!
  );

  const isEventActive = event
    ? parseISO(event.dateStart) >= new Date()
    : false;

  return (
    <div className="fixed w-full h-full top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 pl-8">
      <div className="w-[67.1875rem] max-h-[58.375rem] bg-white rounded-[4rem] shadow-lg relative pb-20">
        <button
          className="absolute top-10 right-10 text-[22px] leading-none text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &#10006;
        </button>
        {event && <EventDetails event={event} />}
        {isAuthenticated && event && (
          <EventParticipants participants={event.participants} owner={event.owner?.id} />
        )}
        {event && <EventPhotos photos={event.photos} />}
        {isEventActive && (
          <div className="text-center mt-16">
            {!isAuthenticated ? (
              <div className="text-stone-950 text-lg font-normal font-redcollar leading-none">
                <span
                  className="text-red-600 text-lg font-normal font-redcollar leading-none cursor-pointer"
                  onClick={openLoginModal}
                >
                  Войдите
                </span>
                , чтобы присоединиться к событию
              </div>
            ) : checkUser ? (
              <div className="text-stone-950 text-lg font-normal font-redcollar leading-none">
                Вы присоединились к событию. Если передумали, можете &nbsp;
                <span
                  className="text-red-600 text-lg font-normal font-redcollar leading-none cursor-pointer"
                  onClick={openLeaveModal}
                >
                  отменить участие.
                </span>
              </div>
            ) : (
              <Button
                label="Присоединиться к событию"
                color="black"
                onClick={handleJoinEvent}
              />
            )}
          </div>
        )}
        {isLoginModalOpen && <AuthModal onClose={closeLoginModal} />}
        {isLeaveModalOpen && event && (
          <LeaveEvent event={event} userToken={userToken} onClose={onClose} leaveModal={closeLeaveModal} />
        )}
      </div>
    </div>
  );
};
