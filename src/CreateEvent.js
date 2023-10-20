import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Button } from "./components/Buttons"; // Import ButtonProps
import { getCurrentUser, createEventWithParticipants } from "./requests";
import { Input } from "./components/InputComp"; // Import InputProps
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
export const CreateEvent = ({ onClose }) => {
    const [eventData, setEventData] = useState({
        title: "",
        description: "",
        selectedUsers: [],
        photos: [],
        startDate: null,
        location: "",
        time: "",
    });
    const { setIsCancelEventModalOpen, isCancelEventModalOpen, setNewEventData, } = useCalendarState();
    const [user, setUser] = useState([]);
    const authToken = localStorage.getItem("authToken");
    const closeNewEventLeaveModal = () => {
        setIsCancelEventModalOpen(false);
    };
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getCurrentUser(authToken);
                setUser(response);
            }
            catch (error) {
                console.error("Ошибка:", error);
            }
        };
        fetchUser();
    }, [authToken]);
    const handleParticipantsChange = (participants) => {
        setEventData({ ...eventData, selectedUsers: participants });
    };
    const handleInputChange = (field, value) => {
        setEventData({ ...eventData, [field]: value });
    };
    const handleDateSelect = (date) => {
        setEventData({ ...eventData, startDate: date });
    };
    const handleTimeInputChange = (e) => {
        const { name, value } = e.target;
        const timePattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
        if (value === "" || timePattern.test(value)) {
            setEventData({ ...eventData, [name]: value });
        }
    };
    const combineDateAndTime = (date, time) => {
        const corDate = format(date, "dd.MM.yyyy");
        const parsedDate = parse(corDate, "dd.MM.yyyy", new Date());
        const [hours, minutes] = time.split(":").map(Number);
        if (Number.isInteger(hours) &&
            hours >= 0 &&
            hours < 24 &&
            Number.isInteger(minutes) &&
            minutes >= 0 &&
            minutes < 60) {
            const combinedDateTime = addMinutes(parsedDate, hours * 60 + minutes);
            const formattedDateTime = format(combinedDateTime, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
            return formattedDateTime;
        }
        else {
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
                dateStart: combineDateAndTime(eventData.startDate, eventData.time),
                location: eventData.location,
                participants: participantIds,
                photos: eventData.photos,
            };
            const response = await createEventWithParticipants(eventDat, authToken);
            setNewEventData(response);
            onClose();
        }
        catch (error) {
            console.error("Ошибка при создании события:", error);
        }
    };
    const handlePhotoUpload = (uploadedPhotos) => {
        setEventData({ ...eventData, photos: uploadedPhotos });
    };
    const isValidate = eventData.title !== "" &&
        eventData.description !== "" &&
        eventData.startDate !== null &&
        eventData.location !== "" &&
        eventData.time !== "";
    return (_jsx("div", { className: "fixed w-full h-full top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 leading-none", children: _jsxs("div", { className: "w-[67.25rem] h-[56.6875rem] bg-white rounded-[4rem] shadow-lg relative flex items-center flex-col pt-20 px-16 pb-16", children: [_jsx("button", { className: "absolute top-10 right-10 text-[22px] leading-none text-gray-500 hover:text-gray-700", onClick: openCancelEventModal, children: "\u2716" }), _jsx("h2", { className: "font-redcollar text-4xl", children: "\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u0441\u043E\u0431\u044B\u0442\u0438\u044F" }), _jsxs("div", { className: "flex flex-row space-x-4 mt-16", children: [_jsxs("div", { className: "flex flex-col gap-8", children: [_jsx(Input, { value: eventData.title, onChange: (e) => handleInputChange("title", e.target.value), size: "big", label: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435*" }), _jsx(Input, { value: eventData.description, onChange: (e) => handleInputChange("description", e.target.value), typeOf: "description", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435*" }), _jsx(ParticipantSelect, { onParticipantsChange: handleParticipantsChange })] }), _jsxs("div", { className: "flex flex-col gap-8", children: [_jsxs("div", { className: "flex flex-row gap-2", children: [_jsx(DatePicker, { showIcon: true, selected: eventData.startDate, onChange: handleDateSelect, placeholderText: "\u041D\u0430\u0447\u0430\u043B\u043E*", dateFormat: "dd.MM.yyyy", className: "border border-gray-400 rounded-xl font-ttcommons h-[3.6rem] text-sm font-normal focus:outline-none", locale: ru, selectsStart: true, startDate: eventData.startDate, endDate: eventData.endDate, icon: calendarSvg }), _jsx(DatePicker, { showIcon: true, selected: eventData.endDate, onChange: handleDateSelect, placeholderText: "\u041A\u043E\u043D\u0435\u0446", dateFormat: "dd.MM.yyyy", className: "border border-gray-400 rounded-xl font-ttcommons h-[3.6rem] text-sm font-normal focus:outline-none", locale: ru, selectsEnd: true, startDate: eventData.startDate, endDate: eventData.endDate, icon: calendarSvg })] }), _jsxs("div", { className: "border border-gray-400 rounded-xl font-ttcommons w-[22.125rem] h-[3.75rem] text-sm font-normal p-4 relative", children: [_jsx("div", { children: _jsx("div", { className: "text-gray-400 text-sm font-normal font-ttcommons leading-none absolute top-3 r-4", children: "\u0412\u0440\u0435\u043C\u044F*" }) }), _jsx("input", { type: "time", name: "time", value: eventData.time, placeholder: "", onChange: handleTimeInputChange, className: "w-full h-full focus:outline-none mt-3" })] }), _jsx(Input, { value: eventData.location, onChange: (e) => handleInputChange("location", e.target.value), size: "medium", label: "\u041C\u0435\u0441\u0442\u043E*" }), _jsx("div", { className: "h-10", children: _jsx(Participant, { participant: user, author: true }) })] })] }), _jsx("div", { className: "flex items-start w-full mt-8 mb-16", children: _jsx(PhotoUploader, { onUploadPhoto: handlePhotoUpload }) }), _jsx(Button, { color: !isValidate ? "gray" : "black", label: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C", onClick: handleSubmit, disabled: !isValidate }), isCancelEventModalOpen && (_jsx(LeaveNeWEvent, { onClose: onClose, newEventLeaveModal: closeNewEventLeaveModal }))] }) }));
};