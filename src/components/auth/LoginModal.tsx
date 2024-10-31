import React, { useState } from "react";
import ModalLayout from "../ui/ModalLayout";
import LoginForm from "./LoginForm";

type Props = {
  onClose: () => void;
};

export default function LoginModal({ onClose }: Props) {
  const [showSignUp, toggleView] = useState(false);

  return (
    <ModalLayout onClose={onClose}>
      <LoginForm
        showSignup={showSignUp}
        toggleView={() => toggleView((prev) => !prev)}
      />
    </ModalLayout>
  );
}
