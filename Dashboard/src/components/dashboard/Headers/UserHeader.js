import axios from "axios";
import { Button, Container, Row, Col } from "reactstrap";
import React, { useState, useEffect } from "react";
import { useAuth } from "context/auth";



const UserHeader = () => {
  const { getUserByAccessToken } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserByAccessToken();
        const response = await axios.get(`http://localhost:3001/users?email=${user.email}`);
        const { data } = response;
        if (data && data.length > 0) {
          setUserData(data[0]);
        } else {
          console.error("User not found in database");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [getUserByAccessToken]);

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
              <h1 className="display-2 text-white">Hello {userData?.name || "Guest"}</h1>
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
