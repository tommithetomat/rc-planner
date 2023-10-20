import React, { useState, useEffect } from "react";
import { Participant } from "./components/Participant";
import { EventInfoModalProps } from "./Event";
interface EventParticipantsProps {
  participants: EventInfoModalProps["event"]["participants"];
  owner: EventInfoModalProps["event"]["participants"][0]["id"];
}

export const EventParticipants: React.FC<EventParticipantsProps> = ({
  participants,
  owner,
}) => {
  const sortedParticipants = [...participants];
  const ownerIndex = sortedParticipants.findIndex(
    (participant) => participant.id === owner
  );

  if (ownerIndex !== -1) {
    const ownerParticipant = sortedParticipants.splice(ownerIndex, 1)[0];
    sortedParticipants.unshift(ownerParticipant);
  }

  const maxVisibleUsers = 5;
  const maxHiddenUsers = 3;
  const [visibleParticipants, setVisibleParticipants] = useState(
    sortedParticipants.slice(0, maxVisibleUsers)
  );
  const [hiddenParticipants, setHiddenParticipants] = useState(
    sortedParticipants.slice(
      maxVisibleUsers,
      maxVisibleUsers + maxHiddenUsers
    )
  );

  useEffect(() => {
    setVisibleParticipants(sortedParticipants.slice(0, maxVisibleUsers));
    setHiddenParticipants(
      sortedParticipants.slice(
        maxVisibleUsers,
        maxVisibleUsers + maxHiddenUsers
      )
    );
  }, [participants]);

  return (
    <div className="mt-10 mx-16">
      <h3 className="text-xl font-semibold mb-2 font-redcollar">
        Участники:
      </h3>
      <div className="flex overflow-hidden mt-6 justify-between">
        {visibleParticipants.map((participant) => (
          <Participant
            key={participant.id}
            participant={participant}
            author={participant.id === owner}
          />
        ))}
        {hiddenParticipants.length > 0 && (
          <div className="flex flex-row items-center">
            {hiddenParticipants.map((participant) => (
              <div key={participant.id} className="flex flex-row -ml-10">
                <Participant
                  participant={participant}
                  author={participant.id === owner}
                  onlyImg
                />
              </div>
            ))}
            <div className="z-0 bg-white px-4 py-2">
              Еще +{participants.length - visibleParticipants.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};