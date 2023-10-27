import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <div className="hidden sm:block justify-center">
      <div className="container flex justify-center">
        <div className="w-fit flex text-blackish font-medium py-4 gap-3 lg:gap-10 mx-auto">
          <Link href={'#'} className="navbar-link cursor-pointer relative">HOME</Link>
          <Link href={'#'} className="navbar-link cursor-pointer relative">CATEGORIES</Link>
          <Link href={'#'} className="navbar-link cursor-pointer relative">MEN'S</Link>
          <Link href={'#'} className="navbar-link cursor-pointer relative">WOMEN'S</Link>
          <Link href={'#'} className="navbar-link cursor-pointer relative">JEWELLERY</Link>
          <Link href={'#'} className="navbar-link cursor-pointer relative">PERFUME</Link>
          <Link href={'#'} className="navbar-link cursor-pointer relative">BLOG</Link>
          <Link href={'#'} className="navbar-link cursor-pointer relative">HOT OFFERS</Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
