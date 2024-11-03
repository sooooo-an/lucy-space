"use client";

import LoginModal from "@/components/auth/LoginModal";
import PortalModal from "@/components/ui/PortalModal";
import { createContext, useContext, useState } from "react";

type LoginModalContextType = {
  onOpen: () => void;
  onClose: () => void;
};

const LoginModalContext = createContext<LoginModalContextType | null>(null);

export function LoginModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, toggleOpen] = useState(false);

  const onClose = () => toggleOpen(false);

  const onOpen = () => toggleOpen(true);

  return (
    <LoginModalContext.Provider value={{ onOpen, onClose }}>
      {children}
      {open && (
        <PortalModal>
          <LoginModal onClose={onClose} />
        </PortalModal>
      )}
    </LoginModalContext.Provider>
  );
}

export function useLoginModal() {
  const context = useContext(LoginModalContext);

  if (!context) {
    throw new Error("useLoginModal must be used within a LoginModalProvider");
  }

  return context;
}
