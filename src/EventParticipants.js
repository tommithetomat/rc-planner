import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Participant } from "./components/Participant";
export const EventParticipants = ({ participants, owner, }) => {
    const sortedParticipants = [...participants];
    const ownerIndex = sortedParticipants.findIndex((participant) => participant.id === owner);
    if (ownerIndex !== -1) {
        const ownerParticipant = sortedParticipants.splice(ownerIndex, 1)[0];
        sortedParticipants.unshift(ownerParticipant);
    }
    const maxVisibleUsers = 5;
    const maxHiddenUsers = 3;
    const [visibleParticipants, setVisibleParticipants] = useState(sortedParticipants.slice(0, maxVisibleUsers));
    const [hiddenParticipants, setHiddenParticipants] = useState(sortedParticipants.slice(maxVisibleUsers, maxVisibleUsers + maxHiddenUsers));
    useEffect(() => {
        setVisibleParticipants(sortedParticipants.slice(0, maxVisibleUsers));
        setHiddenParticipants(sortedParticipants.slice(maxVisibleUsers, maxVisibleUsers + maxHiddenUsers));
    }, [participants]);
    return (_jsxs("div", { className: "mt-10 mx-16", children: [_jsx("h3", { className: "text-xl font-semibold mb-2 font-redcollar", children: "\u0423\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0438:" }), _jsxs("div", { className: "flex overflow-hidden mt-6 justify-between", children: [visibleParticipants.map((participant) => (_jsx(Participant, { participant: participant, author: participant.id === owner }, participant.id))), hiddenParticipants.length > 0 && (_jsxs("div", { className: "flex flex-row items-center", children: [hiddenParticipants.map((participant) => (_jsx("div", { className: "flex flex-row -ml-10", children: _jsx(Participant, { participant: participant, author: participant.id === owner, onlyImg: true }) }, participant.id))), _jsxs("div", { className: "z-0 bg-white px-4 py-2", children: ["\u0415\u0449\u0435 +", participants.length - visibleParticipants.length] })] }))] })] }));
};
