import React from 'react';
import styles from './index.scss';
// import * as userService from '../../services/user'
import DeptManagerSelector from 'ComponentFolder/Selector/DeptManagerSelector';

class DeptManagerInput extends React.Component {

  constructor(props) {
    super(props);
    const checkedValues = props.value || [];
    var checkedItems = [];
    this.state = {
      visible: false,
      deptid: props.deptid,
      checkedValues,
      checkedItems,
    };
    this.getUserList(props.deptid, '');
  }

  getUserList(deptid, name) {
    const _this = this;
    let {checkedValues, checkedItems} = this.state;
    if (checkedValues.length > 0) {
      // userService.simplelist(deptid, name, checkedValues.join(',')).then(function(value) { // success
  		// 	const {hasMore, userlist} = value.data
      //   _this.setState({
      //     checkedItems: userlist,
      //   })
  		// }, function(value) { // failure
      //
  		// });
    }
  }

  onClick() {
    this.setState({
      visible: true,
    })
  }

  onChange(checkedValues, checkedItems) {
    const onChange = this.props.onChange;
    if (onChange) {
      // onChange(Object.assign({}, this.state, checkedValues));
      onChange(checkedValues);
    }
    this.setState({
      visible: false,
      checkedValues,
      checkedItems,
    })
  }

  onCancel() {
    this.setState({
      visible: false,
    })
  }

  render() {
    const { deptid, userlist, checkedValues, checkedItems } = this.state;
    return (
      <span className="slans_dept_manager_input">
        <ul onClick={this.onClick.bind(this)} className="slans_dept_select_input">
          {
            checkedItems && checkedItems.map((item)=>{
              return <li key={item.userid}>
                <span>{item.name}</span>
                <input type="hidden" key={item.userid} value={item.userid} />
              </li>
            })
          }
        </ul>
        <DeptManagerSelector visible={this.state.visible}
          onOk={this.onChange.bind(this)}
          onCancel={this.onCancel.bind(this)}
          checkedValues={checkedValues}
          checkedItems={checkedItems}
          userlist={userlist}
          deptid={deptid}
        />
      </span>
    );
  }

}


export default DeptManagerInput;
