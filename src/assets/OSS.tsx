import { Github } from "lucide-react";
import React from "react";

export const OSS = () => {
  return (
    <div className="fixed top-0 right-0 p-4 ">
      <a
        href="https://github.com/Ebrahim-Ramadan/punycode-BUSTED"
        target="_blank"
        rel="noopener noreferrer"
        className="text-black dark:text-white hover:underline"
      >
        <Github className="hover:scale-110 transition-transform duration-200 ease-in-out" />
      </a>
    </div>
  );
};

export default OSS;