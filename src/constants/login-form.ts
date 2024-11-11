import { InputData } from "@/types/auth";

export const LOGIN_INPUTS: InputData[] = [
  {
    label: "이메일",
    type: "email",
    placeholder: "이메일을 작성해주세요.",
    name: "email",
    id: "email",
    required: true,
  },
  {
    label: "비밀번호",
    type: "password",
    placeholder: "비밀번호를 작성해주세요. (4자이상)",
    name: "password",
    id: "password",
    required: true,
  },
];

export const SIGNUP_INPUTS: InputData[] = [
  {
    label: "이메일",
    type: "email",
    placeholder: "이메일을 작성해주세요.",
    name: "email",
    id: "email",
    required: true,
  },
  {
    label: "닉네임",
    type: "name",
    placeholder: "닉네임을 작성해주세요.",
    name: "nickname",
    id: "nickname",
    required: true,
  },
  {
    label: "비밀번호",
    type: "password",
    placeholder: "비밀번호를 작성해주세요. (6자이상)",
    name: "password",
    id: "password",
    required: true,
  },
  {
    label: "비밀번호 확인",
    type: "password",
    placeholder: "비밀번호를 다시 한번 작성해주세요.",
    name: "passwordConfirm",
    id: "passwordConfirm",
    required: true,
  },
];
