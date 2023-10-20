import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "./components/Buttons";
import { leaveEvent } from "./requests";
const LeaveEvent = ({ event, userToken, onClose, leaveModal, }) => {
    const leaveJoinEvent = async () => {
        try {
            await leaveEvent(event.id, userToken);
            onClose();
        }
        catch (error) {
            console.error(`Ошибка при отмене участия: ${event.title}`, error);
        }
    };
    return (_jsx("div", { className: "fixed w-full h-full top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 pl-8", children: _jsxs("div", { className: "w-[44.375rem] h-[21.25rem] bg-white rounded-[4rem] shadow-lg relative", children: [_jsx("button", { className: "absolute top-10 right-10 text-[22px] leading-none text-gray-500 hover:text-gray-700", onClick: leaveModal, children: "\u2716" }), _jsxs("div", { className: "h-full mt-[5.5rem] ml-24 mr-24 font-redcollar flex flex-col items-center", children: [_jsx("h2", { className: "text-4xl mb-16 text-center", children: "\u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u043E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0443\u0447\u0430\u0441\u0442\u0438\u0435?" }), _jsxs("div", { className: "flex flex-row gap-6 justify-center items-center", children: [_jsx(Button, { border: "black", label: "Нет", onClick: leaveModal }), _jsx(Button, { color: "black", label: "Да", onClick: leaveJoinEvent })] })] })] }) }));
};
export default LeaveEvent;
