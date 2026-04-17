import React from "react";

const TopText = ({ subtitle, title }: { subtitle: string; title: string }) => {
  return (
    <div>
      <p className="mb-1.5 text-sm uppercase tracking-[0.25em] primary-text">
        {subtitle}
      </p>
      <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl primary-text -ml-0.5">
        {title}
      </h2>
    </div>
  );
};

export default TopText;
