import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import hand from "./img/hand.png";
import { formatDate, dayOfTheWeek, formatTime } from "./func";
import { Button } from "./components/Buttons";
const backgroundStyle = {
    backgroundImage: `url(${hand})`,
    backgroundSize: "contain",
    backgroundPosition: "calc(100% - 2.16rem) 50%",
    backgroundRepeat: "no-repeat",
};
const JoinEvent = ({ event, onClose }) => {
    return (_jsx("div", { className: "fixed w-full h-full top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 pl-8", children: _jsxs("div", { className: "w-[48.125rem] h-[31.875rem] bg-white rounded-[4rem] shadow-lg relative", style: backgroundStyle, children: [_jsx("button", { className: "absolute top-10 right-10 text-[22px] leading-none text-gray-500 hover:text-gray-700", onClick: onClose, children: "\u2716" }), _jsxs("div", { className: "h-full mt-[5.5rem] ml-[5rem] font-redcollar", children: [_jsx("h2", { className: "text-[4rem]", children: "\u041F\u043E\u0437\u0434\u0440\u0430\u0432\u043B\u044F\u0435\u043C!" }), _jsx("h2", { className: "text-[1.125rem]", children: "\u0422\u0435\u043F\u0435\u0440\u044C \u0432\u044B \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A" }), _jsx("h2", { className: "text-[1.125rem] text-red-600", children: event.title }), _jsxs("div", { className: "flex flex-row items-center mt-[4.44rem] gap-4 text-lg", children: [_jsx("p", { children: dayOfTheWeek(event.dateStart) }), _jsx("div", { className: "w-4 h-px rotate-90 bg-gray-400" }), _jsx("p", { children: formatDate(event.dateStart) }), _jsx("div", { className: "w-4 h-px rotate-90 bg-gray-400" }), _jsx("p", { children: formatTime(event.dateStart) })] }), _jsx("p", { className: "font-ttcommons mt-2 mb-10 text-xl leading-none", children: event.location }), _jsx(Button, { color: "black", label: "Отлично", onClick: onClose })] })] }) }));
};
export default JoinEvent;
