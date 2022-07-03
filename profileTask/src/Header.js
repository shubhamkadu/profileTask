import React from "react";
import { MdPermContactCalendar } from "react-icons/md";

function Header({toggleTab,toggle}) {

  return (
    <div className="space-x-6 pt-12 flex justify-end mx-36 ">
      <button
        onClick={() => toggleTab(1)}
        className={`${
          toggle === 1 ? "bg-white" : "bg-purple-300"
        } rounded-t-md p-1 px-3  items-center`}
      >
        event trgger
      </button>
      <button
        onClick={() => toggleTab(2)}
        className={`${
          toggle === 2 ? "bg-white" : "bg-purple-300"
        } rounded-t-md p-1 px-3  items-center`}
      >
        Email Template
      </button>
      <button
        onClick={() => toggleTab(3)}
        className={`${
          toggle === 3 ? "bg-white" : "bg-purple-300"
        } rounded-t-md p-1 px-3  items-center`}
      >
        Prospect Set
      </button>
      <button
        onClick={() => toggleTab(4)}
        className={`${
          toggle === 4 ? "bg-white" : "bg-purple-300"
        } rounded-t-md p-1 px-3  items-center`}
      >
        Campaign
      </button>
      <MdPermContactCalendar className="h-7 w-7 text-white" />
    </div>
  );
}

export default Header;
