// OwnerManagers.js
import logo from "../logo.svg";
import React from "react";
import { Layout, Breadcrumb } from "antd";
import GetManagersTable from "./GetManagersTable";
import OwnerAddManager from "./OwnerAddManager";
import OwnerDeleteManager from "./OwnerDeleteManager";
import Navbar from "./Navbar";
import OwnerSidebar from "./OwnerSidebar";

const { Content, Sider } = Layout;

const OwnerManagers = () => {
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
              <Breadcrumb.Item>Managers</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: "#fff", padding: 24, minHeight: 2000 }}>
              <GetManagersTable></GetManagersTable>
              <OwnerAddManager></OwnerAddManager>
              <OwnerDeleteManager></OwnerDeleteManager>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default OwnerManagers;
