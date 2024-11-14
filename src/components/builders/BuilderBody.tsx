import { BuilderType } from "@/types/builder";
import React from "react";

type Props = {
  body: BuilderType["body"];
};

export default function BuilderBody({ body }: Props) {
  return (
    <div className="body pt-4">
      {body.elements.map((element, index) => {
        if (element.type === "info_card") {
          return element.items.map((item, idx) => {
            if (item.type === "list") {
              return (
                <div className="menu" key={`${index}-${idx}`}>
                  <h2>{item.label}</h2>
                  <ul id={item.list.id}>
                    {item.list.options.map((option) => (
                      <li key={option.id} data-id={option.id}>
                        {option.text}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }
            return null;
          });
        }
        return null;
      })}
    </div>
  );
}
