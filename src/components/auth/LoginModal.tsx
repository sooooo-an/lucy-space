import React, { useState } from "react";
import ModalLayout from "../ui/ModalLayout";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";

type Props = {
  onClose: () => void;
};

export default function LoginModal({ onClose }: Props) {
  const [showSignUp, toggleView] = useState(false);

  return (
    <ModalLayout onClose={onClose}>
      <>
        {showSignUp ? (
          <SignUpForm onClose={onClose} />
        ) : (
          <LoginForm onClose={onClose} />
        )}
        <button
          type="button"
          onClick={() => toggleView((prev) => !prev)}
          className="text-sm text-gray-500 hover:underline absolute bottom-5 left-1/2 transform -translate-x-1/2"
        >
          {showSignUp ? "이미 계정이 있으신가요?" : "아직 계정이 없으신가요?"}
        </button>
      </>
    </ModalLayout>
  );
}
