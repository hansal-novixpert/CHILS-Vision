// AdminGetUsers.js
import logo from "../../logo.svg";
import React from "react";
import { Layout, Breadcrumb } from "antd";
import Navbar from "../Navbar";
import GetUsersTable from "../GetUsersTable";
import AdminSidebar from "./AdminSidebar";

const { Content, Sider } = Layout;

const AdminGetUsers = () => {
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
              <Breadcrumb.Item>Users</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: "#fff", padding: 24, minHeight: 2000 }}>
              <GetUsersTable></GetUsersTable>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminGetUsers;
