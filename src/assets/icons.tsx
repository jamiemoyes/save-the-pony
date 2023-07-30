import { ComponentProps } from "react";

export const Arrow: React.FC<ComponentProps<"svg">> = (props) => (
  <svg
    viewBox="0 0 6 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M3 1L1 3L3 5" stroke="white" />
  </svg>
);
