import React from "react";
import { capitalize, formatMonth, arrowLeft, arrowRight } from "./all-func";
import 	{ getYear } from "date-fns";
import { Button } from "./components/Buttons";
import logo from "./img/logo.png";
import head from "./img/Ellipse 1.png";

export const CalendarHeader = ({
	currentDate,
	prevMonth,
	nextMonth,
	handleAuthClick,
	isAuthenticated,
	openCreateModal,
}) => {
    const date = new Date()
    const actYear = getYear(date) === getYear(currentDate)
	
	return (
		<div className="w-auto h-20 flex justify-between items-center">
			<div className="flex gap-2 items-center">
				<img src={logo} alt="Logo" className="w-[3.31044rem] h-auto" />
				<h2 className="text-2xl font-redcollar leading-none ml-[2.19rem]">
					red collar
				</h2>
				<h1 className="font-redcollar text-6xl leading-none ml-[1.19rem]">
					planner <span className="text-red-600">event</span>
				</h1>
			</div>
			<div className="flex items-center gap-2">
				<div className="flex flex-row items-center gap-2">
					<h2 className="text-[1.625rem] font-normal font-redcollar">
						{`${capitalize(formatMonth(currentDate))}${!actYear ? `'${getYear(currentDate)}` : ''}`}
					</h2>
					<Button
						color="gray"
						label={arrowLeft}
						onClick={prevMonth}
						padding="px-4 py-2"
					></Button>
					<Button
						color="gray"
						label={arrowRight}
						onClick={nextMonth}
						padding="px-4 py-2"
					></Button>
				</div>
				<div className="flex flex-row items-center ml-[3.75rem] gap-3 px">
					<Button
						color="black"
						label={isAuthenticated ? "+" : "Войти"}
						onClick={
							isAuthenticated ? openCreateModal : handleAuthClick
						}
                        padding="px-8 py-[1rem]"
					/>
					{isAuthenticated && (
						<img
							src={head}
							alt="Logo"
							className="w-16 h-16 rounded-full"
						/>
					)}
				</div>
			</div>
		</div>
	);
};
