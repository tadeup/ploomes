import LoginPage from "views/LoginPage/LoginPage.jsx";
import ErrorPage from "views/ErrorPage/ErrorPage.jsx";

var publicRoutes = [
  { path: "/login-page", name: "LoginPage", component: LoginPage, isPublic: true},
  { name: "LoginPage", component: ErrorPage, isPublic: true }
];

export default publicRoutes;
