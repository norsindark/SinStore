// import React from "react";
// import { Route, Redirect } from "react-router-dom";
// import { useAuth } from "./context/auth";

// function PrivateRoute({ component: Component, roles, ...rest }) {
//   const { getUserByAccessToken, user } = useAuth();

//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         if (!getUserByAccessToken()) {
//           return <Redirect to="/login" />;
//         }

//         if (user.role !== "ADMIN") {
//           return <Redirect to="/login" />;
//         }

//         return <Component {...props} />;
//       }}
//     />
//   );
// }

// export default PrivateRoute;
