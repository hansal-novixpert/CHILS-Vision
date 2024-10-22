// OwnerDashboard.js
import logo from "../../logo.svg";
import React from "react";
import { Layout, Breadcrumb } from "antd";
import InventoryCard from "../InventoryCard"; // Make sure the path is correct
import DailyReportCard from "../DailyReportCard";
import Navbar from "../Navbar";
import OwnerSidebar from "./OwnerSidebar";

const { Content,Sider } = Layout;

const OwnerDashboard = () => {
  return (
    <Layout>
      <Navbar username={"Novixpert"} profilePic={logo} />
      <Layout>
        <Sider style={{ background: "#099B82" }}>
          <OwnerSidebar userType={"Owner"} />
        </Sider>
        <Layout>
          <Content style={{ padding: "60px 50px" }}>
            <Breadcrumb style={{ margin: "16px 0", fontSize: 24 }}>
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: "#fff", padding: 24, minHeight: 2000 }}>
              <InventoryCard />
              <DailyReportCard />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default OwnerDashboard;
