import ClientsListPage from "views/ClientsListPage/ClientsListPage.jsx";
import ClientsRegisterPage from "views/ClientsRegisterPage/ClientsRegisterPage.jsx";

var privateRoutes = [
  {
    path: "/clients-register-page",
    name: "ClientsRegisterPage",
    component: ClientsRegisterPage,
    isPublic: false
  },
  {
    path: "/",
    name: "ClientsListPage",
    component: ClientsListPage,
    isPublic: false
  }
];

export default privateRoutes;
