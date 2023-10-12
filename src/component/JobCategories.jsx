import React, { useState, useEffect } from "react";
import axios from "axios";
import { Rings } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import JobCard from "./JobCard";

const JobCategories = () => {
  const [activeCategory, setActiveCategory] = useState(
    "Information Technology"
  );
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleCategoryClick = (category) => {
    setLoading(true);
    setData([]);
    setActiveCategory(category);
    findJobCategory(category);
  };

  const categories = [
    "Information Technology",
    "Healthcare",
    "Finance",
    "Engineering",
    "Government",
  ];

  const findJobCategory = async (category) => {
    // Show loader
    setLoading(true);
    try {
      const res = await axios.get("https://jsearch.p.rapidapi.com/search", {
        params: {
          query: category,
          page: "1",
          num_pages: "1",
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

  useEffect(() => {
    findJobCategory(activeCategory);
  }, []);

  const showSuccessAlert = () => toast.success("Search successful!");

  const showErrorAlert = () =>
    toast.error("Search failed. Please try again later.");

  return (
    <>
      <div className="button-container flex-row items-center justify-center gap-5 my-20 pb-5 border-b lg:m-20 sm:flex-col">
        <h2 className="text-[#323232] font-extrabold capitalize my-10 inline-block text-4xl">
          Top Job Categories
        </h2>
        <div className="flex flex-wrap">
          {categories.map((category) => (
            <ButtonTab
              key={category}
              value={category}
              isActive={category === activeCategory}
              onClick={() => handleCategoryClick(category)}
              className="responsive-button"
            />
          ))}
        </div>
      </div>

      <div>
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
        ) : loading ? (
          <div className="loader-container flex items-center justify-center py-10">
            <Rings color="#6366F1" height={70} width={70} timeout={5000} />
          </div>
        ) : (
          <h2 className="text-blue-800 font-medium mb-5">
            0 Search Results Found:
          </h2>
        )}
      </div>
    </>
  );
};

const ButtonTab = ({ value, isActive, onClick }) => {
  return (
    <button
      type="button"
      className={`border ${
        isActive
          ? "bg-indigo-500 text-white"
          : "border-indigo-500 bg-white text-indigo-500"
      } rounded-md px-4 py-2 m-2 transition duration-500 ease cursor-pointer hover:bg-indigo-600 focus:outline-none focus:shadow-outline hover:text-white
      sm:px-2 sm:py-1 sm:text-sm md:px-3 md:py-2 md:text-base flex-grow`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default JobCategories;
