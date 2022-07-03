import React from "react";
import { FaGreaterThan } from "react-icons/fa";

function Container({
  list,
  handleCheck,
  setOpen,
  open,
  removeContactHandler,
  editItem,
}) {
  return (
    <div className="bg-sky-100">
      <div className="flex space-x-10 px-2 items-center py-3 border-y border-gray-300 mx-40 bg-white ">
        <div className="flex space-x-2 items-center">
          <input
            className="mt-2"
            type="checkbox"
            id="vehicle1"
            name="vehicle1"
            value="Bike"
          />
          <h1 className="">prospect Name</h1>
        </div>
        <div className="flex grow justify-between ">
          <h1>Demographic</h1>
          <h1>Source</h1>
          <h1>Added By</h1>
          <h1>Date Added</h1>
          <h1>Set Type</h1>
          <h1>How Many</h1>
          <h1>Details</h1>
        </div>
      </div>

      {list?.map((items, index) => {
        const { id, name, demographic, source, add, date, set, how, detail } =
          items;
        return (
          <div
            key={id}
            className={`flex space-x-24 px-2 items-center  py-3 border-y border-gray-300 mx-40 ${
              index % 2 === 0 ? "bg-sky-100" : "bg-white"
            }`}
          >
            <div className="flex space-x-2 items-center  ">
              <input
                className=""
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                value={id}
                checked={items.isChecking}
                onChange={(e) => handleCheck(e)}
              />
              <h1 className="">{name}</h1>
            </div>
            <div className="flex grow justify-between ">
              <h1 className="">{demographic}</h1>
              <h1>{source}</h1>
              <h1>{add}</h1>
              <h1>{date}</h1>
              <h1>{set}</h1>
              <h1 className="text-pink-500">{how}</h1>
              <h1 className="text-green-500">{detail}</h1>
            </div>
          </div>
        );
      })}
      <div className="flex  space-x-20 items-center py-3 border-y border-gray-300 mx-40 bg-sky-100">
        <button className="font-bold grow" onClick={() => setOpen(!open)}>
          Add Prospect Set
        </button>
        <button className="grow" onClick={removeContactHandler}>
          Delete Prospect Set
        </button>
        <button onClick={editItem}>Edit Prospect Set</button>
        <button className="font-bold grow">Import Prospect Set</button>
        <p className="flex space-x-2">
          <p>1</p>
          <p>2</p>
          <p>3</p>

          <FaGreaterThan className="h-4 w-2 mt-1" />
        </p>
      </div>
    </div>
  );
}

export default Container;
