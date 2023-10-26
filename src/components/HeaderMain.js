import React from "react";
import { FaSearch } from "react-icons/fa";
import { BsCart } from "react-icons/bs";
import { AiOutlineHeart, AiOutlineUser } from "react-icons/ai";

function HeaderMain() {
  return (
    <div className="border-b border-gray-200">
      <div className="container p-4">
        <div className="justify-between items-center flex  flex-col sm:flex-row gap-2">
          <div className="text-blackish text-4xl l-2">Logo</div>
          <div className="flex justify-between flex-1 gap-2 px-2 w-full">
            <div className="flex w-full sm:w-3/4 relative items-center">
              <input
                type="text"
                placeholder="Search..."
                className="p-2 w-full ring-1 ring-gray-400 text-gray-600 text-[14px] focus:outline-none rounded-md"
              />
              <div className="absolute right-2 cursor-pointer p-2">
                <FaSearch />
              </div>
            </div>
            <div className="flex gap-1 sm:gap-2 text-gray-500 text-2xl cursor-pointer">
              <div className="">
                <AiOutlineUser />
              </div>
              <div className="relative">
                <AiOutlineHeart />
                <div className="badge">0</div>
              </div>
              <div className="relative">
                <BsCart />
                <div className="badge">2</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderMain;
