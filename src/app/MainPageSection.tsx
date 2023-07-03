import type { NextComponentType, NextPageContext } from "next";
import React from "react";

interface Props {
  children: React.ReactNode;
  header: string;
}

const MainPageSection: NextComponentType<NextPageContext, {}, Props> = ({
  children,
  header,
}) => {
  const style = {
    "--indent": "1rem",
    "padding-inline": "2rem",
    "maxWidth": 'var(--max-width)'
  } as React.CSSProperties;

  return (
    <section className="w-full">
      <div
        className="bg-yellow-400 py-2 text-base text-black font-semibold w-min whitespace-nowrap"
        style={{
          ...style,
          clipPath:
            "polygon(calc(100% - var(--indent)) 0%, 100% 50%, calc(100% - var(--indent)) 100%, 0% 100%, var(--indent) 50%, 0% 0%)",
        }}
      >
        <h2>{header}</h2>
      </div>
      <div className="py-4">{children}</div>
    </section>
  );
};

export default MainPageSection;
