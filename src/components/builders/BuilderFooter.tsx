import { useBuilderModal } from "@/contexts/BuilderModalContext";
import { BuilderType } from "@/types/builder";
import React from "react";
import Button from "../ui/Button";

type Props = {
  footer: BuilderType["footer"];
};

export default function BuilderFooter({ footer }: Props) {
  const { onClickAction } = useBuilderModal();
  return (
    <footer className="pt-4">
      <div className="buttons flex gap-2">
        {footer.buttons.map((button) => (
          <Button
            onClick={() => onClickAction(button.action_id)}
            key={button.action_id}
            text={button.label}
            color={button.style}
            type="submit"
          />
        ))}
      </div>
    </footer>
  );
}
