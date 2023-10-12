import React from "react";
import ClientLogo from "../assets/client-logo-placeholder.jpg";

function formatTimeAgo(postedDate) {
  const jobUpdatedAt = Date.parse(postedDate);

  if (!isNaN(jobUpdatedAt)) {
    const currentDate = new Date();
    const timeDifference = currentDate - jobUpdatedAt;

    // Define time intervals in milliseconds (unchanged)
    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30;

    // The rest of your time ago calculation (unchanged)

    if (timeDifference < minute) {
      return `${Math.floor(timeDifference / 1000)} seconds ago`;
    } else if (timeDifference < hour) {
      return `${Math.floor(timeDifference / minute)} minutes ago`;
    } else if (timeDifference < day) {
      return `${Math.floor(timeDifference / hour)} hours ago`;
    } else if (timeDifference < week) {
      return `${Math.floor(timeDifference / day)} days ago`;
    } else if (timeDifference < month) {
      return `${Math.floor(timeDifference / week)} weeks ago`;
    } else {
      return `${Math.floor(timeDifference / month)} months ago`;
    }
  } else {
    // Handle the case where the date is invalid or missing
    return "N/A";
  }
}
const JobCard = ({ item }) => {
  // console.log("JobCard Item:", item);
  const timeAgo = formatTimeAgo(item.job_posted_at_datetime_utc);
  return (
    <>
        <a
          href="#"
          className="relative block overflow-hidden rounded-lg border border-gray-500 p-4 sm:p-6 lg:p-8 hover:shadow-xl"
        >
          <span className="absolute inset-x-0 bottom-0 h-2"></span>

          <div className="sm:flex sm:justify-between sm:gap-4 ">
            {item.employer_logo ? (
              <img
                alt={`${item.employer_name}logo`}
                src={item.employer_logo}
                className="h-16 w-16 rounded-lg object-contain shadow-sm border"
              />
            ) : (
              <img
                alt="No Logo"
                src={ClientLogo} // Replace with the path to your static image
                className="h-16 w-16 rounded-lg object-contain shadow-sm border"
              />
            )}
          </div>

          <div className="mt-4">
            <div className="mb-3">
              <h3 className="text-md line-clamp-1 font-bold text-gray-900 sm:text-lg">
                {item.job_title}
              </h3>

              <p className="mt-1 text-xs font-medium text-gray-600">
                By {item.employer_name}
              </p>
            </div>
            <p className="max-w-[40ch] line-clamp-3 text-xs text-gray-500">
              {item.job_description}
            </p>
          </div>

          <dl className="mt-6 flex gap-4 sm:gap-6 justify-between items-center">
            <div className="flex">
              <dd className="text-xs text-gray-500">{timeAgo}</dd>
            </div>

            <div className="flex flex-col-reverse">
              <a
                className="group relative inline-flex items-center overflow-hidden rounded bg-indigo-600 px-5 py-2 text-white focus:outline-none focus:ring active:bg-indigo-500"
                href={item.job_apply_link}
              >
                <span className="absolute -end-full transition-all group-hover:end-4">
                  <svg
                    className="h-5 w-5 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
                <span
                  className="text-sm font-medium transition-all group-hover:me-4"
                  target="_blank"
                >
                  Apply
                </span>
              </a>
            </div>
          </dl>
        </a>
    </>
  );
};

export default JobCard;
