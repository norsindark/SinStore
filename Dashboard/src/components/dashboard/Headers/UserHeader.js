import axios from "axios";
import { Button, Container, Row, Col } from "reactstrap";
import React, { useState, useEffect } from "react";
import { useAuth } from "context/auth";



const UserHeader = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const { getUserByAccessToken } = useAuth();
  const [isAuthenticatedChecked, setIsAuthenticatedChecked] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserByAccessToken();
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
        console.log("User:", user.role.name);
      }
      setIsAuthenticatedChecked(true);
    };

    if (!isAuthenticatedChecked || !currentUser) {
      getUser();
    }
  }, [isAuthenticatedChecked, getUserByAccessToken, currentUser]);

  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          // backgroundImage:
          //   "url(" + require("../../assets/img/theme/profile-cover.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">Hello {currentUser?.fullName || "Guest"}</h1>
              <p className="text-white mt-0 mb-5">
                This is your profile page. You can see the progress you've made
                with your work and manage your projects or assigned tasks
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;
