import {Layout} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import {Outlet} from "react-router";

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#4096ff',
};

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#0958d9',
};

// const siderStyle: React.CSSProperties = {
//     textAlign: 'center',
//     lineHeight: '120px',
//     color: '#fff',
//     backgroundColor: '#1677ff',
// };


const MainLayout = () => {
    return (
        <Layout>
            <Header style={headerStyle}>Header</Header>
            <Layout>
                {/*<Sider width="25%" style={siderStyle}>*/}
                {/*    Sider*/}
                {/*</Sider>*/}
                <Content style={contentStyle}><Outlet /></Content>
            </Layout>
        </Layout>
    )
}

export default MainLayout
