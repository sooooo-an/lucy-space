import { SIGNUP_INPUTS } from "@/constants/login-form";
import useForm from "@/hooks/useForm";
import usePreview from "@/hooks/usePreview";
import { SignupInputData } from "@/types/auth";
import React, { FormEvent, useState } from "react";
import AuthInputBox from "./AuthInputBox";
import Button from "../ui/Button";
import ThumbnailInputBox from "../ui/ThumbnailInputBox";
import { createUser } from "@/services/users";
import { ResponseError } from "@/utils/ResponseError";
import { useAuth } from "@/contexts/AuthContext";

type Props = {
  onClose: () => void;
};

export default function SignUpForm({ onClose }: Props) {
  const { preview, handlePreview, removePreview } = usePreview();
  const { values, handleChange } = useForm<SignupInputData>({
    initialValues: {
      email: "",
      password: "",
      nickname: "",
      passwordConfirm: "",
    },
  });
  const [error, setError] = useState<null | ResponseError>(null);
  const { updateUser } = useAuth();
  const DISABLED =
    !values.email ||
    !values.password ||
    !values.nickname ||
    !values.passwordConfirm ||
    values.password !== values.passwordConfirm;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    createUser(values, preview).then(updateUser).then(onClose).catch(setError);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center justify-center flex-col h-full px-4 relative py-12"
    >
      <h3 className="text-lg font-bold text-gray-700 pb-4">
        테스트용 회원가입
      </h3>

      <ThumbnailInputBox
        preview={preview}
        handlePreview={handlePreview}
        removePreview={removePreview}
      />

      <ul className="w-full pt-4">
        {SIGNUP_INPUTS.map((input) => (
          <AuthInputBox
            key={input.id}
            item={input}
            value={values[input.name as keyof SignupInputData] ?? ""}
            onChange={handleChange}
          />
        ))}
      </ul>

      <Button type="submit" text="SignUp" color="primary" disabled={DISABLED} />

      {error && (
        <span className="text-xs text-red-600 font-semibold">
          {error.message}
        </span>
      )}
    </form>
  );
}
