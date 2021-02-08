import React from 'react';
import {Layout, Menu} from 'antd';
import {
    Link
} from "react-router-dom";

import '../../App.less';

const {Header} = Layout;
const {SubMenu} = Menu;

/**
 * Header component which contains two submenues with links to different routes: movie discover/search and series discover/search
 *
 */

function HeaderCustom() {
    return (
        <Header className="header">
            <span className="header-title">React Movie</span>
            <Menu mode="horizontal" className="header-menu">
                <SubMenu title="Movies" className="header-menu-item">
                    <Menu.Item>
                        <Link to={'/movie-discover'}>Discover popular</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to={'/movie-search'}>Search</Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu title="Series" className="header-menu-item">
                    <Menu.Item>
                        <Link to={'/series-discover'}>Discover popular</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to={'/series-search'}>Search</Link>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </Header>
    );
}

export default HeaderCustom;