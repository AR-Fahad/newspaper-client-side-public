import { NavLink, Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
import Hamburger from "hamburger-react";
import { useState } from "react";
import "../Style/nav.css";
const Dashboard = () => {
  const [isOpen, setOpen] = useState(false);
  const sideLinks = (
    <>
      <li>
        <NavLink to="/dashboard/adminHome">Dashboard</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/allUsers">All Users</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/allArticles">All Articles</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/addPublisher">Add Publisher</NavLink>
      </li>
      <div className="divider w-11/12 mx-auto md:w-full h-px bg-white"></div>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
    </>
  );
  return (
    <>
      <div className="lg:hidden">
        <div
          id="navbar"
          className="navbar text-white font-semibold bg-opacity-50 bg-purple-500"
        >
          <div className="navbar-start">
            <details className="dropdown">
              <summary className="btn btn-ghost">
                <Hamburger toggled={isOpen} toggle={setOpen} size={20} />
              </summary>
              <ul
                id="medium"
                className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#15151580] rounded-box w-60 ${
                  isOpen ? "" : "hidden"
                }`}
              >
                <p className="text-center text-xs">Admin Only</p>
                <br />
                {sideLinks}
              </ul>
            </details>
            <img className="w-24 md:w-36" src={logo} alt="" />
          </div>
        </div>
        <div>
          <Outlet></Outlet>
        </div>
      </div>
      <div id="sidebar" className="hidden lg:flex">
        <div className="grid grid-cols-5">
          <div className="col-span-1 bg-purple-500 bg-opacity-50 text-white py-14 px-10 min-h-screen overflow-y-auto">
            <div className="mb-10">
              <img className="w-36 mx-auto" src={logo} alt="" />
              <p className="text-center text-xs">Admin Only</p>
            </div>
            <ul className="menu">{sideLinks}</ul>
          </div>
          <div className="col-span-4">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
