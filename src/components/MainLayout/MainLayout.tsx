import { Outlet, useLocation, useNavigate } from 'react-router';
import { Button, Flex, Layout, Spin } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useAuthState } from '@src/state';
import { map } from 'lodash';
import cl from 'classnames';
import './MainLayout.css';

const MainLayout = () => {
  const [isOpened, $isOpened] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, loggedIn, user, getMe, logout } = useAuthState();

  useEffect(() => {
    (async () => await getMe())();
  }, [getMe]);

  const menuItems = [
    {
      label: 'Головна',
      route: '/',
    },
    {
      label: 'Статистика',
      route: '/stat',
    },
  ];

  const menuMap = new Map(menuItems.map((item) => [item.route, item.label]));

  const handleMenuClick = (route: string) => {
    $isOpened(false);
    navigate(route);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" style={{ height: '100vh' }}>
        <Spin size="large" />
      </Flex>
    );
  }

  if (!loggedIn) {
    navigate('/login');
    return null;
  }

  return (
    <Layout className="main-layout">
      <Flex className="sidebar-container">
        <Flex className={cl('sidebar-background', { isOpened })} onClick={() => $isOpened(false)} />
        <Flex className={cl('sidebar', { isOpened })}>
          <div className="user-container">
            {user?.username}
            <Button type="text" style={{ color: 'red' }} onClick={handleLogout}>
              Вийти
            </Button>
          </div>
          {map(menuItems, ({ label, route }) => (
            <Flex className="menuItem" onClick={() => handleMenuClick(route)} key={route}>
              {label}
            </Flex>
          ))}
        </Flex>
      </Flex>
      <Layout>
        <Layout.Header className="header">
          <div className="headerContainer">
            <Button
              onClick={() => $isOpened(!isOpened)}
              icon={<MenuOutlined />}
              shape="circle"
              size="large"
            />
          </div>
          <div className="headerCenter">{menuMap.get(location.pathname)}</div>
        </Layout.Header>
        <Layout.Content className="content">
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
