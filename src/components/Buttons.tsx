import React, { useMemo } from "react";

const colorClasses = {
    red: "bg-red-600 text-white",
    black: "bg-stone-950 text-white",
    gray: "bg-zinc-100 text-gray-400",
    default: "bg-transparent",
};

const borderClasses = {
    red: "border border-red-600 text-red-600",
    black: "border border-stone-950 text-stone-950",
    default: "",
};

export const Button = ({ color = 'default', label, padding, width, border = 'default', ...props }) => {
    const btnClasses = useMemo(() => {
        const baseClasses = `${!padding ? 'px-8 py-4' : padding} ${width} rounded-xl justify-center items-center gap-2 inline-flex text-[18px] font-redcollar leading-none font-normal`;
        const colorClass = colorClasses[color];
        const borderClass = borderClasses[border];
        return [baseClasses, colorClass, borderClass].join(" ");
    }, [color, padding, width, border]);

    return (
        <button type="button" className={btnClasses} {...props}>
            {label}
        </button>
    );
};