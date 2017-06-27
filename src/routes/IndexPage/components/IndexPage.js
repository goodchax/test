'use strict'


import React, {PropTypes} from 'react';
import Main from 'ComponentFolder/Common/Main';
import styles from './IndexPage.scss';
import { Layout, Menu, Breadcrumb, Icon, Form, Input, Button, Radio, Table, Popconfirm, Modal } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
const FormItem = Form.Item;
const confirm = Modal.confirm;
class IndexPage extends React.Component {
  clickHandle() {
    confirm({
      title: '删除提示',
      content: '是否删除？删除后将无法恢复！',
      onOk() {
        // deleteHandle(dept);
        console.log('ok');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  render() {
    return (
      <Main>
        <Popconfirm title="删除后无法恢复，是否确认?" onConfirm={() => this.handleDelete(dept)} okText="确认删除" cancelText="取消">
          <Button type="danger" size="large" style={{marginLeft: '10px'}} >删除</Button>
        </Popconfirm>
        <Button type="danger" size="large" style={{marginLeft: '10px'}} onClick={::this.clickHandle}>删除</Button>

        <Table columns={columns}
          // onRowClick={this.onRowClick.bind(this)}
          pagination={false}
          loading={false}
          // onChange={this.handleTableChange}
        />
      </Main>
    );
  }
}
const columns = [{
  title: '姓名',
  dataIndex: 'name'
}, {
  title: '职位',
  dataIndex: 'workPlace',
  width: '20%',
}, {
  title: '工号',
  dataIndex: 'jobnumber',
}, {
  title: '手机号',
  dataIndex: 'mobile',
}, {
  title: '邮箱',
  dataIndex: 'email',
}];
module.exports = IndexPage;
