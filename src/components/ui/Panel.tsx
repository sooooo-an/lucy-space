import React from "react";

type Props = {
  children: React.ReactNode;
  title: string;
};

export default function Panel({ children, title }: Props) {
  return (
    <section className="w-full mb-16 ">
      <h3
        className="relative font-bold text-xl px-1 inline"
        style={{
          background:
            "linear-gradient(rgba(0, 0, 0, 0) 66%, rgb(192 132 252) 33%)",
        }}
      >
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}
