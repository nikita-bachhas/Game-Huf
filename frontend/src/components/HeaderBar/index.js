import * as React from 'react';
import { Layout, Avatar, Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';

import './index.css';
import ProfileModal from './components/ProfileModal';

const { Header } = Layout;

const DropdownMenu = ({ logoutOnClick, profileOnClick }) => (
  <Menu>
    <Menu.Item key='profile' onClick={profileOnClick}>
      My Profile
    </Menu.Item>
    <Menu.Item key='settings'>
      <Link to='/settings'>Settings</Link>
    </Menu.Item>
    <Menu.Item key='logout' onClick={logoutOnClick}>
      Log Out
    </Menu.Item>
  </Menu>
);

const HeaderBar = ({ menuOnClick, logoutOnClick, userInfo }) => {
  const [showProfileModal, setShowProfileModal] = React.useState(false);

  const handleOnClickProfileMenu = () => setShowProfileModal(true);
  const handleOnCancelProfileMenu = () => setShowProfileModal(false);

  return (
    <Header className='header' style={{ padding: 0 }}>
      <div className='menu-trigger' onClick={menuOnClick}>
        <MenuOutlined />
      </div>
      <div className='avatar-container'>
        <Dropdown
          overlay={
            <DropdownMenu
              logoutOnClick={logoutOnClick}
              profileOnClick={handleOnClickProfileMenu}
            />
          }
          placement='bottomLeft'
          arrow
        >
          <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
            {userInfo.username ? userInfo.username[0].toUpperCase() : 'U'}
          </Avatar>
        </Dropdown>
      </div>
      <ProfileModal
        userInfo={userInfo}
        visible={showProfileModal}
        onCancel={handleOnCancelProfileMenu}
      />
    </Header>
  );
};

export { HeaderBar };
