import { useState, useEffect } from "react";
import { getPublicEvents } from "./requests";
import {
	format,
	startOfMonth,
	endOfMonth,
	startOfWeek,
	addDays,
	subMonths,
	addMonths,
	isSameDay,
	DateType,
} from "date-fns";

export function useCalendarState() {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [events, setEvents] = useState([]);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [eventOpen, setEventOpen] = useState(false);
	const [selectedEventIndex, setSelectedEventIndex] = useState(null);
	const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
	const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
	const [isJoinEventModalOpen, setIsJoinEventModalOpen] = useState(false);
	const [isLeaveEventModalOpen, setIsLeaveEventModalOpen] = useState(false);
	const [isCancelEventModalOpen, setIsCancelEventModalOpen] = useState(false);
	const [isLeaveNewEventModalOpen, setIsLeaveNewEventModalOpen] =
		useState(false);
	const [newEventData, setNewEventData] = useState();
	const [newEventModalData, setNewEventDataModal] = useState(false);

	const isAuthenticated = localStorage.getItem("isAuthenticated");
	const userToken = localStorage.getItem("authToken");
	const userId = localStorage.getItem("userId");

	const openAuthModal = () => {
		setIsAuthModalOpen(true);
	};

	const closeAuthModal = () => {
		setIsAuthModalOpen(false);
	};

	const openEventModal = () => {
		setEventOpen(true);
	};

	const closeEventModal = () => {
		setEventOpen(false);
	};

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const startDate = addDays(
					startOfWeek(startOfMonth(currentDate), {
						weekStartsOn: 1,
					}),
					-11
				);

				const endDate = addDays(endOfMonth(currentDate), 31);

				const iso8601Formatted = (date) =>
					`${date.getUTCFullYear()}-${(date.getUTCMonth() + 1)
						.toString()
						.padStart(2, "0")}-${date
						.getUTCDate()
						.toString()
						.padStart(2, "0")}T${date
						.getUTCHours()
						.toString()
						.padStart(2, "0")}:${date
						.getUTCMinutes()
						.toString()
						.padStart(2, "0")}:${date
						.getUTCSeconds()
						.toString()
						.padStart(2, "0")}.${startDate
						.getUTCMilliseconds()
						.toString()
						.padStart(3, "0")}Z`;

				const eventData = await getPublicEvents(
					iso8601Formatted(startDate),
					iso8601Formatted(endDate)
				);
				setEvents(eventData.data);
			} catch (error) {
				console.error("Ошибка при загрузке событий:", error);
			}
		};

		fetchEvents();
	}, []);

	const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
	const startDate = startOfWeek(startOfMonth(currentDate), {
		weekStartsOn: 1,
	});
	const endDate = addDays(endOfMonth(currentDate), 11);

	const prevMonth = () => {
		setCurrentDate(subMonths(currentDate, 1));
	};

	const nextMonth = () => {
		setCurrentDate(addMonths(currentDate, 1));
	};

	const handleEventClick = (event: any, index: number) => {
		setSelectedEvent(event);
		setSelectedEventIndex(index);
		setEventOpen(true);
	};

	const isToday = (date: DateType) => isSameDay(date, new Date());

	const weeks: DateType[][] = [];
	let week: DateType[] = [];
	for (let day = startDate; day <= endDate; day = addDays(day, 1)) {
		week.push(day);

		if (week.length === 7) {
			weeks.push(week);
			week = [];
		}
	}

	const handleAuthClick = () => {
		if (!isAuthenticated) {
			openAuthModal();
		}
	};

	const openCreateEventModal = () => {
		setIsCreateEventModalOpen(true);
	};

	const closeCreateEventModal = () => {
		setIsCreateEventModalOpen(false);
		!isLeaveNewEventModalOpen && setNewEventDataModal(true)
	};

	return {
		currentDate,
		events,
		selectedEvent,
		eventOpen,
		selectedEventIndex,
		isAuthModalOpen,
		isCreateEventModalOpen,
		isJoinEventModalOpen,
		isLeaveEventModalOpen,
		isAuthenticated,
		openAuthModal,
		closeAuthModal,
		openEventModal,
		closeEventModal,
		prevMonth,
		nextMonth,
		handleEventClick,
		isToday,
		handleAuthClick,
		openCreateEventModal,
		closeCreateEventModal,
		weeks,
		week,
		setIsJoinEventModalOpen,
		setIsLeaveEventModalOpen,
		userToken,
		userId,
		isCancelEventModalOpen,
		setIsCancelEventModalOpen,
		isLeaveNewEventModalOpen,
		setIsLeaveNewEventModalOpen,
		newEventData,
		setNewEventData,
		newEventModalData,
		setNewEventDataModal,
	};
}
