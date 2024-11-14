export type UIColorType =
  | "primary"
  | "secondary"
  | "danger"
  | "primary_outline"
  | "secondary_outline"
  | "dander_full";

export type InputData = {
  label: string;
  type: string;
  name: string;
  id: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
};
