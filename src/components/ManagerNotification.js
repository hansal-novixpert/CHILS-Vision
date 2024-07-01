// ManagerNotification.js
import logo from "../logo.svg";
import React from "react";
import { Layout, Breadcrumb } from "antd";
import GetNotificationTable from "./GetNotificationTable";
import Navbar from "./Navbar";
import ManagerSidebar from "./ManagerSidebar";

const { Content, Sider } = Layout;

const ManagerNotification = () => {
  return (
    <Layout>
      <Navbar username={"Pranil"} profilePic={logo} />
      <Layout>
        <Sider style={{ background: "#099B82" }}>
          <ManagerSidebar userType={"Manager"} />
        </Sider>
        <Layout>
          <Content style={{ padding: "60px 50px" }}>
            <Breadcrumb style={{ margin: "16px 0", fontSize: 24 }}>
              <Breadcrumb.Item>Notification</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: "#fff", padding: 24, minHeight: 2000 }}>
              <GetNotificationTable></GetNotificationTable>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ManagerNotification;
