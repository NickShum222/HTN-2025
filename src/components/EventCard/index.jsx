import { useState } from "react";
import { CiGlobe, CiLock } from "react-icons/ci";
import { IoIosList } from "react-icons/io";
import { FiLink } from "react-icons/fi";
import { motion } from "framer-motion";
import { eventCardFadeIn } from "../../utils/motion";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
// Converts date to the format: "Month Day, Hour:Minute in 24h time"
function convertDate(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  return `${months[start.getMonth()]} ${start.getDate()}, ${(
    "0" + start.getHours()
  ).slice(-2)}:${("0" + start.getMinutes()).slice(-2)} - ${(
    "0" + end.getHours()
  ).slice(-2)}:${("0" + end.getMinutes()).slice(-2)}`;

  // return `${months[temp.getMonth()]} ${temp.getDate()}, ${(
  //   "0" + temp.getHours()
  // ).slice(-2)}:${("0" + temp.getMinutes()).slice(-2)}`;
}

function removeUnderscores(str) {
  return str.replace(/_/g, " ");
}

// checks the length of the description
function checkWordLength(str) {
  return str.length > 200 ? str.slice(0, 200) + "..." : str;
}

const EventCard = ({ event, setRelatedEvents, index, loggedIn }) => {
  const {
    id,
    name,
    description,
    permission,
    event_type,
    speakers,
    start_time,
    end_time,
    related_events,
    private_url,
    public_url,
  } = event;

  const relatedEvents = [id, ...related_events];
  const [learnMore, setLearnMore] = useState(false); // Used to show more or less of the description

  return (
    <motion.div
      layout="position"
      // transition={{ duration: 0.25 }}
      variants={eventCardFadeIn}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={index}
      className="w-full flex flex-col justify-start items-start border-[2px] border-offWhite border-solid "
    >
      <div className="w-full flex justify-between items-center border-b-[2px] border-offWhite border-solid p-3">
        <div className="flex lg:flex-row flex-col justify-start lg:items-center items-start text-offWhite md:text-[30px] text-[20px] lg:leading-[1.1] leading-[1.2]">
          <h3 className="font-Satoshi ">{name}, </h3>
          <h3
            className={`opacity-80 font-SatoshiLightItalic capitalize lg:ml-2 ml-0 bg-clip-text text-transparent bg-gradient-to-r ${
              event_type === "activity"
                ? "from-[#1af8fe] to-[#6ab1ff]"
                : event_type === "workshop"
                ? "from-[#f2a64a] to-[#f2ea4a]"
                : "from-[#fd2df8] to-[#fd2d81]"
            } `}
          >
            {/* from-[#1af8fe] to-[#6ab1ff] , from-[#f2a64a] to-[#f24a4a] */}
            {removeUnderscores(event_type)}
          </h3>
        </div>
        {permission === "public" ? (
          <CiGlobe className="text-offWhite h-full lg:w-[4%] md:w-[6%] w-[7%]" />
        ) : (
          <CiLock className="text-offWhite h-full lg:w-[4%] md:w-[6%] w-[7%]" />
        )}
        {/* <div className="text-white">{permission}</div> */}
      </div>
      {description.length > 200 ? (
        !learnMore ? (
          <div className="text-offWhite font-Satoshilight opacity-80 lg:text-[20px] md:text-[22px] text-[18px] leading-[1.5] lg:px-4 px-2 py-2">
            {checkWordLength(description)}{" "}
            <span
              className="cursor-pointer ml-1 font-Satoshi hover:opacity-100 transition-all duration-200 ease-in hover:text-[#02bcf0]"
              onClick={() => {
                setLearnMore(true);
              }}
            >
              (Show More)
            </span>
          </div>
        ) : (
          <div className="text-offWhite font-Satoshilight opacity-80 lg:text-[20px] md:text-[22px] text-[18px] leading-[1.5] lg:px-4 px-2 py-2">
            {description}
            <span
              className="cursor-pointer ml-1 font-Satoshi hover:opacity-100 transition-all duration-200 ease-in hover:text-[#02bcf0]"
              onClick={() => {
                setLearnMore(false);
              }}
            >
              (Show Less)
            </span>
          </div>
        )
      ) : (
        <div className="text-offWhite font-Satoshilight opacity-80 lg:text-[20px] md:text-[22px] text-[18px] leading-[1.5] lg:px-4 px-2 py-2">
          {description}
        </div>
      )}

      {/* <div className="text-offWhite font-Satoshilight opacity-80 lg:text-[20px] md:text-[22px] text-[18px] leading-[1.5] lg:px-4 px-2 py-2">
        {checkWordLength(description)}
      </div> */}
      <div className="w-full flex md:flex-row flex-col md:justify-between justify-start items-start lg:px-4 px-2 mt-2">
        <div className="flex flex-col justify-start items-start md:mb-0 mb-4">
          <div className="font-Satoshi text-offWhite md:text-[24px] text-[20px]">
            Speakers:
          </div>
          <div className="font-Satoshilight text-offWhite lg:text-[20px] md:text-[22px] text-[18px] opacity-80 flex justify-start items-center">
            {speakers.length > 0 ? (
              speakers.map((speaker) => {
                return <div key={speaker}>{speaker.name}</div>;
              })
            ) : (
              <div>No speakers</div>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-start items-start">
          <div className="font-Satoshi text-offWhite md:text-[24px] text-[20px]">
            Event Details:
          </div>
          <div className="font-Satoshilight text-offWhite lg:text-[20px] md:text-[22px] text-[18px] opacity-80">
            {convertDate(start_time, end_time)}
            {/* {convertDate(start_time)} - {convertDate(end_time)} */}
          </div>
        </div>
      </div>
      <div className="w-full flex sm:flex-row flex-col justify-start items-center  lg:px-4 px-2 pb-4 mt-6 sm:gap-4">
        <a
          className="flex items-center gap-1 md:text-[24px] text-[20px]  font-SatoshiMedium text-offWhite opacity-70 hover:opacity-100 transition-all duration-200 ease-in"
          target="_blank"
          href={private_url !== "" && loggedIn ? private_url : public_url}
        >
          Learn More <IoIosList />
        </a>
        <div
          className="cursor-pointer flex items-center gap-1 md:text-[24px] text-[20px]  font-SatoshiMedium text-offWhite opacity-70 hover:opacity-100 transition-all duration-200 ease-in"
          onClick={() => {
            setRelatedEvents({ relatedName: name, id: relatedEvents });
          }}
        >
          Related Events
          <FiLink />
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
