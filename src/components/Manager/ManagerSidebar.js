// ManagerSidebar.js
import React from 'react';
import { Menu, Layout, Typography } from 'antd';
import { AppstoreOutlined, BellOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const { Sider } = Layout;
const { Text } = Typography;

const ManagerSidebar = ({ userType }) => {
  const location = useLocation();
  const activeKey = location.pathname.split('/').pop();

  return (
    <Sider width={200} style={{ background: '#099B82', height: '100vh', position: 'fixed', left: 0, top: 64 }}>
      <div style={{ padding: '16px', textAlign: 'center' }}>
        <Text strong style={{ fontSize: 20 }}>{userType}</Text>
      </div>
      <Menu mode="inline" selectedKeys={[activeKey]} style={{ height: '100%', borderRight: 0 }}>
        <Menu.Item key="dashboard" icon={<AppstoreOutlined />}>
          <Link to="/manager/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="categories" icon={<AppstoreOutlined />}>
          <Link to="/manager/categories">Categories</Link>
        </Menu.Item>
        <Menu.Item key="inventory" icon={<AppstoreOutlined />}>
          <Link to="/manager/inventory">Inventory</Link>
        </Menu.Item>
        <Menu.Item key="notifications" icon={<BellOutlined />}>
          <Link to="/manager/notifications">See Notifications</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default ManagerSidebar;
