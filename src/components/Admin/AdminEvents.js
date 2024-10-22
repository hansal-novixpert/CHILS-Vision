// AdminEvents.js
import logo from "../../logo.svg";
import React from "react";
import { Layout, Breadcrumb } from "antd";
import Navbar from "../Navbar";
import GetEventsTable from "../GetEventsTable";
import AdminSidebar from "./AdminSidebar";

const { Content, Sider } = Layout;

const AdminEvents = () => {
  return (
    <Layout>
      <Navbar username={"Novixpert"} profilePic={logo} />
      <Layout>
        <Sider style={{ background: "#099B82" }}>
          <AdminSidebar userType={"Admin"} />
        </Sider>
        <Layout>
          <Content style={{ padding: "60px 50px" }}>
            <Breadcrumb style={{ margin: "16px 0", fontSize: 24 }}>
              <Breadcrumb.Item>Events</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: "#fff", padding: 24, minHeight: 2000 }}>
              <GetEventsTable></GetEventsTable>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminEvents;
