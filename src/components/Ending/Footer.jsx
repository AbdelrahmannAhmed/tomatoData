import React from "react"
import { Link } from "react-router-dom"
import "bootstrap-icons/font/bootstrap-icons.css"

export default function Footer() {
  return (
    <>
      <div className='container'>
        <footer className='d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top'>
          <div className='col-md-4 d-flex align-items-center'>
            <span className='mb-3 mb-md-0 text-body-secondary'>Tomato © 2024 Company, Inc</span>
          </div>

          <ul className='nav col-md-4 justify-content-end list-unstyled d-flex'>
            <li className='ms-3'>
              <Link className='text-body-secondary' to='/'>
                <i className='bi bi-twitter' style={{ width: "24", height: "24" }}></i> {/* Twitter icon */}
              </Link>
            </li>
            <li className='ms-3'>
              <Link className='text-body-secondary' to='/'>
                <i className='bi bi-instagram' style={{ width: "24", height: "24" }}></i> {/* Instagram icon */}
              </Link>
            </li>
            <li className='ms-3'>
              <Link className='text-body-secondary' to='/'>
                <i className='bi bi-facebook' style={{ width: "24", height: "24" }}></i> {/* Facebook icon */}
              </Link>
            </li>
          </ul>
        </footer>
      </div>
    </>
  )
}
