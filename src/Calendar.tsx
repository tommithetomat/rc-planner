import { useCalendarState } from "./calendarState";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarGrid } from "./CalendarGrid";
import { EventInfoModal } from "./Event";
import AuthModal from "./AuthModal";
import { JoinEvent } from "./JoinEvent";
import { LeaveEvent } from "./LeaveEvent";
import { CreateEvent } from "./CreateEvent";
import { LeaveNeWEvent } from "./LeaveNewEvent";
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
		userToken,
		userId,
		isCancelEventModalOpen,
		setIsCancelEventModalOpen,
		newEventData,
		newEventModalData,
		setNewEventDataModal,
	} = useCalendarState();
	console.log(newEventData)
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
					joinEventModalOpen={setIsJoinEventModalOpen}
					onClose={closeEventModal}
				/>
			)}
			{isAuthModalOpen && <AuthModal onClose={closeAuthModal} />}
			{isJoinEventModalOpen && (
				<JoinEvent
					event={selectedEvent}
					onClose={() => setIsJoinEventModalOpen(false)}
				/>
			)}
			{isLeaveEventModalOpen && (
				<LeaveEvent
					event={selectedEvent}
					onClose={() => setIsLeaveEventModalOpen(false)}
				/>
			)}
			{newEventModalData && (
				<CreateModal
					event={selectedEvent}
					onClose={() => setNewEventDataModal(false)}
				/>
			)}

			{isCancelEventModalOpen && (
				<LeaveNeWEvent
					onClose={() => setIsCancelEventModalOpen(false)}
				/>
			)}
			{isCreateEventModalOpen && (
				<CreateEvent onClose={closeCreateEventModal} />
			)}
		</div>
	);
};
