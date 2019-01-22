import publicRoutes from "./PublicRoutes.jsx";
import privateRoutes from "./PrivateRoutes.jsx";

var indexRoutes = []
  .concat(privateRoutes)
  .concat(publicRoutes);

export default indexRoutes;
