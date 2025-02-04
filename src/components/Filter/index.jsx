import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../utils/AuthContext";
import { filtersButtonHor, filtersButtonVert, showFiltersAnim } from "../../utils/motion";


// Removes the underscores from the Event types
function removeUnderscores(str) {
  return str.replace(/_/g, " ");
}

const Index = (props) => {
  const { currentUser } = useAuth();
  const [showFilters, setShowFilters] = useState(false); // Used to show or hide the filters
  const { selectedFilters, search, setSearch, handleFilterChange } = props;
  // Different types of filters that can be applied
  // Additional Filters can be added here
  const filters = [
    {
      id: "visibility",
      label: "visibility",
      options: ["public", "private"],
    },
    {
      id: "eventType",
      label: "event type",
      options: ["workshop", "activity", "tech_talk"],
    },
  ];

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Filter Type Component manages the logic between each filter category and its options
  // Component was declared here to avoid prop drilling
  const FilterType = ({ filterType }) => {
    const { id, label, options } = filterType;
    return (
      <div className="w-full flex flex-col justify-between items-start py-2 z-[200] overflow-clip ">
        <div className="lg:text-[30px] md:text-[26px] text-[20px] leading-[1.8] font-Satoshilight text-offWhite opacity-80 capitalize">
          {label}
        </div>
        <div className="w-full flex flex-col justify-start items-start ">
          {options.map((option) => {
            const isChecked = selectedFilters[id].includes(option);
            return (
              <div
                key={option}
                className="w-full px-6 flex justify-start items-center cursor-pointer transition-all duration-200 ease-in hover:bg-offWhite/10 bg-opacity-10 py-1"
                onClick={() => handleFilterChange(id, option)}
              >
                <input
                  type="radio"
                  checked={isChecked}
                  onChange={() => handleFilterChange(id, option)}
                />
                <label className="lg:text-[24px] md:text-[22px] text-[18px] ml-4 capitalize font-Satoshilight text-offWhite opacity-80 cursor-pointer">
                  {removeUnderscores(option)}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      layout="position"
      className="flex flex-col  justify-start items-center  lg:w-[25%] w-full gap-0 lg:mb-0 mb-6"
    >
      <input
        type="text"
        className="border-b-[1px] focus:outline-none border-offWhite p-2 text-offWhite opacity-80 bg-transparent w-full lg:text-[30px] md:text-[26px] text-[20px] font-Satoshilight mb-4"
        placeholder="Search for events"
        value={search}
        onChange={handleSearch}
      />
      <div className="w-full flex flex-col justify-start items-center">
        <button
          className="w-full font-Satoshilight lg:text-[30px] md:text-[26px] text-[20px] flex justify-between items-center text-offWhite pr-4 pl-2 cursor-pointer border-b-[1px] border-offWhite border-solid py-2 transition-all duration-200 hover:bg-offWhite/10 ease-in"
          onClick={() => setShowFilters(!showFilters)}
        >
          <div>Show Filters</div>
          <div className="relative">
            <motion.div
              className="absolute top-1/2 left-1/2 h-[1px] w-[20px] bg-offWhite "
              variants={filtersButtonVert}
              initial="initial"
              animate={showFilters ? "animate" : "initial"}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-[1px] h-[20px] bg-offWhite "
              variants={filtersButtonHor}
              initial="initial"
              animate={showFilters ? "animate" : "initial"}
            />
          </div>
        </button>
        {/* ${
            showFilters ? "lg:h-[500px] md:h-[320px] h-[270px]" : "h-[0]"
          } */}
        <AnimatePresence mode="wait">
          {showFilters && (
            <motion.div
              variants={showFiltersAnim}
              initial="initial"
              animate="animate"
              exit="exit"
              className={`w-full px-2 flex-col justify-start items-center overflow-clip `}
            >
              {currentUser
                ? filters.map((filterType) => {
                    return (
                      <FilterType key={filterType.id} filterType={filterType} />
                    );
                  })
                : // If the user is not logged in, the visibility filter is hidden which is the 0th index of the filter array
                  filters.slice(1).map((filterType) => {
                    return (
                      <FilterType key={filterType.id} filterType={filterType} />
                    );
                  })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
export default Index;
