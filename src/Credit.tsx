import React from "react";

export const Credit = () => {
  return (
    <div className="fixed bottom-0 left-0 p-4 text-neutral-500 dark:text-neutral-300 font-medium text-xs md:text-sm">
      Created by{" "}

<a
        href="https://github.com/ebrahim-ramadan"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:underline"
      >
        Ebrahim Ramadan
      </a>
      <div className="before:-z-10 flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
     
</div>

    </div>
  );
};

export default Credit;