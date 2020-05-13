import React from 'react';
import {Layout} from 'antd';
import HeaderCustom from "./Layout/HeaderCustom/HeaderCustom";
import ContentCustom from "./Layout/ContentCustom/ContentCustom";
import {BrowserRouter as Router} from "react-router-dom";
import './App.less';

function App() {
    return (
        <div className="App">
            <Router>
                <Layout className="page-layout">
                    <HeaderCustom/>
                    <ContentCustom/>
                </Layout>
            </Router>

        </div>
    );
}

export default App;
