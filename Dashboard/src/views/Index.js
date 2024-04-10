import { useState, useEffect } from "react";
import classnames from "classnames";
import { Line, Bar } from "react-chartjs-2";
import { Card, CardHeader, CardBody, NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";
import Header from "components/dashboard/Headers/Header.js";
import Chart from "chart.js";
import { useUserContext } from "context/user";
import { chartOptions, parseOptions } from "variables/charts.js";

const Index = (props) => {
  const { orders } = useUserContext();
  const [activeNav, setActiveNav] = useState(1);
  const [chartData, setChartData] = useState(null);

  const totalOrders = orders.length;

  const ordersByDate = orders.reduce((acc, order) => {
    const date = new Date(order.createdAt).toLocaleDateString();
    acc[date] = acc[date] ? acc[date] + order.totalPrice : order.totalPrice;
    return acc;
  }, {});

  const drawChart = () => {
    const data = {
      labels: Object.keys(ordersByDate).reverse(), 
      datasets: [
        {
          label: "Total Income",
          data: Object.values(ordersByDate).reverse(),
        },
      ],
    };
    setChartData(data);
  };
  useEffect(() => {
    drawChart();
  }, []);

  useEffect(() => {
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }, []);

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">Overview</h6>
                    <h2 className="text-white mb-0">Income</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", { active: activeNav === 1 })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", { active: activeNav === 2 })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  {chartData && (
                    <Line
                      data={chartData}
                      options={chartOptions}
                      getDatasetAtEvent={(e) => console.log(e)}
                    />
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
