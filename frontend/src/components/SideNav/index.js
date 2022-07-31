import * as React from 'react';
import { Layout, Menu } from 'antd';

import { Link, useLocation, useHistory } from 'react-router-dom';
import { HomeOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';

import './index.css';

const { Sider } = Layout;

const SideNav = ({ isMenuClosed }) => {
  const history = useHistory();
  const location = useLocation();
  const selectedKeys = React.useMemo(
    () => [location.pathname],
    [location.pathname]
  );
  return (
    <Sider
      theme='light'
      trigger={null}
      collapsible
      collapsed={isMenuClosed}
      className='sider'
      width={150}
    >
      <img
        src='/HUF-logo.png'
        alt='HUF Logo'
        className='home-logo'
        onMouseDown={() => {
          history.push('/home');
        }}
      />
      <Menu mode='inline' selectedKeys={selectedKeys}>
        <Menu.Item key='/home' icon={<HomeOutlined />} title={null}>
          <Link to='/home'>Home</Link>
        </Menu.Item>
        <Menu.Item key='/dashboard' icon={<UserOutlined />} title={null}>
          <Link to='/dashboard'>Dashboard</Link>
        </Menu.Item>
        <Menu.Item key='/settings' icon={<SettingOutlined />} title={null}>
          <Link to='/settings'>Settings</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export { SideNav };
