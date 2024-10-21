// ManagerCategory.js
import React from "react";
import { Layout, Breadcrumb } from "antd";
import ManagerAddCategory from "./ManagerAddCategory";
import ManagerDeleteCategory from "./ManagerDeleteCategory";
import Navbar from "./Navbar";
import ManagerSidebar from "./ManagerSidebar";
import logo from "../logo.svg";

const { Content, Sider } = Layout;

const ManagerCategory = () => {
  return (
    <Layout>
      <Navbar username={"Novixpert"} profilePic={logo} />
      <Layout>
        <Sider style={{ background: "#099B82" }}>
          <ManagerSidebar userType={"Manager"} />
        </Sider>
        <Layout>
          <Content style={{ padding: "60px 50px" }}>
            <Breadcrumb style={{ margin: "16px 0", fontSize: 24 }}>
              <Breadcrumb.Item>Category</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: "#fff", padding: 24, minHeight: 2000 }}>
              <ManagerAddCategory></ManagerAddCategory>
              <ManagerDeleteCategory></ManagerDeleteCategory>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ManagerCategory;
