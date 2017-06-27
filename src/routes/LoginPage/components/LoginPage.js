'use strict'
import auth from '../../../api/auth';
import React, {PropTypes} from 'react';
import {Link, withRouter} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import {fromJS, is} from 'immutable';
import * as ompActions from 'ActionsFolder/OmpActions';

import { Form, Icon, Input, Button, Checkbox, message, Carousel } from 'antd';
const FormItem = Form.Item;

import Styles from './LoginPage.scss';


class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const {onSigninHandler} = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onSigninHandler(values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入您的手机号!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="手机号" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入您的密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </FormItem>
      </Form>
    );
  }
}

class NormalAuthForm extends React.Component {
  constructor(props) {
  	super(props)
  	this.next = this.next.bind(this)
  	this.previous = this.previous.bind(this)
    this.state = {
      orgid: this.props.orgAdmin[0].orgid
    }
  }
  next() {
  	this.slider.refs.slick.slickNext()
  }
  previous() {
  	this.slider.refs.slick.slickPrev()
  }
  slickAfterChange(current) {
    const orgid = this.props.orgAdmin[0].orgid;
    this.setState({
      orgid
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const {onAuthHandler} = this.props;
    const {orgid} = this.state;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.orgid = orgid;
        onAuthHandler(values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;

    const settings = {
      dots: false,
      effect: 'fade',
    };
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">

        <Carousel {...settings} ref={c => this.slider = c } afterChange={this.slickAfterChange.bind(this)}>
          {
            this.props.orgAdmin.map(function(item) {
              return <div key={item.orgid}>
                      <Icon type="api" className="icon-omp" />
                      <h3>{item.orgName}</h3>
                    </div>
            })
          }
        </Carousel>
        <div className="switch">
          <Icon type="left" className="previous" onClick={this.previous} />
          <Icon type="right" className="next" onClick={this.next} />
        </div>
        <FormItem>
          {getFieldDecorator('pwd', {
            rules: [{ required: true, message: '请输入您的密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
const WrappedNormalAuthForm = Form.create()(NormalAuthForm);

class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errMsg: ""
    }
  }

  componentDidMount() {

  }

  componentWillMount() {
    if (auth.loggedIn()) {
      this.props.router.replace('/');
    }
  }

  onSigninHandler(values) {
    const {actions, router} = this.props;
    actions.signin(Object.assign({}, values), (check, errMsg) => {
      message.error(errMsg, 2);
    })
  }

  onAuthHandler(values) {
    const {actions} = this.props;
    const getCorpAccessToken = this.getCorpAccessToken.bind(this);
    actions.login_with_pwd(Object.assign({}, values), (check, errMsg) => {
      if (check) {
        message.error(errMsg, 2);
      }
      else {
        getCorpAccessToken(errMsg);
      }
    })
  }

  getCorpAccessToken(json) {
    const {actions, router} = this.props;
    const {tmp_login_code} = json;
    actions.get_corp_token(tmp_login_code, (check, message) => {
      if (check) {
        message.error(message, 2);
      } else {
        router.replace('/');
      }
    })
  }


  render() {
    const {actions, step, orgAdmin} = this.props;
    return (
      <div className="login">
        <h3>登录</h3>
        <div>
          {step == 'sns_login' && <WrappedNormalLoginForm onSigninHandler={this.onSigninHandler.bind(this)} />}
          {step == 'corp_login' && <WrappedNormalAuthForm onAuthHandler={this.onAuthHandler.bind(this)} orgAdmin={orgAdmin} />}
        </div>
      </div>
    );
  }
}

LoginPage.PropTypes = {

};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ompActions, dispatch)
  };
}

const mapStateToProps = (state, ownProps) => {
  const {step, orgAdmin} = state.omp.toJS();
  let obj = {
    step,
    orgAdmin
  }

  //返回一个新的Object作为Component的Props
  return obj;
}


module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginPage));
