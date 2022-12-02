import {Layout, Menu, MenuProps} from 'antd';
import React from 'react';
import './App.css';
import {Link, Outlet, useLocation} from "react-router-dom";

const {Header, Content} = Layout;

const items: MenuProps['items'] = [
    {label: <Link to="/">Battles</Link>, key: '/'},
    {label: <Link to="/comments">Comments</Link>, key: '/comments'}
];

function App() {
    const location = useLocation();
    return (
        <Layout className="layout" style={{minWidth: '800px'}}>
            <Header>
                <span className="plugin-name">WP Battle</span>
                <Menu
                    theme="light"
                    mode="horizontal"
                    items={items}
                    style={{minWidth: '190px'}}
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
