import {Layout, Menu, MenuProps} from 'antd';
import React from 'react';
import './App.css';
import {Link, Outlet, useLocation} from "react-router-dom";

const {Header, Content} = Layout;

const items: MenuProps['items'] = [
    {label: <Link to="/">Battles</Link>, key: '/'},
    {label: <Link to="/comments">Comments</Link>, key: '/comments'},
    {label: <Link to="/tools">Settings</Link>, key: '/tools'},
];

function App() {
    const location = useLocation();
    return (
        <Layout className="layout">
            <Header>
                <span className="plugin-name">WP Battle</span>
                <Menu
                    theme="light"
                    mode="horizontal"
                    items={items}
                    defaultSelectedKeys={[location.pathname]}
                    selectedKeys={[location.pathname]}
                />
            </Header>
            <Content>
                <Outlet/>
            </Content>
        </Layout>
    );
}

export default App;
