export type InputData = {
  label: string;
  type: string;
  name: string;
  id: string;
  required?: boolean;
  placeholder?: string;
};

export type SignupInputData = {
  name: string;
  password: string;
  thumbnail: string;
};

export type LoginInputData = {
  name: string;
  password: string;
};

export const LOGIN_INPUTS: InputData[] = [
  {
    label: "닉네임",
    type: "text",
    placeholder: "닉네임을 작성해주세요.",
    name: "name",
    id: "name",
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
    label: "프로필 이미지",
    type: "file",
    name: "thumbnail",
    id: "thumbnail",
    required: false,
  },
  {
    label: "닉네임",
    type: "text",
    placeholder: "닉네임을 작성해주세요.",
    name: "name",
    id: "name",
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
  {
    label: "비밀번호 확인",
    type: "password",
    placeholder: "비밀번호를 다시 한번 작성해주세요.",
    name: "passwordConfirm",
    id: "passwordConfirm",
    required: true,
  },
];

export const getInitialState = (inputs: InputData[]) => {
  return inputs.reduce(
    (acc: { [key: string]: string }, input) => ({
      ...acc,
      [input.name]: "",
    }),
    {}
  );
};
