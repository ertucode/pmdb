import type { NextComponentType, NextPageContext } from "next";
import { AppSvgProps } from "./svg-props";

interface Props extends AppSvgProps {}

const Plus: NextComponentType<NextPageContext, {}, Props> = (props: Props) => {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      {...props}
      role="img"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M9 17a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 10-2 0v6H3a1 1 0 000 2h6v6z"
      />
    </svg>
  );
};

export default Plus;
