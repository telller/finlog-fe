import type { CSSProperties } from 'react';
import { Outlet } from 'react-router';
import { Layout } from 'antd';

const headerStyle: CSSProperties = {
  textAlign: 'center',
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

// const siderStyle: CSSProperties = {
//     textAlign: 'center',
//     lineHeight: '120px',
//     color: '#fff',
//     backgroundColor: '#1677ff',
// };

const MainLayout = () => {
  return (
    <Layout>
      <Layout.Header style={headerStyle}>Header</Layout.Header>
      <Layout>
        {/*<Sider width="25%" style={siderStyle}>*/}
        {/*    Sider*/}
        {/*</Sider>*/}
        <Layout.Content style={contentStyle}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
