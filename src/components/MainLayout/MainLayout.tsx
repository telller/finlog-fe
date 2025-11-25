import { Outlet, useLocation, useNavigate } from 'react-router';
import { MenuOutlined } from '@ant-design/icons';
import { Button, Flex, Layout } from 'antd';
import { useState } from 'react';
import { map } from 'lodash';
import cl from 'classnames';
import './MainLayout.css';

const MainLayout = () => {
  const [isOpened, $isOpened] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

  return (
    <Layout className="main-layout">
      <Flex className="sidebar-container">
        <Flex className={cl('sidebar-background', { isOpened })} onClick={() => $isOpened(false)} />
        <Flex className={cl('sidebar', { isOpened })}>
          <div className="user-container">Голяченко Влад</div>
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
