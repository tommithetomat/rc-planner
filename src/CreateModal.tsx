import React from "react";
import unicorn from "./img/unicorn.png";
import { Button, ButtonProps } from "./components/Buttons";

const backgroundStyle: React.CSSProperties = {
  backgroundImage: `url(${unicorn})`,
  backgroundSize: "contain",
  backgroundPosition: "calc(100% - 2.16rem) 50%",
  backgroundRepeat: "no-repeat",
};

interface CreateModalProps {
  onClose: () => void;
}

export const CreateModal: React.FC<CreateModalProps> = ({ onClose }) => {
  return (
    <div className="fixed w-full h-full top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 pl-8">
      <div
        className="w-[48.125rem] h-[31.875rem] bg-white rounded-[4rem] shadow-lg relative"
        style={backgroundStyle}
      >
        <button
          className="absolute top-10 right-10 text-[22px] leading-none text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &#10006;
        </button>
        <div className="h-full mt-[5.5rem] ml-[5rem] font-redcollar">
          <h2 className="text-[4rem]">Ура!</h2>
          <h2 className="text-[1.125rem]">Вы добавили новое событие</h2>
          <Button color="black" label={"Отлично"} onClick={onClose} />
        </div>
      </div>
    </div>
  );
};
