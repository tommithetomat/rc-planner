import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { parseISO } from "date-fns";
import { formatDate, dayOfTheWeek, formatTime } from "./func";
import info from "./img/Info.png";
const EventDetails = ({ event }) => {
    if (!event)
        return null;
    const isEventActive = parseISO(event.dateStart) >= new Date();
    return (_jsxs("div", { className: "flex justify-center flex-col  mt-20", children: [_jsx("h2", { className: "text-4xl font-semibold mb-2 font-redcollar text-center", children: event.title }), !isEventActive && (_jsx("div", { className: "flex items-center flex-col justify-center mt-4", children: _jsxs("div", { className: "h-10 px-3 py-2 bg-neutral-50 rounded-xl items-center gap-2 inline-flex", children: [_jsx("img", { src: info, alt: "info" }), _jsx("p", { className: "text-[0.875rem]", children: "\u041C\u0435\u0440\u043E\u043F\u0440\u0438\u044F\u0442\u0438\u0435 \u0443\u0436\u0435 \u043F\u0440\u043E\u0448\u043B\u043E" })] }) })), _jsxs("div", { className: "flex mx-16 gap-8 font-normal mt-10", children: [_jsxs("div", { className: `flex min-w-[13.25rem] flex-col border-none rounded-3xl bg-neutral-50 pl-4 pr-3 py-3.5 ${isEventActive ? "text-stone-950" : "text-gray-500"} text-lg`, children: [_jsxs("div", { className: "pb-2 border-b border-zinc-200 font-redcollar", children: [_jsx("p", { className: "", children: dayOfTheWeek(event.dateStart) }), _jsx("p", { className: "", children: formatDate(event.dateStart) }), _jsx("p", { className: "", children: formatTime(event.dateStart) })] }), _jsx("div", { className: "" }), _jsx("p", { className: "text-lg", children: event.location })] }), _jsx("p", { className: "text-stone-950 text-xl font-medium max-h-36 overflow-auto", children: event.description })] })] }));
};
export default EventDetails;
