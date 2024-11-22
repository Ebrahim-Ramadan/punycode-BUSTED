import { Github } from "lucide-react";
import React from "react";

export const OSS = () => {
  return (
    <div className="fixed top-0 right-0 p-4 text-neutral-500 dark:text-neutral-300 font-medium text-xs md:text-sm">
      <a
        href="https://github.com/Ebrahim-Ramadan/punycode-BUSTED"
        target="_blank"
        rel="noopener noreferrer"
        className="text-black hover:underline"
      >
        <Github/>
      </a>
    </div>
  );
};

export default OSS;