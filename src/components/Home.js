import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Row, Col, Layout } from "antd";
import { Header } from "antd/es/layout/layout";

const Home = () => {
  return (
    <Layout>
      <Header style={{ background: "#fff" }}>Novixpert</Header>
      <Row justify="center" style={{ marginTop: "50px" }}>
        <Col span={5}>
          <Card title="Select Your Role">
            <Link to="/manager/dashboard">
              <Button
                type="primary"
                style={{ marginBottom: "10px", width: "100%" }}
              >
                Manager
              </Button>
            </Link>
            <Link to="/owner/dashboard">
              <Button
                type="primary"
                style={{ marginBottom: "10px", width: "100%" }}
              >
                Owner
              </Button>
            </Link>
            <Link to="/admin/dashboard">
              <Button
                type="primary"
                style={{ marginBottom: "10px", width: "100%" }}
              >
                Admin
              </Button>
            </Link>
            <Link to="/operator/dashboard">
              <Button
                type="primary"
                style={{ marginBottom: "10px", width: "100%" }}
              >
                Operator
              </Button>
            </Link>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default Home;
