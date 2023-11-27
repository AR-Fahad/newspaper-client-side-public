import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Hamburger from "hamburger-react";
import "./Style/nav.css";
import logo from "../../assets/logo.png";
const Navbar = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isOpen, setOpen] = useState(false);
  const navLink = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/addArticles">Add Articles</NavLink>
      </li>
      <li>
        <NavLink to="/allArticles">All Articles</NavLink>
      </li>
      <li>
        <NavLink to="/subscription">Subscription</NavLink>
      </li>
    </>
  );

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      const triggerPosition =
        Math.max(
          document.documentElement.scrollHeight,
          document.body.scrollHeight,
          document.documentElement.clientHeight
        ) / 4;
      // console.log(triggerPosition);
      setScrollPosition(scroll);
      if (scroll < triggerPosition || scroll < scrollPosition) {
        setIsNavbarVisible(true);
      } else {
        setIsNavbarVisible(false);
      }
    };
    // Add scroll event listener when component mounts
    window.addEventListener("scroll", handleScroll);
    // Remove event listener when component unmounts to avoid memory leaks
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  return (
    <div
      id="navbar"
      className={`navbar sticky transition-all duration-300 max-w-7xl z-20 text-white font-semibold bg-opacity-40 bg-purple-500 ${
        isNavbarVisible ? `top-0` : `-top-20`
      }`}
    >
      <div className="navbar-start">
        <details className="dropdown lg:hidden">
          <summary className="btn btn-ghost">
            <Hamburger toggled={isOpen} toggle={setOpen} size={20} />
          </summary>
          <ul
            id="medium"
            className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#15151580] rounded-box w-60 ${
              isOpen ? "" : "hidden"
            }`}
          >
            {navLink}
          </ul>
        </details>
        <Link to="/">
          <img className="w-24 md:w-36" src={logo} alt="" />
        </Link>
      </div>

      <div className="navbar-center hidden gap-4 lg:flex">
        <ul id="large" className="flex gap-5 px-1">
          {navLink}
        </ul>
      </div>
      <div className="navbar-end">
        <p>
          <Link className="hover:underline" to="/login">
            Login
          </Link>{" "}
          |{" "}
          <Link className="hover:underline" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Navbar;
