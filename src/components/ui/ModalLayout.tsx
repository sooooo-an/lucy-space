import React from "react";
import CloseIcon from "./icons/CloseIcon";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function ModalLayout({ children, onClose }: Props) {
  const onClickBackground = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <section
      className="fixed top-0 left-0 flex flex-col justify-center items-center w-full h-full z-1 bg-neutral-900/70"
      onClick={onClickBackground}
    >
      <div className="bg-white w-[450px] max-h-[500px] h-auto relative rounded-md">
        <button
          className="absolute top-0 right-0 p-5 text-2xl text-gray-400"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
        {children}
      </div>
    </section>
  );
}
