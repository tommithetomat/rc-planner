import { parseISO, format } from "date-fns";
import { ru } from "date-fns/locale";
export const formatDate = (dateStr) => {
    const date = parseISO(dateStr);
    return format(date, "d MMMM", { locale: ru });
};
export const dayOfTheWeek = (dateStr) => {
    const date = parseISO(dateStr);
    return format(date, "EEEE", { locale: ru });
};
export const formatTime = (dateStr) => {
    const date = parseISO(dateStr);
    return format(date, "HH:mm");
};
