import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { getAllUsers } from "./requests";
import { Participant } from "./components/Participant";
const ParticipantSelect = ({ onParticipantsChange }) => {
    const [users, setUsers] = useState([]);
    const [selectedParticipants, setSelectedParticipants] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isListOpen, setIsListOpen] = useState(false);
    const inputRef = useRef(null);
    const listRef = useRef(null);
    const containerRef = useRef(null);
    const userToken = localStorage.getItem("authToken");
    const handleContainerClick = () => {
        setIsListOpen(true);
        inputRef.current?.focus();
    };
    useEffect(() => {
        async function fetchUsers() {
            try {
                const users = await getAllUsers(userToken);
                setUsers(users);
            }
            catch (error) {
                console.error("Ошибка при получении пользователей:", error);
            }
        }
        fetchUsers();
    }, [userToken]);
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value || "");
    };
    const handleParticipantClick = (user) => {
        if (!selectedParticipants.some(participant => participant.id === user.id)) {
            const updatedParticipants = [...selectedParticipants, user];
            setSelectedParticipants(updatedParticipants);
            onParticipantsChange(updatedParticipants);
        }
        setSearchTerm("");
        inputRef.current?.focus();
    };
    const handleRemoveParticipant = (userId) => {
        const updatedParticipants = selectedParticipants.filter(user => user.id !== userId);
        setSelectedParticipants(updatedParticipants);
        onParticipantsChange(updatedParticipants);
    };
    const filteredUsers = users.filter(user => user.username.toLowerCase().includes(searchTerm.toLowerCase()));
    const handleDocumentClick = (e) => {
        if (!listRef.current?.contains(e.target) &&
            !inputRef.current?.contains(e.target) &&
            !containerRef.current?.contains(e.target)) {
            setIsListOpen(false);
        }
    };
    useEffect(() => {
        document.addEventListener("click", handleDocumentClick);
        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, []);
    return (_jsx("div", { ref: containerRef, className: "relative max-h-[5rem]", children: _jsxs("div", { onClick: handleContainerClick, className: "flex flex-wrap items-center w-[36.25rem] h-full border border-gray-400 rounded-xl overflow-auto", children: [_jsx("div", { className: "absolute justify-start items-center inline-flex top-3", children: _jsx("div", { className: "text-gray-400 text-sm font-normal font-ttcommons leading-none pl-4", children: "\u0423\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0438" }) }), _jsxs("div", { className: `flex flex-wrap space-x-2 gap-2 px-4 pt-8 ${!isListOpen && 'h-[4.5rem]'}`, children: [selectedParticipants.map(user => (_jsxs("div", { className: "relative h-[1.875rem] inline-flex justify-center items-center group bg-zinc-100 border rounded-3xl", children: [_jsx(Participant, { participant: user }), _jsx("span", { className: "absolute right-0 text-2xl leading-none bg-gradient-to-l from-zinc-100 to-zinc-100 rounded-tr-xl rounded-br-xl cursor-pointer text-gray-300 hidden group-hover:block", onClick: () => handleRemoveParticipant(user.id), children: "\u2716" })] }, user.id))), isListOpen && (_jsx("input", { type: "text", value: searchTerm, onChange: handleSearchChange, ref: inputRef, onFocus: () => setIsListOpen(true), className: "pt-2.5 pb-4 w-40 h-10 rounded focus:outline-none" })), _jsx("div", { className: "absolute top-full -left-2 w-full z-50", children: isListOpen && (_jsx("ul", { ref: listRef, className: "w-80 max-h-60 px-2 pt-2 pb-2 bg-white rounded-2xl border border-gray-400 shadow overflow-y-auto", children: filteredUsers.map(user => (_jsx("li", { className: "cursor-pointer hover-bg-gray-100 p-2 rounded-2xl", onClick: () => handleParticipantClick(user), children: _jsx(Participant, { participant: user }) }, user.id))) })) })] })] }) }));
};
export default ParticipantSelect;
