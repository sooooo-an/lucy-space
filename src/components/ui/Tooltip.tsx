import React, { useState } from "react";
import ReactDOM from "react-dom";

type Props = {
  children: React.ReactNode;
  tooltipText: string;
  position: "top" | "bottom" | "left" | "right";
};

export default function Tooltip({
  children,
  tooltipText,
  position = "top",
}: Props) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (event: React.MouseEvent) => {
    setVisible(true);
    const rect = event.currentTarget.getBoundingClientRect();
    setCoords({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    });
  };

  const handleMouseLeave = () => setVisible(false);

  const renderTooltip = () => {
    if (!visible) return null;

    const style = {
      top: position === "top" ? coords.top - 40 : coords.top + 25,
      left: coords.left,
    };

    return ReactDOM.createPortal(
      <span className={`${TOOLTIP_STYLES} ${position}`} style={style}>
        {tooltipText}
      </span>,
      document.body
    );
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      {children}
      {renderTooltip()}
    </div>
  );
}

const TOOLTIP_STYLES =
  "w-[300px] fixed z-10 bg-black/80 text-white text-sm p-2 rounded-md";
