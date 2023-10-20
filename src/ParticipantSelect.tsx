import React, { useState, useEffect, useRef } from "react";
import { getAllUsers } from "./requests";
import { Participant } from "./components/Participant";

interface ParticipantSelectProps {
  onParticipantsChange: (participants: any[]) => void; 
}

const ParticipantSelect: React.FC<ParticipantSelectProps> = ({ onParticipantsChange }) => {
  const [users, setUsers] = useState<any[]>([]); 
  const [selectedParticipants, setSelectedParticipants] = useState<any[]>([]); 
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isListOpen, setIsListOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
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
      } catch (error) {
        console.error("Ошибка при получении пользователей:", error);
      }
    }

    fetchUsers();
  }, [userToken]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleParticipantClick = (user: any) => {
    if (!selectedParticipants.some(participant => participant.id === user.id)) {
      const updatedParticipants = [...selectedParticipants, user];
      setSelectedParticipants(updatedParticipants);
      onParticipantsChange(updatedParticipants);
    }
    setSearchTerm("");
    inputRef.current?.focus();
  };

  const handleRemoveParticipant = (userId: string) => {
    const updatedParticipants = selectedParticipants.filter(user => user.id !== userId);
    setSelectedParticipants(updatedParticipants);
    onParticipantsChange(updatedParticipants);
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDocumentClick = (e: MouseEvent) => {
    if (
      !listRef.current?.contains(e.target as Node) &&
      !inputRef.current?.contains(e.target as Node) &&
      !containerRef.current?.contains(e.target as Node)
    ) {
      setIsListOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative max-h-[5rem]">
      <div
        onClick={handleContainerClick}
        className="flex flex-wrap items-center w-[36.25rem] h-full border border-gray-400 rounded-xl overflow-auto"
      >
        <div className="absolute justify-start items-center inline-flex top-3">
          <div className="text-gray-400 text-sm font-normal font-ttcommons leading-none pl-4">
            Участники
          </div>
        </div>
        <div className={`flex flex-wrap space-x-2 gap-2 px-4 pt-8 ${!isListOpen && 'h-[4.5rem]'}`}>
          {selectedParticipants.map(user => (
            <div
              key={user.id}
              className="relative h-[1.875rem] inline-flex justify-center items-center group bg-zinc-100 border rounded-3xl"
            >
              <Participant participant={user} />
              <span
                className="absolute right-0 text-2xl leading-none bg-gradient-to-l from-zinc-100 to-zinc-100 rounded-tr-xl rounded-br-xl cursor-pointer text-gray-300 hidden group-hover:block"
                onClick={() => handleRemoveParticipant(user.id)}
              >
                &#10006;
              </span>
            </div>
          ))}
          {isListOpen && (
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              ref={inputRef}
              onFocus={() => setIsListOpen(true)}
              className="pt-2.5 pb-4 w-40 h-10 rounded focus:outline-none"
            />
          )}
          <div className="absolute top-full -left-2 w-full z-50">
            {isListOpen && (
              <ul
                ref={listRef}
                className="w-80 max-h-60 px-2 pt-2 pb-2 bg-white rounded-2xl border border-gray-400 shadow overflow-y-auto"
              >
                {filteredUsers.map(user => (
                  <li
                    key={user.id}
                    className="cursor-pointer hover:bg-gray-100 p-2 rounded-2xl"
                    onClick={() => handleParticipantClick(user)}
                  >
                    <Participant participant={user} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantSelect;