import React from "react";

type RenderByBooleanProps = {
  shouldRender: boolean;
  children: React.ReactNode;
};

export const RenderByBoolean = ({ ...props }: RenderByBooleanProps) => {
  return props.shouldRender ? props.children : null;
};
