'use strict'


import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import { Layout, Menu, Icon } from 'antd';
const { Header } = Layout;

import styles from './common.scss';

class Head extends React.Component {
  render() {
    return (
      <Header>
        <div className="logo">logo</div>
        <div className="menu">
          <Menu
          theme="dark"
          mode="horizontal"
          // defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1"><Link to="/index">首页</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/contacts">通讯录</Link></Menu.Item>
          </Menu>
        </div>
        <div className="loginview">
            <Icon type="user" />aoxiang
        </div>
      </Header>
    );
  }
}

module.exports = Head;
