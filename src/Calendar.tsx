import React from "react";
import { EventInfoModalProps } from "./Event";
import { LeaveEventProps } from "./LeaveEvent";
import { CalendarHeaderProps } from "./CalendarHeader";
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

export const Calendar: React.FC = () => {
	const {
		currentDate,
		events,
		selectedEvent,
		eventOpen,
		isAuthModalOpen,
		isCreateEventModalOpen,
		isJoinEventModalOpen,
		isLeaveEventModalOpen,
		isAuthenticated,
		closeAuthModal,
		closeEventModal,
		prevMonth,
		nextMonth,
		handleEventClick,
		isToday,
		handleAuthClick,
		openCreateEventModal,
		closeCreateEventModal,
		setIsJoinEventModalOpen,
		setIsLeaveEventModalOpen,
		isCancelEventModalOpen,
		setIsCancelEventModalOpen,
		newEventData,
		newEventModalData,
		setNewEventDataModal,
	} = useCalendarState();

	return (
		<div className="py-4 mx-[3.75rem]">
			<CalendarHeader
				currentDate={currentDate}
				prevMonth={prevMonth}
				nextMonth={nextMonth}
				isAuthenticated={isAuthenticated}
				handleAuthClick={handleAuthClick}
				openCreateModal={openCreateEventModal}
			/>
			<CalendarGrid
				currentDate={currentDate}
				events={events}
				handleEventClick={handleEventClick}
				isToday={isToday}
			/>
			{eventOpen && (
				<EventInfoModal
					event={selectedEvent}
					onClose={closeEventModal}
					joinEventModalOpen={setIsJoinEventModalOpen} 
				/>
			)}
			{isAuthModalOpen && <AuthModal onClose={closeAuthModal} />}
			{isJoinEventModalOpen && selectedEvent ? (
				<JoinEvent
					event={selectedEvent}
					onClose={() => setIsJoinEventModalOpen(false)}
				/>
			) : null}
			{isLeaveEventModalOpen && selectedEvent ? (
				<LeaveEvent
					event={selectedEvent}
					userToken={null}
					onClose={() => setIsLeaveEventModalOpen(false)} leaveModal={function (): void {
						throw new Error("Function not implemented.");
					} }				/>
			) : null}
			{newEventModalData && newEventData ? (
				<CreateModal
					event={newEventData}
					userToken={null}
					onClose={() => setNewEventDataModal(false)}
				/>
			) : null}
			{isCancelEventModalOpen && (
				<LeaveNewEvent
					onClose={() => setIsCancelEventModalOpen(false)} newEventLeaveModal={function (): void {
						throw new Error("Function not implemented.");
					} }				/>
			)}
			{isCreateEventModalOpen && (
				<CreateEvent onClose={closeCreateEventModal} />
			)}
		</div>
	);
};
