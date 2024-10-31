import React, { useState, useEffect, useMemo } from "react";
import AuthInputBox from "./AuthInputBox";
import { LOGIN_INPUTS, SIGNUP_INPUTS, getInitialState } from "@/types/auth";
import usePreview from "@/hooks/usePreview";
import Avatar from "../ui/Avatar";
import { uploadImage } from "@/services/upload";
import { useAuth } from "@/contexts/AuthContext";

type Props = {
  showSignup: boolean;
  toggleView: () => void;
};

export default function LoginForm({ showSignup, toggleView }: Props) {
  const inputs = showSignup ? SIGNUP_INPUTS : LOGIN_INPUTS;
  const INITIAL_STATE = useMemo(() => getInitialState(inputs), [inputs]);

  const [values, setValues] = useState(INITIAL_STATE);
  const [error, setError] = useState<string | null>(null);
  const { preview, handlePreview, removePreview } = usePreview();
  const { login } = useAuth();

  useEffect(() => {
    setValues(INITIAL_STATE);
    removePreview();
  }, [INITIAL_STATE]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files, type } = e.target;
    if (name === "passwordConfirm") {
      if (value !== values.password) {
        setError("비밀번호가 일치하지 않습니다.");
      } else {
        setError("");
      }
    }

    if (type === "file") {
      if (!files?.length) return;

      uploadImage(files[0]).then((url) => {
        handlePreview(url);
      });
    }

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (showSignup) {
      const body = {
        name: values.name,
        password: values.password,
        thumbnail: preview,
      };
      fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then(console.log);
    } else {
      login(values.name, values.password);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center justify-center flex-col h-full px-4 relative py-12"
    >
      <h3 className="text-lg font-bold text-gray-700 pb-1">
        {showSignup ? "테스트용 회원가입" : "테스트용 로그인"}
      </h3>

      {!showSignup && (
        <p className="text-sm text-center">
          프로젝트를 테스트하기 위해서는 테스트용 계정이 필요합니다.
        </p>
      )}

      {preview && <Avatar image={preview} alt="thumbnail" size="lg" />}

      <ul className="w-full pt-4">
        {inputs.map((input) => (
          <AuthInputBox
            key={input.id}
            item={input}
            value={values[input.name] ?? ""}
            onChange={onChange}
          />
        ))}
      </ul>

      <button
        type="submit"
        className="h-12 w-full mt-2 mb-1 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600"
      >
        {showSignup ? "SignUp" : "Login"}
      </button>
      {error && (
        <span className="text-xs text-red-600 font-semibold">{error}</span>
      )}

      <button
        type="button"
        onClick={toggleView}
        className="text-sm text-gray-500 hover:underline absolute bottom-5"
      >
        {showSignup ? "이미 계정이 있으신가요?" : "아직 계정이 없으신가요?"}
      </button>
    </form>
  );
}
