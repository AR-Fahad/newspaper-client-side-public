import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import AddArticles from "../Pages/AddArticles/AddArticles";
import Dashboard from "../Layout/Dashboard";
import AdminHome from "../Pages/AdminHome/AdminHome";
import AllUsers from "../Pages/AllUsers/AllUsers";
import AllArticles from "../Pages/AllArticles/AllArticles";
import AddPublisher from "../Pages/AddPublisher/AddPublisher";
import Profile from "../Pages/Profile/Profile";
import UsersAllArticles from "../Pages/UsersAllArticles/UsersAllArticles";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "addArticles",
        element: <AddArticles></AddArticles>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "allArticles",
        element: <UsersAllArticles></UsersAllArticles>,
      },
    ],
  },
  {
    path: "register",
    element: <Register></Register>,
  },
  {
    path: "login",
    element: <Login></Login>,
  },
  // Note: Below admin routes
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "adminHome",
        element: <AdminHome></AdminHome>,
      },
      {
        path: "allUsers",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "allArticles",
        element: <AllArticles></AllArticles>,
      },
      {
        path: "addPublisher",
        element: <AddPublisher></AddPublisher>,
      },
    ],
  },
]);

export default router;
