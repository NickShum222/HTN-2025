import React, { useEffect, useState } from "react";
import Filter from "../components/Filter";
import { EventCard } from "../components";
import { useAuth } from "../utils/AuthContext";
import { FaArrowDownLong } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

const sortAnim = {
  initial: {
    rotate: 0,
    transition: {
      duration: 0.25,
    },
  },
  animate: {
    rotate: -180,
    transition: {
      duration: 0.25,
    },
  },
};

const Events = () => {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState(null);
  const [activeSort, setActiveSort] = useState(false);

  // Different options for sorting the events
  const sortOptions = [
    {
      name: "Date, New to Old",
      by: "date",
      order: "asc",
    },
    {
      name: "Date, Old to New",
      by: "date",
      order: "desc",
    },
    {
      name: "Name, A to Z",
      by: "name",
      order: "asc",
    },
    {
      name: "Name, Z to A",
      by: "name",
      order: "desc",
    },
  ];
  // State for the selected filters
  const [selectedFilters, setSelectedFilters] = useState({
    visibility: [],
    eventType: [],
  });
  // State for the sorting options
  const [sorted, setSorted] = useState({
    by: "date",
    order: "asc",
    name: "Date, New to Old",
  });
  // State for the search bar
  const [search, setSearch] = useState("");
  // State for the related events
  const [relatedEvents, setRelatedEvents] = useState({
    id: [],
    relatedName: "",
  });

  const [loading, setLoading] = useState(true); // Loading state for the events

  const handleFilterChange = (id, option) => {
    const newSelectedFilters = {
      ...selectedFilters, // Clones the selectedFilters object
      [id]: selectedFilters[id].includes(option) // checks if the option is already in the array
        ? selectedFilters[id].filter((filter) => filter !== option)
        : [...selectedFilters[id], option],
    };
    setSelectedFilters(newSelectedFilters);
  };

  useEffect(() => {
    fetch("https://api.hackthenorth.com/v3/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      });
  }, []);

  // Main logic used to filter the events based on the selected filters
  useEffect(() => {
    if (events) {
      setLoading(true);
      let filtered = events;

      if (currentUser === null) {
        filtered = filtered.filter((event) => event.permission === "public");
      }
      // Sort Logic
      if (sorted.by === "date") {
        filtered = filtered.sort((a, b) => {
          return sorted.order === "asc"
            ? new Date(a.start_time) - new Date(b.start_time)
            : new Date(b.start_time) - new Date(a.start_time);
        });
      }
      if (sorted.by === "name") {
        filtered = filtered.sort((a, b) => {
          return sorted.order === "asc"
            ? a[sorted.by].localeCompare(b[sorted.by])
            : b[sorted.by].localeCompare(a[sorted.by]);
        });
      }

      if (relatedEvents.id.length > 0) {
        filtered = filtered.filter((event) =>
          relatedEvents.id.includes(event.id)
        );
        // Sorts the related events in the order they are in the relatedEvents array
        filtered = filtered.sort((a, b) => {
          return (
            relatedEvents.id.indexOf(a.id) - relatedEvents.id.indexOf(b.id)
          );
        });
      }
      if (selectedFilters.visibility.length > 0 && currentUser !== null) {
        filtered = filtered.filter((event) =>
          selectedFilters.visibility.includes(event.permission)
        );
      }
      if (selectedFilters.eventType.length > 0) {
        filtered = filtered.filter((event) =>
          selectedFilters.eventType.includes(event.event_type)
        );
      }
      if (search) {
        filtered = filtered.filter((event) =>
          event.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      setActiveSort(false); // Closes the sort dropdown, couldn't include it in the OnClick event for some reason
      setLoading(false);
      setFilteredEvents(filtered);
    }
  }, [events, selectedFilters, search, sorted, relatedEvents, currentUser]);

  return (
    <div className=" min-h-[100dvh] w-full flex flex-col justify-start items-center relative z-10 py-24">
      <div className="w-full border-b-[1px] border-offWhite border-solid py-2 flex sm:flex-row flex-col sm:justify-between justify-start sm:items-center items-start text-offWhite px-2 mb-6">
        <div className="font-Satoshibold tracking-tight leading-[1.2] lg:text-[45px] md:text-[40px] text-[38px]">
          Current Events
        </div>
        {!currentUser && (
          <div className="text-offWhite font-Satoshi lg:text-[24px] md:text-[22px] text-[20px] z-20 relative">
            <a
              className="font-Satoshibold cursor-pointer relative z-[40] mr-2 opacity-100"
              href="/sign-up"
            >
              <span className="z-[50] relative font-SatoshiItalic ">
                Log In
              </span>
              <span className="absolute inset-x-0 bottom-[10%] -z-1 bg-opacity-10 bg-gradient-to-r from-[#F2A64A] via-[#FD2DF8] to-[#1AF8FE] from-[20%] via-[50%] to-[90%] md:h-[3px] h-[1px] w-full" />
            </a>
            <span className="opacity-90">to see our private events!</span>
          </div>
        )}
      </div>
      {/* Filters & Events */}
      <LayoutGroup>
        <motion.div
          layout="position"
          className="flex lg:flex-row flex-col lg:justify-between justify-start items-start w-full relative"
        >
          <Filter
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            search={search}
            setSearch={setSearch}
            handleFilterChange={handleFilterChange}
          />
          <div className="flex flex-col justify-start items-start lg:w-2/3 w-full">
            {filteredEvents ? (
              <motion.div
                layout="position"
                className="w-full flex md:flex-row flex-col md:justify-between justify-start items-start md:items-center mb-1 max-md:w-full"
              >
                {/* Header section of the events */}
                <div className="flex md:flex-row flex-col-reverse md:justify-start md:items-center md:gap-3 ">
                  <div className="text-offWhite lg:text-[20px] text-[18px] opacity-60 font-SatoshiLightItalic md:inline hidden">
                    {filteredEvents.length} events
                  </div>
                  {relatedEvents.id.length > 0 && (
                    <div
                      className="underline text-offWhite lg:text-[20px] text-[18px] opacity-60 font-SatoshiLight cursor-pointer flex items-center"
                      onClick={() =>
                        setRelatedEvents({ id: [], relatedName: "" })
                      }
                    >
                      Related to "{relatedEvents.relatedName}"
                      <RxCross2 className="ml-1" />
                    </div>
                  )}
                </div>
                <div className="relative max-md:w-full max-md:flex justify-between items-center">
                  <div className="text-offWhite lg:text-[20px] text-[18px] opacity-60 font-SatoshiLightItalic md:hidden inline">
                    {filteredEvents.length} events
                  </div>
                  {/* Sort Filters */}
                  <div
                    className="font-SatoshiMedium lg:text-[20px] text-[18px] text-offWhite  cursor-pointer flex items-center float-end"
                    onClick={() => setActiveSort(!activeSort)}
                  >
                    {sorted.name}
                    <motion.div
                      variants={sortAnim}
                      initial="initial"
                      animate={activeSort ? "animate" : "initial"}
                      className="text-[0.8em] ml-1"
                    >
                      <FaArrowDownLong className="text-offWhite" />
                    </motion.div>
                  </div>
                  {/* Dropdown menu of the sort function */}
                  {activeSort && (
                    <div className="absolute top-[100%] right-0 bg-transparent backdrop-blur-2xl border-solid border-offWhite border-[1px] shadow-lg p-2 z-20 whitespace-nowrap ">
                      {sortOptions.map((option) => {
                        return (
                          <div
                            key={option.name}
                            className="mr-10 cursor-pointer text-opacity-80 hover:text-opacity-100 duration-200 transition-all text-offWhite text-[20px] font-SatoshiMedium"
                            onClick={() => {
                              setSorted({
                                by: option.by,
                                order: option.order,
                                name: option.name,
                              });
                            }}
                          >
                            {option.name}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="text-offWhite text-[24px] opacity-60">
                Loading events...
              </div>
            )}
            {/* Events */}
            <motion.div
              layout
              className="w-full flex flex-col justify-start items-start gap-4"
            >
              <AnimatePresence mode="popLayout">
                <LayoutGroup>
                  {!loading && filteredEvents ? (
                    filteredEvents.map((event, index) => {
                      return (
                        <EventCard
                          key={event.id}
                          event={event}
                          index={index}
                          loggedIn={currentUser !== null}
                          setRelatedEvents={setRelatedEvents}
                        />
                      );
                    })
                  ) : (
                    <div className="text-offWhite">Loading...</div>
                  )}
                </LayoutGroup>
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </LayoutGroup>
    </div>
  );
};

export default Events;
