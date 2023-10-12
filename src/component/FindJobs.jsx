import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Rings } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JobCard from "../component/JobCard";
import ReactPaginate from "react-paginate";

//logos
import googleLogo from "../assets/google.svg";
import microsoftLogo from "../assets/microsoft.svg";
import facebookLogo from "../assets/facebook.svg";
import slackLogo from "../assets/slack.svg";
import JobCategories from "./JobCategories";

const FindJobs = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the component mounts or reloads
  }, []);

  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // pagination usestate
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(10); // Number of items per page
  // const [pageCount, setPageCount] = useState(0);
  const [activePage, setActivePage] = useState(0);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    setLoading(true); // Set loading state to true when changing pages
    setData([]);
    setActivePage(selected);
    findJobs(selected);
  };

  const offset = currentPage * perPage;
  const currentData = data.slice(offset, offset + perPage);

  //fetching data
  const findJobs = async () => {
    //show loader
    setLoading(true);
    try {
      const pageTOSend = currentPage + 1;
      const res = await axios.get("https://jsearch.p.rapidapi.com/search", {
        params: {
          query: query,
          page: (pageTOSend + 1).toString(),
        },
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_JSEARCH_API_KEY,
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
      });
      setData(res.data.data);
      setLoading(false);
      showSuccessAlert();
    } catch (err) {
      console.error(err);
      setLoading(false);
      showErrorAlert();
    }
  };

  const showSuccessAlert = () => toast.success("Search successful!");

  const showErrorAlert = () =>
    toast.error("Search failed. Please try again later.");

  return (
    <>
      <div className="bg-white">
        <div className="relative isolate px-6 lg:px-8">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="mx-auto max-w-2xl py-28 sm:py-48 lg:py-24 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Find your <span className="text-blue-600">best job</span> with
                us
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Searching for a new job in 2023? you are always one click <br />
                away from your dream job.
              </p>
              <div className="max-w-xl lg:max-w-lg">
                <div className="mt-6 flex items-center justify-center max-w-lg gap-x-4">
                  <label htmlFor="email-address" className="sr-only">
                    Search Jobs
                  </label>
                  <input
                    id="job-query"
                    name="jobquery"
                    type="text"
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                    required
                    className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2.5 text-black shadow-lg ring-1 ring-inset focus:ring-0 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6 caret-black"
                    placeholder="Software Developer in Texas, USA"
                  />
                  <button
                    type="submit"
                    onClick={findJobs}
                    className="flex-none rounded-md bg-indigo-500 px-8 py-3 text-sm font-semibold text-white shadow-lg hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* JobCard */}
          {Array.isArray(data) && data.length > 0 ? (
            <div>
              <h2 className="text-blue-800 font-medium mb-5">
                {data.length} Search Results Found:
              </h2>
              <div className="flex flex-wrap justify-center text-start gap-5 pb-10">
                {data.map((items) => (
                  <div
                    key={items.job_id}
                    className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-xl"
                  >
                    <JobCard item={items} />
                  </div>
                ))}
              </div>
            </div>
          ) : loading ? ( // Check if loading is true
            <div className="loader-container flex items-center justify-center py-10">
              <Rings color="#6366F1" height={70} width={70} timeout={5000} />
            </div>
          ) : (
            <h2 className="text-blue-800 font-medium mb-5">
              0 Search Results Found:
            </h2>
          )}

          {/* pagination */}
          {data.length > 0 && (
            <div className="pagination-container m-10">
              <ReactPaginate
                previousLabel={"Prev"}
                nextLabel={"Next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={100}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={
                  "pagination flex flex-wrap gap-3 justify-center mt-4 sm:space-x-5"
                }
                subContainerClassName={"pages pagination flex gap-2 rounded-md"}
                forcePage={activePage}
                activeClassName={"bg-blue-600 text-white"}
                previousClassName={
                  "px-3 py-1 cursor-pointer rounded bg-white-500 border border-blue-500 hover:bg-blue-500 hover:text-white"
                }
                nextClassName={
                  "px-3 py-1 cursor-pointer rounded bg-white-500 border border-blue-500 hover:bg-blue-500 hover:text-white"
                }
                pageClassName={
                  "px-3 py-1 cursor-pointer rounded bg-white-500 border border-blue-500 hover:bg-blue-500 hover:text-white"
                }
              />
            </div>
          )}

          <div className="container flex justify-center items-center">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full px-4">
                <div className="flex flex-wrap items-center justify-center gap-14 mt-10">
                  <SingleImage
                    href="#"
                    Alt="Google Image"
                    imgSrc={googleLogo}
                  />
                  <SingleImage
                    href="#"
                    Alt="Accenture Image"
                    imgSrc={slackLogo}
                  />
                  <SingleImage
                    href="#"
                    Alt="Amazon Image"
                    imgSrc={facebookLogo}
                  />
                  <SingleImage
                    href="#"
                    Alt="facebook Image"
                    imgSrc={microsoftLogo}
                  />
                </div>
              </div>
            </div>
          </div>
          <JobCategories />
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default FindJobs;

const SingleImage = ({ href, imgSrc, Alt }) => {
  return (
    <>
      <a
        href={href}
        className="mx-4 flex w-[150px] items-center justify-center  2xl:w-[180px]"
      >
        <img src={imgSrc} alt={Alt} className="w-full object-contain" />
      </a>
    </>
  );
};
