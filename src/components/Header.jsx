import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

function Header() {
  return (
    <div className="border-b border-gray-500 hidden sm:block">
      <div className="container py-4">
        <div className="flex justify-between items-center">
        <div className="hidden lg:flex gap-1">
          <div className="header-icons">
            <FaFacebook />
          </div>
          <div className="header-icons">
            <FaTwitter />
          </div>
          <div className="header-icons">
            <FaInstagram />
          </div>
          <div className="header-icons">
            <FaLinkedin />
          </div>
        </div>
        <div className="lg:flex uppercase text-[12px] text-gray-500">
            <b>Free shipping</b> this week order over -$55
        </div>
        <div className="flex gap-4">
            <select className="text-gray-500 text-[12px] outline-none w-[70px]"
            name="currency"
            id="currency"
            >
              <option value="ETB">ETB</option>
            <option value="USD $">USD $</option>
              <option value="EUR €">EUR €</option>
            </select>
            <select 
            className="text-gray-500 text-[12px] outline-none w-[95px]"
            name="language"
            id="language"
            >
              <option value="Afan Oromo">Afan Oromo</option>
            <option value="Amharic">Amharic</option>
              <option value="English">English</option>
            </select>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Header;
