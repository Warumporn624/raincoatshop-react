import React from "react";
import { NavLink } from "react-router-dom";
// import Search from '../Search'
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MiddleNav = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

  const handleHistory = (e) => {
    if (user) {
      navigate("/user/history");
    } else {
      toast.error("กรุณาล็อคอิน");
    }
  };

  const handleWishlist = (e) => {
    if (user) {
      navigate("/user/wishlist");
    } else {
      toast.error("กรุณาล็อคอิน");
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-1 xl:px-24 sm:px-10">
      <div>
        <NavLink to="/">
          <img
            className="w-10 h-10 mx-auto fa-w-20 rounded-2xl"
            src="/images/logo.jpg"
            alt="logo"
          />
        </NavLink>
      </div>
      {/*-----Search component----*/}
      {/* <Search /> */}

      <div className="flex items-center w-full px-2 sm:px-8 xl:w-2/5">
        "Make your day better feel good in the rain with "RAINCOAT"
      </div>

      <div className="flex items-center md:pl-2">
        {/*---------*/}
        <button
          onClick={handleHistory}
          className="flex items-center mr-1 text-gray-500 md:mr-4"
        >
          <div className="p-2 mr-2 border rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </div>
          <span className="hidden md:inline-block">ประวัติการสั่งซื้อ</span>
        </button>
        {/*---------*/}
        <button
          onClick={handleWishlist}
          className="flex items-center text-gray-500 "
        >
          <div className="p-2 border rounded-full sm:mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="hidden md:inline-block whitespace-nowrap">
            สินค้าที่สนใจ
          </span>
        </button>
      </div>
    </div>
  );
};

export default MiddleNav;
