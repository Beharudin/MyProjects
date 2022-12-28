import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function Products() {
  return (
    <>
        <div>
        <input type="search" placeholder='Search Products..' />
        </div>
        <nav className='navbar navbar-expand-lg'>
            <ul className="nav navbar-nav">
                <li className='nav-item'><NavLink class="nav-link" to="featured">Feature</NavLink></li>
                <li className='nav-item'><NavLink class="nav-link" to="new">New</NavLink></li>
            </ul>
        </nav>
        <Outlet/>
    </>
  )
}

export default Products
