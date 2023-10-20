import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { capitalize, formatMonth, arrowLeft, arrowRight } from "./all-func";
import { getYear } from "date-fns";
import { Button } from "./components/Buttons";
import logo from "./img/logo.png";
import head from "./img/Ellipse 1.png";
export const CalendarHeader = ({ currentDate, prevMonth, nextMonth, handleAuthClick, isAuthenticated, openCreateModal, }) => {
    const date = new Date();
    const actYear = getYear(date) === getYear(currentDate);
    return (_jsxs("div", { className: "w-auto h-20 flex justify-between items-center", children: [_jsxs("div", { className: "flex gap-2 items-center", children: [_jsx("img", { src: logo, alt: "Logo", className: "w-[3.31044rem] h-auto" }), _jsx("h2", { className: "text-2xl font-redcollar leading-none ml-[2.19rem]", children: "red collar" }), _jsxs("h1", { className: "font-redcollar text-6xl leading-none ml-[1.19rem]", children: ["planner ", _jsx("span", { className: "text-red-600", children: "event" })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("div", { className: "flex flex-row items-center gap-2", children: [_jsx("h2", { className: "text-[1.625rem] font-normal font-redcollar", children: `${capitalize(formatMonth(currentDate))}${!actYear ? `'${getYear(currentDate)}` : ''}` }), _jsx(Button, { color: "gray", label: arrowLeft, onClick: prevMonth, padding: "px-4 py-2" }), _jsx(Button, { color: "gray", label: arrowRight, onClick: nextMonth, padding: "px-4 py-2" })] }), _jsxs("div", { className: "flex flex-row items-center ml-[3.75rem] gap-3 px", children: [_jsx(Button, { color: "black", label: isAuthenticated ? "+" : "Войти", onClick: isAuthenticated ? openCreateModal : handleAuthClick, padding: "px-8 py-[1rem]" }), isAuthenticated && (_jsx("img", { src: head, alt: "Logo", className: "w-16 h-16 rounded-full" }))] })] })] }));
};
