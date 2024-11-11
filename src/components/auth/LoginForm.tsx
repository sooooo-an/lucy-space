import React, { FormEvent, useState } from "react";
import AuthInputBox from "./AuthInputBox";
import { LoginInputData } from "@/types/auth";
import { useAuth } from "@/contexts/AuthContext";
import useForm from "@/hooks/useForm";
import { LOGIN_INPUTS } from "@/constants/login-form";
import Button from "../ui/Button";
import { ResponseError } from "@/utils/ResponseError";

type Props = {
  onClose: () => void;
};

export default function LoginForm({ onClose }: Props) {
  const { values, handleChange } = useForm<LoginInputData>({
    initialValues: { email: "", password: "" },
  });
  const { login } = useAuth();
  const [error, setError] = useState<null | ResponseError>(null);
  const DISABLED = !values.email || !values.password;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    login(values.email, values.password).then(onClose).catch(setError);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center justify-center flex-col h-full px-4 relative py-12"
    >
      <h3 className="text-lg font-bold text-gray-700 pb-1">테스트용 로그인</h3>

      <p className="text-sm text-center">
        프로젝트를 테스트하기 위해서는 테스트용 계정이 필요합니다.
      </p>

      <ul className="w-full pt-4">
        {LOGIN_INPUTS.map((input) => (
          <AuthInputBox
            key={input.id}
            item={input}
            value={values[input.name as keyof LoginInputData] ?? ""}
            onChange={handleChange}
          />
        ))}
      </ul>

      <Button type="submit" text="Login" color="primary" disabled={DISABLED} />

      {error && (
        <span className="text-xs text-red-600 font-semibold">
          {error.message}
        </span>
      )}
    </form>
  );
}
