import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import api from "./api/users";
import { AiOutlineSearch } from "react-icons/ai";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { IoCloseCircleSharp } from "react-icons/io5";

import Header from "./Header";
import Container from "./Container";

function App() {
  const [person, setPerson] = useState({
    name: "",
    demographic: "",
    source: "",
    add: "",
    date: "",
    set: "",
    how: "",
    detail: "",
  });

  const [list, setList] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [open, setOpen] = useState(false);

  const [toggle, setToggle] = useState(3);

  const [isChecking, setIsChecking] = useState([]);

  const [search, setSearch] = useState("");

  const inputE = useRef("");

  const [searchResult, setSearchResult] = useState([]);

  const toggleTab = (index) => {
    console.log(index);
    setToggle(index);
  };

  //RetrieveData
  const retrieveUsers = async () => {
    const response = await api.get("/users");
    return response.data;
  };

  //Adding data
  const addUsersHandler = async (user) => {
    console.log(user);
    const request = {
      id: new Date().getTime().toString(),
      ...user,
    };

    const response = await api.post("/users", request);
    console.log(response.data);
    setList([...list, response.data]);
  };

  //updating data
  let updateitems = isChecking;
  const updateContactHandler = async (contact) => {
    const response = await api.put(`/users/${updateitems}`, contact);
    const { id } = response.data;
    setList(
      list.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  // deleting data
  let deleteitems = isChecking;
  const removeContactHandler = async () => {
    await api.delete(`/users/${deleteitems}`);
    const newContactList = list.filter((contact) => {
      return contact.id !== deleteitems;
    });
    setList(newContactList);
  };

  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await retrieveUsers();
      if (allUsers) {
        setList(allUsers);
      }
    };
    getAllUsers();
  }, []);

  //onchange event handling
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerson({ ...person, [name]: value });
  };

  // form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !(
        person.name ||
        person.age ||
        person.source ||
        person.set ||
        person.detail
      )
    ) {
    } else if (
      person.name &&
      person.demographic &&
      person.source &&
      person.add &&
      person.date &&
      person.set &&
      person.how &&
      person.detail &&
      isEditing &&
      isChecking
    ) {
      const newlist = list?.map((item) => {
        if (item.id === editId) {
          updateContactHandler({
            name: person.name,
            demographic: person.demographic,
            source: person.source,
            add: person.add,
            date: person.date,
            set: person.set,
            how: person.how,
            detail: person.detail,
          });
        }
        console.log(item);
        return item;
      });
      setList(newlist);
      setPerson({
        name: "",
        demographic: "",
        source: "",
        add: "",
        date: "",
        set: "",
        how: "",
        detail: "",
      });
      setIsEditing(false);
      setEditId(null);
      setOpen(false);
      setIsChecking([]);
    } else {
      const newItem = {
        name: person.name,
        demographic: person.demographic,
        source: person.source,
        add: person.add,
        date: person.date,
        set: person.set,
        how: person.how,
        detail: person.detail,
      };
      addUsersHandler(newItem);
      setList([...list, newItem]);
      setPerson({
        name: "",
        demographic: "",
        source: "",
        add: "",
        date: "",
        set: "",
        how: "",
        detail: "",
      });
      setOpen(false);
    }
  };

  const editItem = () => {
    if (isChecking) {
      const specificItem = list?.find((item) => item.id === isChecking);
      setIsEditing(true);
      setEditId(isChecking);
      setPerson(specificItem);
      setOpen(true);
    }
  };
   
  const handleCheck = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setIsChecking(value);
    } else {
      setIsChecking(0);
    }
  };


  const getSearch = () => {
    searchHandler(inputE.current.value);
  };

  const searchHandler = (search) => {
    setSearch(search);
    if (search !== "") {
      const newsearchlist = list?.filter((list) => {
        return Object.values(list)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setSearchResult(newsearchlist);
    } else {
      setSearchResult(list);
    }
  };

  return (
    <div className="App">
      {/* header */}
      <div className="bg-black  h-20 w-full">
        <Header toggleTab={toggleTab} toggle={toggle} />
      </div>
      {/* title */}
      <div className={`${toggle === 3 ? "relative" : "hidden"} `}>
        <div className="space-y-3 pt-6 mx-40">
          <h1 className="font-bold text-xl">Prospect Set</h1>
          <div className="flex space-x-8 justify-between">
            <div className="flex space-x-8">
              <h2 className="underline underline-offset-8 decoration-purple-700">
                Customer
              </h2>
              <h2>Prospect Customer</h2>
              <h2> Employee</h2>
              <h2> Test Set</h2>
            </div>

            <div className="flex">
              <label class="relative ">
                <div class="absolute inset-y-0 left-0 flex items-center pl-2">
                  <AiOutlineSearch className="h-6 w-6 text-gray-300" />
                </div>
                <input
                  class={`block  bg-white border-slate-300 w-80 border   py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-gray-500 focus:ring-gray-500 sm:text-sm`}
                  placeholder="Search Prospect Set"
                  type="text"
                  name="search"
                  value={search}
                  onChange={getSearch}
                  ref={inputE}
                />
              </label>
              <TbAdjustmentsHorizontal className="h-[38px]  w-8 bg-black text-gray-300" />
            </div>
          </div>
        </div>

        {/* containt  */}
        <div className="bg-sky-100">
          <Container
            list={search.length < 1 ? list : searchResult}
            handleCheck={handleCheck}
            setOpen={setOpen}
            open={open}
            removeContactHandler={removeContactHandler}
            editItem={editItem}
            search={search}
          />
        </div>
      </div>
      <div className={`${toggle === 1 ? null : "hidden"} `}>Event Trigger</div>
      <div className={`${toggle === 2 ? null : "hidden"} `}>Email Template</div>
      <div className={`${toggle === 4 ? null : "hidden"} `}>Campaign</div>

      <div>
        {open && (
          <div className="absolute h-[500px] w-[600px] mx-80 top-20 bg-pink-300">
            <form
              className="flex flex-col space-y-2 p-4"
              onSubmit={handleSubmit}
            >
              <button
                className="flex justify-end "
                onClick={() => setOpen(!open)}
              >
                <IoCloseCircleSharp className="h-8 w-8 text-purple-700" />
              </button>
              <h3 className="font-bold text-lg pb-4"> Add Prospect Set</h3>
              <input
                type="text"
                className="outline-none h-8 border-b-2 border-gray-500"
                placeholder="Name Prospect Set"
                id="name"
                name="name"
                value={person.name}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                className="outline-none  h-8 border-b-2 border-gray-500"
                placeholder="demographic"
                id="demographic"
                name="demographic"
                value={person.demographic}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                className="outline-none  h-8 border-b-2 border-gray-500"
                placeholder="source"
                id="source"
                name="source"
                value={person.source}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                className="outline-none  h-8 border-b-2 border-gray-500"
                placeholder="add"
                id="add"
                name="add"
                value={person.add}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                className="outline-none  h-8 border-b-2 border-gray-500"
                placeholder="date"
                id="date"
                name="date"
                value={person.date}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                className="outline-none  h-8 border-b-2 border-gray-500"
                placeholder="set"
                id="set"
                name="set"
                value={person.set}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                className="outline-none  h-8 border-b-2 border-gray-500"
                placeholder="how"
                id="how"
                name="how"
                value={person.how}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                className="outline-none  h-8 border-b-2 border-gray-500"
                placeholder="detail"
                id="detail"
                name="detail"
                value={person.detail}
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                className="flex bg-slate-500 w-40 pl-6 p-2 rounded-sm font-semibold text-sm text-white"
              >
                {isEditing ? "edit" : "Add Prospect Set"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
