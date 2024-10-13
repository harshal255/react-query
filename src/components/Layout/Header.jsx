import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <header className="sticky top-0 bg-white shadow">
            <div className="flex items-center justify-between p-4 mx-auto max-w-7xl">
                <p>Logo</p>
                <ul className='flex items-center justify-center gap-10'>
                    <li><NavLink to={"/"}>Home</NavLink></li>
                    <li><NavLink to={"/trad"}>Fetch Old</NavLink></li>
                    <li><NavLink to={"/rq"}>Fetch RQ</NavLink></li>
                    <li><NavLink to={"/infinite"}>Infinite Scroll</NavLink></li>
                </ul>
                <button className="btn btn-light">Contact Us</button>
            </div>
        </header>

    )
}

export default Header
