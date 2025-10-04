import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) && !event.target.closest('.menu-icon')) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const closeMobileMenu = () => setIsMenuOpen(false);

    const handleSignIn = () => {
        closeMobileMenu(); // Close menu if open
        navigate("/login");
    };

    return (
        <div className="Nav">
            <nav>
                <h1>
                    <NavLink to="/" onClick={closeMobileMenu}>Vayu<span>notics</span></NavLink>
                </h1>

                {/* Hamburger Icon for mobile */}
                <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {/* This uses Font Awesome icons. Make sure to link Font Awesome in your project. */}
                    <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"} />
                </div>

                {/* Navigation links */}
                <ul className={isMenuOpen ? "unorderlist active" : "unorderlist"} ref={menuRef}>
                    <li>
                        <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMobileMenu}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/doctors" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMobileMenu}>
                            Services
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMobileMenu}>
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact-us" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMobileMenu}>
                            Contact
                        </NavLink>
                    </li>
                    
                </ul>

                {/* Sign-in button for the desktop view */}
                <div className="auth-box">
                    <button id="sign" onClick={() => navigate("/login")}>
                        Sign In
                    </button>
                </div>
            </nav>
            <hr />
        </div>
    );
};

export default Navbar;