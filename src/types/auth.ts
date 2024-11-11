export type InputData = {
  label: string;
  type: string;
  name: string;
  id: string;
  required?: boolean;
  placeholder?: string;
};

export type SignupInputData = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
};

export type LoginInputData = {
  email: string;
  password: string;
};
