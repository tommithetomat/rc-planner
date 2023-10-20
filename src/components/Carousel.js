import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { arrowLeft, arrowRight } from "../all-func";
import { Button } from "./Buttons";
const BASE_URL = "https://planner.rdclr.ru";
const imageWidth = 16.7;
export const CustomSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleIndicatorClick = (index) => {
        setCurrentIndex(index);
    };
    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => prevIndex === 0 ? images.length - 1 : prevIndex - 1);
    };
    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => prevIndex === images.length - 1 ? 0 : prevIndex + 1);
    };
    return (_jsx("div", { className: "relative w-full ml-16", children: _jsxs("div", { className: "slider-container relative overflow-hidden mt-14", children: [_jsxs("div", { className: "flex flex-row justify-between items-center pr-24", children: [_jsx("h3", { className: "text-2xl font-semibold mb-2 font-redcollar", children: "\u0413\u0430\u043B\u0435\u0440\u0435\u044F" }), images.length > 3 && (_jsxs("div", { className: "flex flex-row items-center justify-center gap-2", children: [_jsx(Button, { color: "gray", label: arrowLeft, onClick: handlePrevClick, padding: "px-4 py-2" }), _jsx(Button, { color: "gray", label: arrowRight, onClick: handleNextClick, padding: "px-4 py-2" })] }))] }), _jsx("div", { className: "slider flex transition-transform duration-300 ease-in-out gap-4 mt-8", children: images.map((image, index) => (_jsx("div", { className: "slide min-w-fit h-40", style: {
                            transform: `translateX(-${currentIndex * (imageWidth + 1)}rem)`,
                        }, children: _jsx("img", { src: BASE_URL + image.url, alt: `Slide ${index + 1}`, className: "w-[16.7rem] h-full rounded-xl object-cover" }) }, index))) }), images.length > 3 && (_jsx("div", { className: "indicators flex justify-center mt-2 ml-[-8rem]", children: images.map((_, index) => (_jsx("div", { className: `indicator w-8 h-1 mt-2 mx-1 cursor-pointer rounded-full ${index === currentIndex
                            ? "bg-red-600"
                            : "bg-gray-200"}`, onClick: () => handleIndicatorClick(index) }, index))) }))] }) }));
};
