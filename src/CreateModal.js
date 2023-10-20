import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import unicorn from "./img/unicorn.png";
import { Button } from "./components/Buttons";
const backgroundStyle = {
    backgroundImage: `url(${unicorn})`,
    backgroundSize: "contain",
    backgroundPosition: "calc(100% - 2.16rem) 50%",
    backgroundRepeat: "no-repeat",
};
export const CreateModal = ({ onClose }) => {
    return (_jsx("div", { className: "fixed w-full h-full top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 pl-8", children: _jsxs("div", { className: "w-[48.125rem] h-[31.875rem] bg-white rounded-[4rem] shadow-lg relative", style: backgroundStyle, children: [_jsx("button", { className: "absolute top-10 right-10 text-[22px] leading-none text-gray-500 hover:text-gray-700", onClick: onClose, children: "\u2716" }), _jsxs("div", { className: "h-full mt-[5.5rem] ml-[5rem] font-redcollar", children: [_jsx("h2", { className: "text-[4rem]", children: "\u0423\u0440\u0430!" }), _jsx("h2", { className: "text-[1.125rem]", children: "\u0412\u044B \u0434\u043E\u0431\u0430\u0432\u0438\u043B\u0438 \u043D\u043E\u0432\u043E\u0435 \u0441\u043E\u0431\u044B\u0442\u0438\u0435" }), _jsx(Button, { color: "black", label: "Отлично", onClick: onClose })] })] }) }));
};
