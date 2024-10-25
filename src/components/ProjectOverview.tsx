import React from "react";

type Props = {
  title: string;
  description: string;
};

export default function ProjectOverview({ title, description }: Props) {
  return (
    <section className="bg-white p-4 border-b border-b-gray-100">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-sm text-gray-700 pt-1">{description}</p>
    </section>
  );
}
