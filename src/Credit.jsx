import React from "react";

export const Credit = () => {
  return (
    <div className="fixed bottom-0 left-0 p-4  text-neutral-300 font-medium text-xs md:text-sm">
      Created by{" "}
      <a
        href="https://github.com/ebrahim-ramadan"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:underline"
      >
        Ebrahim Ramadan
      </a>
    </div>
  );
};

export default Credit;