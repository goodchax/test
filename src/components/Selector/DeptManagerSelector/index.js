import React from 'react';
import { Modal } from 'antd';
import { Input, Icon, Checkbox } from 'antd';
const Search = Input.Search;
// import * as userService from '../../services/user'
import styles from '../Selector.scss';

class DeptManagerSelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
      name: '',
      deptid: props.deptid || 0,
      userlist: [],
      checkedValues: props.checkedValues,
      checkedItems: props.checkedItems,
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      visible: nextProps.visible,
      deptid: nextProps.deptid,
      checkedValues: nextProps.checkedValues,
      checkedItems: nextProps.checkedItems,
    });
    if (nextProps.visible) {
      this.getUserList(nextProps.deptid, this.state.name);
    }
  }

  getUserList(deptid, name) {
    const _this = this;
    // userService.simplelist(deptid, name).then(function(value) { // success
		// 	const {hasMore, userlist} = value.data;
    //   _this.setState({
    //     userlist,
    //   })
		// }, function(value) { // failure
    //
		// });
  }

  handleChange(e) {
    const value = e.target.value;
    let {checkedValues, checkedItems, userlist} = this.state;
    const index = checkedValues.indexOf(value);
    //删除
    if (index != -1) {
      checkedValues = checkedValues.filter((id)=>{
        return id != value;
      });
      checkedItems = checkedItems.filter((item)=>{
        return item.userid != value;
      });
      this.setState({
        checkedValues,
        checkedItems,
      });
    } //添加
    else {
      checkedValues.push(value);
      checkedItems = userlist.filter((item)=>{
        return checkedValues.indexOf(item.userid) != -1;
      });
      this.setState({
        checkedValues,
        checkedItems,
      });
    }
  }

  onSearch(value) {
    // const value = e.target.value;
    const {deptid, name} = this.state;
    this.setState({
      name: value,
    });
    this.getUserList(deptid, value);
  }

  onOk(checkedValues, checkedItems) {
    this.props.onOk(checkedValues, checkedItems);
  }

  render() {
    const { visible, deptid, name, userlist, checkedValues, checkedItems } = this.state;
    return (
      <Modal
          visible={this.props.visible}
          onOk={()=>this.onOk(checkedValues, checkedItems)}
          onCancel={this.props.onCancel}
          width={700}>
          <div className={styles.selector_panel_box}>

            <div className={styles.selector_panel}>
              <div className={styles.title}>选择人员</div>
              <div className={styles.body}>
                <div className={styles.selector_input}>
                  <Search
                    placeholder="名称"
                    style={{ width: '100%' }}
                    onSearch={this.onSearch.bind(this)}
                  />
                </div>
                <div className={styles.selector_navbar}>
                  <div className={styles.selector_navbar_box}>
                    <div className={styles.selector_navbar_item}>
                      <span></span>
                      <span onClick={()=>this.handleChildren(0, '|0|')}>通讯录</span>
                    </div>
                  </div>
                </div>
                <div className={styles.selector_navbar}>
                  <input type="checkbox" style={{marginLeft: '5px'}} />
                  <span style={{  fontSize: '14px', paddingLeft: '10px'}}>全选</span>
                </div>
                <div style={{padding:'11px',paddingTop:'0',height:'255px',overflow:'auto'}}>
                  <ul>
                    {
                      userlist && userlist.map((item) => {
                        return <li className={styles.list_item} key={'w_'+item.userid}>
                          <label style={{position:'absolute', fontWeight:'100'}}>
                            <Checkbox value={item.userid}
                            onChange={this.handleChange.bind(this)}
                            checked={checkedValues.indexOf(item.userid)!=-1} />
                          </label>
                          <Icon type="folder-open" style={{color:'#38adff',fontSize:'14px',marginLeft:'23px'}} />
                          <span style={{paddingLeft: '5px'}}>{item.name}</span>

                        </li>
                      })
                    }
                  </ul>
                </div>
              </div>
          </div>

          <div className={styles.selector_panel}>
              <div className={styles.title}>已选人员</div>
              <div className={styles.body}>
                <div style={{padding:'11px',paddingTop:'0',height:'255px',overflow:'auto'}}>
                  <ul>
                  {
                    checkedItems && checkedItems.map((item) => {
                      return <li className={styles.list_item} key={'s_'+item.userid}>
                        <label style={{position:'absolute', fontWeight:'100'}}>
                          <Checkbox value={item.userid} onChange={this.handleChange.bind(this)} checked={true} />
                        </label>
                        <Icon type="folder-open" style={{color:'#38adff',fontSize:'14px',marginLeft:'23px'}} />
                        <span style={{paddingLeft: '5px'}}>{item.name}</span>
                      </li>
                    })
                  }
                  </ul>
                </div>
              </div>
          </div>
          <div style={{clear:'both'}}></div>
        </div>
      </Modal>
    )
  }
}

export default DeptManagerSelector;
