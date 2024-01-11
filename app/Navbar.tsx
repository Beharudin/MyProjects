import Link from "next/link";
import React from "react";
import {AiFillBug} from 'react-icons/ai'

const Navbar = () => {
    const links=[
        {label: 'Dashboard',href:'/'},
        {label: 'Issues',href:'/issues'},
    ]
  return (
    <nav className="flex space-x-6 px-5 mb-5 border-b h-14 items-center">
      <Link href="/"><AiFillBug /></Link>
      <ul className="flex space-x-6">
        {links.map(link=><Link className="text-zinc-500 hover:text-zinc-800 transition-colors" href={link.href}>{link.label}</Link>)}
        
      </ul>
    </nav>
  );
};

export default Navbar;
