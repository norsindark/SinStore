import React, { useEffect, useState } from "react";
import { useLocation, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import AdminNavbar from "components/dashboard/Navbars/AdminNavbar.js";
import AdminFooter from "components/dashboard/Footers/AdminFooter.js";
import Sidebar from "components/dashboard/Sidebar/Sidebar.js";
import routes from "../../routers/routes.js";
import { BASE_API } from "constant/network.js";
import { useAuth } from "context/auth.js";
import axios from "axios";

const AdminLayout = (props) => {
  const navigate = useNavigate();
  const mainContent = React.useRef(null);
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);
  const { getUserByAccessToken, getRoleUser } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getUserByAccessToken();
      if (user) {
        console.log("User:", user.role.name);
        if (user.role.name !== "ADMIN") {
          navigate("/");
        } else {
          setCurrentUser(user);
          console.log("User:", user);
        }
      } else {
        console.log("User is null");
      }
    };
    checkAuth();
  }, []);



  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props?.location?.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          // imgSrc: require("../assets/img/brand/argon-react.png"),
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props?.location?.pathname)}
          currentUser={currentUser}
        />
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default AdminLayout;
