import { MenuOutlined } from '@ant-design/icons';
import { type CSSProperties, useState } from 'react';
import { Outlet } from 'react-router';
import { Button, Layout } from 'antd';

const headerStyle: CSSProperties = {
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
};

const contentStyle: CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#0958d9',
};

const MainLayout = () => {
  const [isOpenedSidebar, $isOpenedSidebar] = useState(false);
  const siderStyle: CSSProperties = {
    position: 'fixed',
    height: '100%',
    textAlign: 'center',
    lineHeight: '120px',
    width: '160px',
    color: '#fff',
    backgroundColor: '#1677ff',
    transform: isOpenedSidebar ? 'translateX(0)' : 'translateX(-160px)',
    transition: 'transform 0.2s ease',
    zIndex: 1000,
  };
  return (
    <Layout>
      <Layout.Header style={headerStyle}>
        <Button
          onClick={() => $isOpenedSidebar(!isOpenedSidebar)}
          icon={<MenuOutlined />}
          shape="circle"
        />
      </Layout.Header>
      <Layout>
        <Layout.Sider width={160} style={siderStyle}>
          Sider
        </Layout.Sider>
        <Layout.Content style={contentStyle}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
