'use strict'


import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Layout, Menu, Tree, Button, Icon, Form, Table} from 'antd';
const { Sider, Content } = Layout;
const TreeNode = Tree.TreeNode;
import * as deptAction from 'ActionsFolder/DepartmentActions';
import Main from 'ComponentFolder/Common/Main';
import DeptForm from './DeptForm';
import Drawer from 'ComponentFolder/Drawer';

import styles from './DepartmentPage.scss';

class DepartmentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deptid: 0,
      visible: false,
      parent: {},
      expandedKeys: [],
    };
  }

  getDeptTree() {
    const {deptActions: {getDeptTree}} = this.props;
    getDeptTree && getDeptTree();
  }

  getDeptList(deptid) {
    const {deptActions: {getDeptList}} = this.props;
    getDeptList && getDeptList(deptid);
  }

  getDept(deptid) {
    const {deptActions: {getDept}} = this.props;
    getDept && getDept(deptid);
  }

  getUserList(deptid) {
    const {deptActions: {getUserList}} = this.props;
    getUserList && getUserList({deptid, size:20, offset:0});
  }

  componentWillMount(props) {
  }

  componentWillReceiveProps(nextProps) {
	}

  componentDidMount() {
    const {deptid} = this.state;
    this.getDeptTree();
    this.getDeptList(-1);
    this.getDept(deptid);
    this.getUserList(deptid);
  }
  //树状图被选中
  onSelect(info) {
		if (info && info.length>0) {
			//展开ID列表
			var expandedKeys = this.state.expandedKeys;
			expandedKeys.push(info[0]);
			this.setState({
				expandedKeys
			})
			this.getDept(info[0]);
      this.getDeptList(info[0]);
		} else {
		  return true;
		}
	}
  //添加
  onAddDept() {
    this.setState({
      visible: true,
      department: {},
      parent: this.props.dept,
    })
  }
  //修改
  onEditDept() {
    const {deptActions: {getParent}, dept} = this.props;
    const _this = this;
    if (dept.parentid != 0) {
  		getParent(dept.parentid, function(parent) {
        _this.setState({
          department: dept,
          parent,
          visible: true
        })
      });
    } else {
      _this.setState({
        visible: true,
        department: dept,
        parent: {}
      })
    }
  }
  //添加部门
  deptCreateSubmitHandle(values) {
    const {deptActions: {createDept, getDeptList, getDeptTree, getUserList}, dept} = this.props;
    createDept && createDept(values, () => {
      getDeptTree();
      getDeptList(dept.deptid);
    });
  }
  //修改
  deptUpdateSubmitHandle(values) {
    const {deptActions: {updateDept, getDeptList, getDeptTree, getDept}, dept} = this.props;
    updateDept && updateDept(values, () => {
      getDeptTree();
      getDeptList(dept.deptid);
      getDept(dept.deptid);
      this.setState({
        visible: false
      })
    });
  }
  //删除
  deptDeleteHandle(dept) {
    const {deptActions: {getDeptList, getDeptTree, getDept, deleteDept}} = this.props;
    deleteDept && deleteDept(dept.deptid, () => {
      getDeptTree();
      getDeptList(dept.deptid);
      getDept(dept.deptid);
      this.setState({
        visible: false
      })
    });
  }
  //表单关闭
  formCloseHandle() {
    this.setState({
      visible: false
    })
  }

  render() {
    const {depttree, deptlist, dept, users} = this.props;
    const {parent, visible, department} = this.state;
    const deptchild = deptlist && deptlist.map((item) => {
      return <div className="drag_drop_dept_item" key={item.deptid}>
        <div className="name">
          <span>{item.deptName}</span>
          <span> ({item.userNum}人)</span>
        </div>
        <div className="number">
          <Icon type="right" />
        </div>
      </div>
    });
    //表单
    const WrappedDeptForm = Form.create()(DeptForm);
    //树状图设置
    const {expandedKeys} = this.state || [];
    const autoExpandParent = true;
    //树状图
    const loop = function(data) {
	      return data && data.map((item) => {
	        if (item.subDeptNum > 0 && item.department) {
	          return <TreeNode title={item.deptName+'('+item.userNum+'人)'} key={item.deptid}>{loop(item.department)}</TreeNode>;
	        }
	        return <TreeNode title={item.deptName+'('+item.userNum+'人)'} key={item.deptid} isLeaf={item.subDeptNum === 0} />;
	      });
	    }
		const treeNodes = loop(depttree);
    //用户列表
    const rowSelection = {
		  onChange: (selectedRowKeys, selectedRows) => {
		    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
		  },
		  onSelect: (record, selected, selectedRows) => {
		    console.log(record, selected, selectedRows);
		  },
		  onSelectAll: (selected, selectedRows, changeRows) => {
		    console.log(selected, selectedRows, changeRows);
		  },

		};
    return (
      <Main>
        <Layout className="department">
          <Sider width="260" className="left" style={{ minHeight: document.documentElement.clientHeight - 200 }}>
            <Button.Group size="large" style={{width: '100%', marginTop: '20px'}}>
              <Button type="primary" style={{width: '50%', textAlign: 'center'}}>组织机构</Button>
              <Button style={{width: '50%', textAlign: 'center'}} onClick={()=>this.onClickView('role')}>角色</Button>
            </Button.Group>
            <Tree className="depttree" onSelect={::this.onSelect} autoExpandParent={true} defaultExpandedKeys={expandedKeys}>{treeNodes}</Tree>
          </Sider>
          <Content className="right">
            <div>
              <div className="contact_header">
                <span className="span">{dept.deptName}</span>
                {
                  dept.parentid == 0
                  ? <Button className="set" size="small" onClick={::this.onEditDept}>设置</Button>
                  : <Button className="set" size="small" onClick={::this.onEditDept}>编辑部门</Button>
                }
              </div>
              <div className="deptchild">
                  <div className="title">
                    <Icon type="share-alt" />
                    <span className="span">下级部门</span>
                  </div>
                  <div className="action_content">
                    <Button type="primary" onClick={::this.onAddDept}>添加子部门</Button>
                    <Button type="primary" disabled style={{margin:'0 0 0 10px'}}>调整位置</Button>
                  </div>
                  <div className="dragDropDept">
                    {deptchild}
                  </div>
              </div>
              {
                visible &&
                <Drawer visible={visible} onCloseHandle={::this.formCloseHandle}>
                  <div className="modal_head">
                    添加部门
                  </div>
                  <div className="modal_body">
                    <div className="action_content">
                      部门信息
                    </div>
                    <WrappedDeptForm dept={department}
                      parent={parent} canalHandle={::this.formCloseHandle}
                      createSubmitHandle={::this.deptCreateSubmitHandle}
                      updateSubmitHandle={::this.deptUpdateSubmitHandle}
                      deleteHandle={::this.deptDeleteHandle}/>
                  </div>
                </Drawer>
              }
            </div>
            //成员列表
            <div className="user">
              <div className="title">
                	<Icon type="user" />
                	<span className="span">部门成员</span>
                </div>
                <div className="action_content">
                  <Button type="primary">添加成员</Button>
                  <Button className="ml10">批量导入/导出</Button>
                	<Button type="danger" className="ml10">删除成员</Button>
                </div>
                <div>
                	<Table columns={columns}
          	        rowKey={record => record.userid}
          	        rowSelection={rowSelection}
          	        dataSource={users.userlist}
                    // onRowClick={this.onRowClick.bind(this)}
          	        pagination={false}
          	        loading={false}
          	        // onChange={this.handleTableChange}
          	      />
                </div>

            </div>
          </Content>
        </Layout>
      </Main>
    );
  }
}


DepartmentPage.PropTypes = {

};

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

function mapDispatchToProps(dispatch) {
  return {
    deptActions: bindActionCreators(deptAction, dispatch)
  };
}

const mapStateToProps = (state, ownProps) => {
  const {depttree, deptlist, dept, users} = state.dept.toJS();
  let obj = {
    depttree,
    deptlist,
    dept,
    users,
  };

  //返回一个新的Object作为Component的Props
  return obj;
}


module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(DepartmentPage);
// module.exports = DepartmentPage;
