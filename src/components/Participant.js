import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import head from "../img/Ellipse 1.png";
export const Participant = ({ participant, author, onlyImg, }) => {
    return (_jsxs("div", { className: "flex flex-row items-center h-full max-w-[8rem]", children: [participant.photo ? (_jsx("img", { src: participant.photo, alt: participant.username, className: "w-full h-full rounded-full mr-2" })) : (_jsx("img", { src: head, alt: participant.username, className: "w-auto h-full rounded-full mr-2" })), !onlyImg && (_jsxs("div", { className: "flex flex-col w-[4.75rem] h-full items-start justify-center", children: [_jsx("p", { className: "w-full text-start truncate p-px", children: participant.username }), typeof author === "boolean" && (author ? (_jsx("div", { className: "h-4 px-1 py-[0.4rem] bg-purple-200 rounded-lg items-center inline-flex", children: "\u041E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0442\u043E\u0440" })) : (_jsx("div", { className: "h-4 p-px py-[0.4rem] rounded-lg items-center inline-flex text-gray-400", children: "\u0423\u0447\u0430\u0441\u0442\u043D\u0438\u043A" })))] }))] }));
};