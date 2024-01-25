import { RefObject, useEffect } from "react";

export const useScrollToBottom = <T extends Element>(
  element?: RefObject<T>
) => {
  const handleScrollToBottom = () => {
    if (!element || !element.current) return;

    element.current.scrollTo({
      top: element.current.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    handleScrollToBottom();
  }, []);

  return handleScrollToBottom;
};
