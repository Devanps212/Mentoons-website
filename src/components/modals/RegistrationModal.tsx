import React, { useEffect, useRef } from "react";

import { IoClose } from "react-icons/io5";
interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  regirsterFor?: string;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  regirsterFor,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  // Close on escape key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[99999] "
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-[600px] py-10"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center items-center  relative  ">
          <div className="bg-[#FFD9AA] flex items-center justify-center p-4 rounded-full">
            <img
              src="/assets/modals/check-verified.svg"
              alt="Verifed check"
              className="w-10 h-10 object-cover "
            />
          </div>
          <button
            onClick={onClose}
            className="text-4xl text-nuetral-700 text-neutral-700 bg-white shadow-md p-1 rounded-lg absolute top-0 right-0"
          >
            <IoClose className="text-2xl" />
          </button>
        </div>

        <div className="flex items-center justify-center p-8">
          <img
            src="/assets/modals/thankyou-lettering.png"
            alt="thankyou"
            className="w-full object-cover "
          />
        </div>

        <div className="w-[80%] mx-auto text-neutral-600 font-normal  text-xl text-center leading-2  py-6">
          <p>
            `You have Successfully registered for the{" "}
            <span className="text-neutral-800 font-bold">{regirsterFor}</span>{" "}
            workshop! Stay tuned...`
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;
