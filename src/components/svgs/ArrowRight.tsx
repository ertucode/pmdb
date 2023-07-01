import type { NextComponentType, NextPageContext } from "next";
import { AppSvgProps } from "./svg-props";

interface Props extends AppSvgProps {}

const ArrowRight: NextComponentType<NextPageContext, {}, Props> = (
  props: Props
) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9 7L14 12L9 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowRight;
