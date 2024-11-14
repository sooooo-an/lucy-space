import { useState } from "react";

export default function useModalState() {
  const [open, toggleOpen] = useState(false);

  const onClose = () => toggleOpen(false);

  const onOpen = () => toggleOpen(true);

  return {
    open,
    onClose,
    onOpen,
  };
}
