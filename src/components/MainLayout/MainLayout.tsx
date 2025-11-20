import { Outlet, useLocation, useNavigate } from 'react-router';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Layout } from 'antd';
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
      <Layout.Header className="header">
        <div className="headerContainer">
          <Button onClick={() => $isOpened(!isOpened)} icon={<MenuOutlined />} shape="circle" />
        </div>
        <div className="headerCenter">{menuMap.get(location.pathname)}</div>
        <div className="headerContainer">
          <Button onClick={() => {}} icon={<UserOutlined />} shape="circle" />
        </div>
      </Layout.Header>
      <Layout>
        <Layout.Sider className={cl('sidebar', { isOpened })}>
          {map(menuItems, ({ label, route }) => (
            <div
              className={cl('menuItem', { active: route === location.pathname })}
              onClick={() => handleMenuClick(route)}
              key={route}
            >
              {label}
            </div>
          ))}
        </Layout.Sider>
        <Layout.Content className="content">
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
