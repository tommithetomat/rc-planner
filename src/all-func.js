import { jsx as _jsx } from "react/jsx-runtime";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
export const formatMonth = (date) => format(date, "LLLL", { locale: ru });
export const formatDay = (date) => {
    const day = format(date, "d", { locale: ru });
    const month = format(date, "MMM", { locale: ru });
    return date.getDate() === 1 ? `${day} ${month}` : day;
};
export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
export const arrowLeft = (_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 32 32", fill: "none", children: _jsx("path", { d: "M19 6L9.70711 15.2929C9.31658 15.6834 9.31658 16.3166 9.70711 16.7071L19 26", stroke: "#0D0C0C", strokeWidth: "4", strokeLinecap: "round" }) }));
export const arrowRight = (_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 32 32", fill: "none", children: _jsx("path", { d: "M13 6L22.2929 15.2929C22.6834 15.6834 22.6834 16.3166 22.2929 16.7071L13 26", stroke: "#0D0C0C", strokeWidth: "4", strokeLinecap: "round" }) }));
export const calendarSvg = (_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 32 32", fill: "none", children: _jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M11.25 6C10.9739 6 10.75 6.22386 10.75 6.5V8H8C6.89543 8 6 8.89543 6 10V23C6 24.1046 6.89543 25 8 25H24C25.1046 25 26 24.1046 26 23V10C26 8.89543 25.1046 8 24 8H21.25V6.5C21.25 6.22386 21.0261 6 20.75 6H19.25C18.9739 6 18.75 6.22386 18.75 6.5V8H13.25V6.5C13.25 6.22386 13.0261 6 12.75 6H11.25ZM9 15C8.44772 15 8 15.4477 8 16V22C8 22.5523 8.44772 23 9 23H23C23.5523 23 24 22.5523 24 22V16C24 15.4477 23.5523 15 23 15H9ZM10.5 17C10.2239 17 10 17.2239 10 17.5V19C10 19.2761 10.2239 19.5 10.5 19.5H12C12.2761 19.5 12.5 19.2761 12.5 19V17.5C12.5 17.2239 12.2761 17 12 17H10.5ZM14.75 17.5C14.75 17.2239 14.9739 17 15.25 17H16.75C17.0261 17 17.25 17.2239 17.25 17.5V19C17.25 19.2761 17.0261 19.5 16.75 19.5H15.25C14.9739 19.5 14.75 19.2761 14.75 19V17.5ZM20 17C19.7239 17 19.5 17.2239 19.5 17.5V19C19.5 19.2761 19.7239 19.5 20 19.5H21.5C21.7761 19.5 22 19.2761 22 19V17.5C22 17.2239 21.7761 17 21.5 17H20Z", fill: "#B3B3BC" }) }));
