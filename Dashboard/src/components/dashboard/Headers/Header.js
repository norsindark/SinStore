import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import React from "react";
import { useUserContext } from "context/user";

const Header = () => {
  const { orders } = useUserContext();

  const totalOrders = orders.length;

  const totalIncome = orders.reduce((total, order) => total + order.totalPrice, 0);

  const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

  const ordersThisMonth = orders.filter(order => new Date(order.createdAt) >= firstDayOfMonth);

  const totalOrderThisMont = ordersThisMonth.length;

  const totalIncomeThisMonth = ordersThisMonth.reduce((total, order) => total + order.totalPrice, 0);

  console.log(totalOrderThisMont);



  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Order
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {totalOrders}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Income
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{totalIncome.toLocaleString('vi-VN')} VNĐ</span>

                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>


              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          total order for the month
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{totalOrderThisMont}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-green text-white rounded-circle shadow">
                          <i className="ni ni-single-copy-04" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>

              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          total income for the month
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{totalIncomeThisMonth.toLocaleString('vi-VN')} VNĐ</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="ni ni-money-coins" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
