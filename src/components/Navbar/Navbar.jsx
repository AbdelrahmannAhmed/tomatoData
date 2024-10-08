import React, { useState } from "react"
import { Link } from "react-router-dom"
import logo from "../../assets/nav-logo.png"
import "./Navbar.css"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleLinkClick = () => {
    setIsOpen(false) // إغلاق شريط التنقل عند تحديد رابط
  }

  return (
    <nav className='navbar navbar-expand-lg bg-dark bg-opacity-75 fixed-top backNavColor'>
      <div className='container'>
        <a className='navbar-brand' href='/'>
          <img src={logo} alt='' />
        </a>
        <button className='navbar-toggler' type='button' onClick={handleToggle} aria-controls='navbarSupportedContent' aria-expanded={isOpen} aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon' />
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id='navbarSupportedContent'>
          <ul className='navbar-nav m-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link className='nav-link active text-danger' aria-current='page' to='/' onClick={handleLinkClick}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/categories' onClick={handleLinkClick}>
                Categories
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/countries' onClick={handleLinkClick}>
                Countries
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
