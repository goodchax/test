import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { fromJS } from 'immutable';
import { message } from 'antd';
import * as CommonActions from 'ActionsFolder/CommonActions';
class App extends React.Component {

  constructor (props, context) {
    super(props, context)
  }

  componentWillMount() {

  }

  componentDidMount() {}

  render(){
    const { msg, loading, commonActions } = this.props;
    const duration = 2000;
    if (msg.content) {
      switch (msg.type) {
        case 'success':
            message.success(msg.content, duration);
            commonActions.hideMsg();
          break;
        case 'error':
            message.error(msg.content, duration);
            commonActions.hideMsg();
          break;
        case 'warning':
            message.warning(msg.content, duration);
            commonActions.hideMsg();
          break;
        default:

      }
    }
    return (
        <div className="App" style={{height:'100%'}}>
          {this.props.children}
        </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.any
};


function mapStateToProps(state, ownProps) {
  const {common:{msg, loading}} = fromJS(state).toJS();
  return {
    msg,
    loading,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    commonActions: bindActionCreators(CommonActions, dispatch),
  };
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
