import { useEffect, useRef } from "react";

export default function useAutoScrollToBottom<T extends HTMLElement>(
  dependencies: unknown[]
) {
  const bottomRef = useRef<T>(null);

  useEffect(() => {
    if (bottomRef.current) {
      (bottomRef.current as unknown as HTMLElement).scrollIntoView({
        behavior: "smooth",
      });
    }
  }, dependencies);

  return bottomRef;
}
