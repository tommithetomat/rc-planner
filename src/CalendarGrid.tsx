import React from "react";
import {
	startOfWeek,
	startOfMonth,
	endOfMonth,
	addDays,
	subMonths,
	addMonths,
	isSameDay,
	isWeekend,
} from "date-fns";
import { EventComponent } from "./components/EventComp";
import { formatDay, formatMonth } from "./all-func";
import { useCalendarState } from "./calendarState";

export const CalendarGrid = ({
	currentDate,
	events,
	handleEventClick,
	isToday,
}) => {
	const { userId, isAuthenticated } = useCalendarState();
	const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
	const startDate = startOfWeek(startOfMonth(currentDate), {
		weekStartsOn: 1,
	});
	const endDate = addDays(endOfMonth(currentDate), 11);

	const weeks = [];
	let week = [];
	for (let day = startDate; day <= endDate; day = addDays(day, 1)) {
		week.push(day);

		if (week.length === 7) {
			weeks.push(week);
			week = [];
		}
	}

	return (
		<>
			<div className="grid grid-cols-7 text-right font-redcollar justify-items-end mt-[6.5rem]">
				{days.map((day) => (
					<div key={day} className="w-16 py-1 px-1 text-right">
						{day}
					</div>
				))}
			</div>

			<div className="grid grid-cols-7 border border-gray rounded-3xl overflow-hidden">
				{weeks.map((week, weekIndex) => (
					<React.Fragment key={weekIndex}>
						{week.map((day) => {
							const dayEvents = events.filter((event) =>
								isSameDay(new Date(event.dateStart), day)
							);
							const isWeekendDay = isWeekend(day);
							const grayDay =
								formatMonth(currentDate) !== formatMonth(day);
							return (
								<div
									key={day.toString()}
									className={`pt-10 h-[8.5rem] text-center border border-gray overflow-auto relative ${
										isToday(day)
											? "border-red-600 rounded"
											: ""
									} ${
										isWeekendDay ? "bg-neutral-50" : ""
									} max-w-[100%]`}
								>
									<div
										className={`text-lg absolute top-2 right-2  ${
											grayDay && "text-neutral-400"
										}`}
									>
										{formatDay(day)}
									</div>
									<div className="text-right px-2 m-1 flex flex-col items-end">
										{dayEvents
											.filter((event) => event.dateStart)
											.sort((a, b) =>
												a.dateStart < b.dateStart
													? -1
													: 1
											)
											.map((event, index) => {
												const isUserOwner =
													event.owner?.id == userId;
												const isUserParticipant =
													event.participants.some(
														(participant) =>
															participant.id ==
															userId
													);
												const whatFigure = isUserOwner
													? "star"
													: isUserParticipant
													? "circle"
													: "default";

												const whoInEvent = isUserOwner
													? "created"
													: isUserParticipant
													? "accede"
													: "default";

												return (
													<EventComponent
														key={event.id}
														dateStart={
															event.dateStart
														}
														label={event.title}
														onEvent={
															isAuthenticated &&
															whoInEvent
														}
														figure={
															isAuthenticated &&
															whatFigure
														}
														onClick={() =>
															handleEventClick(
																event,
																index
															)
														}
													/>
												);
											})}
									</div>
								</div>
							);
						})}
					</React.Fragment>
				))}
			</div>
		</>
	);
};
