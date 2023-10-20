import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "./components/Buttons";
import EventDetails from "./EventDetails";
import { EventParticipants } from "./EventParticipants";
import EventPhotos from "./EventPhotos";
import { joinEvent } from "./requests";
import LeaveEvent from "./LeaveEvent";
import { parseISO } from "date-fns";
import { AuthModal } from "./AuthModal";
export const EventInfoModal = ({ event, onClose, joinEventModalOpen, }) => {
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
                console.log("Пользователь успешно присоединился к событию:", event.title);
                onClose();
                joinEventModalOpen(true);
            }
            catch (error) {
                console.error(`Ошибка при присоединении к событию: ${event.title}`, error);
            }
        }
    };
    const openLeaveModal = () => {
        setLeaveModalOpen(true);
    };
    const closeLeaveModal = () => {
        setLeaveModalOpen(false);
    };
    const checkUser = event?.participants.some((participant) => participant.id === +userId);
    const isEventActive = event
        ? parseISO(event.dateStart) >= new Date()
        : false;
    return (_jsx("div", { className: "fixed w-full h-full top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 pl-8", children: _jsxs("div", { className: "w-[67.1875rem] max-h-[58.375rem] bg-white rounded-[4rem] shadow-lg relative pb-20", children: [_jsx("button", { className: "absolute top-10 right-10 text-[22px] leading-none text-gray-500 hover:text-gray-700", onClick: onClose, children: "\u2716" }), event && _jsx(EventDetails, { event: event }), isAuthenticated && event && (_jsx(EventParticipants, { participants: event.participants, owner: event.owner?.id })), event && _jsx(EventPhotos, { photos: event.photos }), isEventActive && (_jsx("div", { className: "text-center mt-16", children: !isAuthenticated ? (_jsxs("div", { className: "text-stone-950 text-lg font-normal font-redcollar leading-none", children: [_jsx("span", { className: "text-red-600 text-lg font-normal font-redcollar leading-none cursor-pointer", onClick: openLoginModal, children: "\u0412\u043E\u0439\u0434\u0438\u0442\u0435" }), ", \u0447\u0442\u043E\u0431\u044B \u043F\u0440\u0438\u0441\u043E\u0435\u0434\u0438\u043D\u0438\u0442\u044C\u0441\u044F \u043A \u0441\u043E\u0431\u044B\u0442\u0438\u044E"] })) : checkUser ? (_jsxs("div", { className: "text-stone-950 text-lg font-normal font-redcollar leading-none", children: ["\u0412\u044B \u043F\u0440\u0438\u0441\u043E\u0435\u0434\u0438\u043D\u0438\u043B\u0438\u0441\u044C \u043A \u0441\u043E\u0431\u044B\u0442\u0438\u044E. \u0415\u0441\u043B\u0438 \u043F\u0435\u0440\u0435\u0434\u0443\u043C\u0430\u043B\u0438, \u043C\u043E\u0436\u0435\u0442\u0435 \u00A0", _jsx("span", { className: "text-red-600 text-lg font-normal font-redcollar leading-none cursor-pointer", onClick: openLeaveModal, children: "\u043E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0443\u0447\u0430\u0441\u0442\u0438\u0435." })] })) : (_jsx(Button, { label: "\u041F\u0440\u0438\u0441\u043E\u0435\u0434\u0438\u043D\u0438\u0442\u044C\u0441\u044F \u043A \u0441\u043E\u0431\u044B\u0442\u0438\u044E", color: "black", onClick: handleJoinEvent })) })), isLoginModalOpen && _jsx(AuthModal, { onClose: closeLoginModal }), isLeaveModalOpen && event && (_jsx(LeaveEvent, { event: event, userToken: userToken, onClose: onClose, leaveModal: closeLeaveModal }))] }) }));
};
