import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCalendarState } from "./calendarState";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarGrid } from "./CalendarGrid";
import { EventInfoModal } from "./Event";
import { AuthModal } from "./AuthModal";
import JoinEvent from "./JoinEvent";
import LeaveEvent from "./LeaveEvent";
import { CreateEvent } from "./CreateEvent";
import LeaveNewEvent from "./LeaveNewEvent";
import { CreateModal } from "./CreateModal";
export const Calendar = () => {
    const { currentDate, events, selectedEvent, eventOpen, isAuthModalOpen, isCreateEventModalOpen, isJoinEventModalOpen, isLeaveEventModalOpen, isAuthenticated, closeAuthModal, closeEventModal, prevMonth, nextMonth, handleEventClick, isToday, handleAuthClick, openCreateEventModal, closeCreateEventModal, setIsJoinEventModalOpen, setIsLeaveEventModalOpen, isCancelEventModalOpen, setIsCancelEventModalOpen, newEventData, newEventModalData, setNewEventDataModal, } = useCalendarState();
    return (_jsxs("div", { className: "py-4 mx-[3.75rem]", children: [_jsx(CalendarHeader, { currentDate: currentDate, prevMonth: prevMonth, nextMonth: nextMonth, isAuthenticated: isAuthenticated, handleAuthClick: handleAuthClick, openCreateModal: openCreateEventModal }), _jsx(CalendarGrid, { currentDate: currentDate, events: events, handleEventClick: handleEventClick, isToday: isToday }), eventOpen && (_jsx(EventInfoModal, { event: selectedEvent, onClose: closeEventModal, joinEventModalOpen: setIsJoinEventModalOpen })), isAuthModalOpen && _jsx(AuthModal, { onClose: closeAuthModal }), isJoinEventModalOpen && (_jsx(JoinEvent, { event: selectedEvent, onClose: () => setIsJoinEventModalOpen(false) })), isLeaveEventModalOpen && selectedEvent && (_jsx(LeaveEvent, { event: selectedEvent, userToken: null, onClose: () => setIsLeaveEventModalOpen(false) })), newEventModalData && newEventData && (_jsx(CreateModal, { event: newEventData, userToken: null, onClose: () => setNewEventDataModal(false) })), isCancelEventModalOpen && (_jsx(LeaveNewEvent, { onClose: () => setIsCancelEventModalOpen(false) })), isCreateEventModalOpen && (_jsx(CreateEvent, { onClose: closeCreateEventModal }))] }));
};
