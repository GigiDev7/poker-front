import { useState } from "react";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return { isOpen, showModal, hideModal, toggle };
};
