import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as deptAction from 'ActionsFolder/DepartmentActions';
import { Layout, Menu, Breadcrumb, Icon, Form, Input, Button, Radio, Popconfirm, Modal } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
const FormItem = Form.Item;
const confirm = Modal.confirm;
import DeptManagerInput from 'ComponentFolder/Form/DeptManagerInput';

class DeptForm extends React.Component {
  handleCreateSubmit = (e) => {
    e.preventDefault();
    const {createSubmitHandle} = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        createSubmitHandle(values);
      }
    });
  }
  handleUpdateSubmit = (e) => {
    e.preventDefault();
    const {updateSubmitHandle} = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.deptid = this.props.dept.deptid;
        updateSubmitHandle(values);
      }
    });
  }
  handleDelete = (dept) => {
    const {deleteHandle} = this.props;
    confirm({
      title: '删除提示',
      content: '是否删除？删除后将无法恢复！',
      onOk() {
        deleteHandle(dept);
      },
      onCancel() {
        console.log('Cancel');
      },
    });

  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
    const {parent, dept, depttree} = this.props;
    return (<Form className="ems_form" onSubmit={!dept.deptid ? this.handleCreateSubmit : this.handleUpdateSubmit}>
      <FormItem
      {...formItemLayout}
      label="部门名称"
      hasFeedback>
      {getFieldDecorator('deptName', {
        initialValue: dept && dept.deptName,
        rules: [{ required: true, message: '请输入部门名称' }],
      })(
        <Input />
      )}
      </FormItem>

      {dept.parentid != 0 && <FormItem {...formItemLayout} label="上级部门" hasFeedback>
        {getFieldDecorator('parentid', {
          initialValue: dept.deptid ? dept.parentid : parent.deptid,
          rules: [{ required: true, message: '请选择部门' }],
        })(
          <div>
          <Input type="hidden" />
          <Button>{parent.deptName}</Button>
          </div>
        )}
      </FormItem>
      }

      {dept.deptid &&
      <FormItem {...formItemLayout} label="主管" hasFeedback>
        {getFieldDecorator('user', {
          initialValue: dept.deptManagerUseridList,
          //rules: [{ required: true, message: '请选择成员' }],
        })(
          <DeptManagerInput deptid={dept.deptid} />
        )}
      </FormItem>
      }

      {
        !dept.deptid ?
        <div className="modal_foot">
          <div style={{textAlign: 'center'}}>
            <Button type="primary" size="large" htmlType="submit">保存</Button>
            <Button size="large" style={{marginLeft: '10px'}} onClick={::this.props.canalHandle}>取消</Button>
          </div>
        </div>
        :
        <div className="modal_foot">
          <div style={{textAlign: 'center'}}>
            <Button type="primary" size="large" htmlType="submit">保存修改</Button>

              <Button type="danger" size="large" style={{marginLeft: '10px'}} onClick={() => this.handleDelete(dept)}>删除</Button>
            {
              dept.parentid == 0
              ? <Button size="large" style={{marginLeft: '10px'}} onClick={::this.props.canalHandle}>取消</Button>
              : <Popconfirm title="删除后无法恢复，是否确认?" onConfirm={() => this.handleDelete(dept)} okText="确认删除" cancelText="取消">
                <Button type="danger" size="large" style={{marginLeft: '10px'}} >删除</Button>
              </Popconfirm>
            }
          </div>
        </div>
      }

    </Form>)
  }
}

// class DeptForm extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//
//   onClick() {
//
//   }
//
//
//   render() {
//     const {dept, parent, visible} = this.props;
//     const formItemLayout = {
//       labelCol: { span: 6 },
//       wrapperCol: { span: 14 },
//     };
//     console.log('parent', parent);
//     const WrappedCreateForm = Form.create()(CreateForm);
//     return (
//       <Drawer visible={visible} onClose={this.props.onClose}>
//         <div className="modal_head" onClick={this.onClick.bind(this)}>
//           添加部门
//         </div>
//         <div className="modal_body">
//           <div className="action_content">
//             部门信息
//           </div>
//           <WrappedCreateForm dept={dept}
//             parent={parent} depttree={this.props.depttree}
//             dispatch={this.props.dispatch}/>
//         </div>
//       </Drawer>
//     );
//   }
//
// }

DeptForm.propTypes = {
  canalHandle: PropTypes.func.isRequired,
  createSubmitHandle: PropTypes.func.isRequired,
  updateSubmitHandle: PropTypes.func.isRequired,
  deleteHandle: PropTypes.func.isRequired,
  parent: PropTypes.object.isRequired,
  dept: PropTypes.object,

};

module.exports = connect()(DeptForm);
