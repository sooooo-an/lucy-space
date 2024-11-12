export type BuilderResponseType = {
  builder: BuilderType;
};

export type BuilderType = {
  header: BuilderHeader;
  body: BuilderBody;
  footer: BuilderFooter;
};

type BuilderHeader = {
  title: string;
  app_id: string;
};

type BuilderBody = {
  elements: BuilderBodyElement[];
};

type BuilderBodyElement = {
  type: string;
  items: BuilderItem[];
};

type BuilderItem = InputTypeItem | DropdownTypeItem | ListTypeItem;

type InputTypeItem = {
  type: "input";
  label: string;
  input: {
    id: string;
    options: OptionType[];
  };
};

type ListTypeItem = {
  type: "list";
  label: string;
  list: {
    id: string;
    options: OptionType[];
  };
};

type DropdownTypeItem = {
  type: "dropdown";
  label: string;
  dropdown: {
    id: string;
    options: OptionType[];
  };
};

type OptionType = {
  type: string;
  placeholder: string;
  id: string;
};

type BuilderFooter = {
  buttons: BuilderButton[];
};

type BuilderButton = {
  type: string;
  label: string;
  style: "primary" | "secondary" | "primary_full" | "secondary_full";
  action_id: string;
};
