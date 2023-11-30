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
import ArticleDetails from "../Pages/ArticleDetails/ArticleDetails";
import axiosInstance from "../AxiosInstance/instance";
import MyArticles from "../Pages/MyArticles/MyArticles";
import UpdateArticle from "../Pages/UpdateArticle/UpdateArticle";
import PrivateRoutes from "../SecuredRoutes/PrivateRoutes";
import PremiumArticles from "../Pages/PremiumArticles/PremiumArticles";
import AdminRoutes from "../SecuredRoutes/AdminRoutes";
import PremiumRoutes from "../SecuredRoutes/PremiumRoutes";

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
        element: (
          <PrivateRoutes>
            <AddArticles></AddArticles>
          </PrivateRoutes>
        ),
      },
      {
        path: "premiumArticles",
        element: (
          <PremiumRoutes>
            <PremiumArticles></PremiumArticles>
          </PremiumRoutes>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoutes>
            <Profile></Profile>
          </PrivateRoutes>
        ),
      },
      {
        path: "allArticles",
        element: <UsersAllArticles></UsersAllArticles>,
      },
      {
        path: "articleDetails/:id",
        element: (
          <PrivateRoutes>
            <ArticleDetails></ArticleDetails>
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          axiosInstance.get(`/articles/${params.id}`).then((res) => res.data),
      },
      {
        path: "updateArticle/:id",
        element: (
          <PrivateRoutes>
            <UpdateArticle></UpdateArticle>
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          axiosInstance.get(`/articles/${params.id}`).then((res) => res.data),
      },
      {
        path: "myArticles",
        element: (
          <PrivateRoutes>
            <MyArticles></MyArticles>
          </PrivateRoutes>
        ),
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
    element: (
      <AdminRoutes>
        <Dashboard></Dashboard>
      </AdminRoutes>
    ),
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
