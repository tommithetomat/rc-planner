import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import closeEye from "../img/closeEye.png";
import openEye from "../img/openEye.png";
export const Input = ({ label, value, onChange, error, maxLength, typeOf, placeholder, width, showhide, right, }) => {
    const [showPassword, setShowPassword] = useState(true);
    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    return (_jsxs("div", { className: "flex-col justify-start items-start inline-flex", children: [_jsxs("div", { className: `self-stretch ${typeOf === "description" ? "h-[9.5625rem]" : "h-full"} pt-2.5 pb-2 bg-white rounded-xl border ${typeOf === "password" ? "border-stone-950" : "border-gray-400"} justify-start gap-1 flex flex-col`, children: [_jsx("div", { className: "self-stretch justify-start items-center inline-flex", children: _jsx("div", { className: "text-gray-400 text-sm font-normal font-ttcommons leading-none pl-4", children: label }) }), typeOf === "description" ? (_jsx("textarea", { rows: 4, value: value, onChange: onChange, className: "w-full h-full focus:outline-none px-4 resize-none" })) : (_jsx("input", { type: showPassword && showhide ? "password" : "text", value: value, placeholder: placeholder, onChange: onChange, className: `${width} h-full bg-transparent rounded text-stone-950 placeholder-stone-600 focus:outline-none focus:ring-0 pl-4`, maxLength: maxLength })), showhide && (_jsx("button", { type: "button", className: `mt-2 absolute ${right ? right : "right-48"} cursor-pointer text-gray-400 text-sm`, onClick: handleTogglePassword, children: showPassword ? (_jsx("img", { src: closeEye, alt: "hide password eye" })) : (_jsx("img", { src: openEye, alt: "show password eye" })) }))] }), error && _jsx("div", { className: "text-red-600 text-sm mt-1", children: error })] }));
};
