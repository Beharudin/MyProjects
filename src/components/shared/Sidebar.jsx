import React, { useState } from 'react'
import { FcBullish } from 'react-icons/fc'
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from '../../lib/constants/Navigation'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import { HiOutlineLogout } from 'react-icons/hi'
import { FaBars } from 'react-icons/fa'

const linkClass =
    'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

export default function Sidebar() {
	const [isMenuVisible, setIsMenuVisible] = useState(false);

	const handleBarClick = () => {
	  setIsMenuVisible(!isMenuVisible);
	}

    return (
        <div className="bg-neutral-900 md:w-60 md:flex md:flex-col text-white">
            <div className="flex gap-2 items-center px-1 py-3 relative">
                <FcBullish fontSize={24} />
                <span className="text-neutral-200 text-lg">OpenShop</span>
                <FaBars fontSize={24} className="absolute right-2 cursor-pointer md:hidden" onClick={handleBarClick} />
            </div>
            <div className={`py-8 md:flex md: flex-1 md:flex-col gap-0.5 md:block ${isMenuVisible? '': 'hidden'}`}>
                {DASHBOARD_SIDEBAR_LINKS.map((link) => (
                    <SidebarLink key={link.key} link={link} />
                ))}
            </div>
            <div className={`flex flex-col gap-0.5 pt-2 border-t border-neutral-700 md:block ${isMenuVisible? '': 'hidden'}`}>
                {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
                    <SidebarLink key={link.key} link={link} />
                ))}
                <div className={classNames(linkClass, 'cursor-pointer text-red-500')}>
                    <span className="text-xl">
                        <HiOutlineLogout />
                    </span>
                    Logout
                </div>
            </div>
        </div>
    )
}

function SidebarLink({ link }) {
    const { pathname } = useLocation()

    return (
        <Link
            to={link.path}
            className={classNames(pathname === link.path ? 'bg-neutral-700 text-white' : 'text-neutral-400', linkClass)}
        >
            <span className="text-xl">{link.icon}</span>
            {link.label}
        </Link>
    )
}
