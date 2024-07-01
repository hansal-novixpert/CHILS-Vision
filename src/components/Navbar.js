// Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu, Dropdown, Avatar, Typography } from 'antd';
import { UserOutlined, SettingOutlined, HistoryOutlined, LogoutOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Text } = Typography;

const Navbar = ({ username, profilePic }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here if needed
    navigate('/'); // Navigate to the home page
  };
  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        View Profile
      </Menu.Item>
      <Menu.Item key="2" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
      <Menu.Item key="3" icon={<HistoryOutlined />}>
        Activity
      </Menu.Item>
      <Menu.Item key="4" onClick={handleLogout} icon={<LogoutOutlined />}>
        Log Out
      </Menu.Item>
    </Menu>
  );

  return (
    <Header style={{ background: '#001529', padding: '10px 20px', position: 'fixed', zIndex: 1000, width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ color: 'white', fontSize: '18px' }}>{username}</Text>
        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
          <Avatar
            size="large"
            src={profilePic}
            style={{ cursor: 'pointer' }}
            alt="Profile"
          />
        </Dropdown>
      </div>
    </Header>
  );
};

export default Navbar;
