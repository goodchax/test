import React from 'react';
import { Layout } from 'antd';
const { Content } = Layout;

import Head from 'ComponentFolder/Common/Head';
import Foot from 'ComponentFolder/Common/Foot';

import styles from './common.scss';

class Main extends React.Component {
	constructor(props) {
    	super(props);
  	}
  	render (){
  		return (
		    <Layout>
          <Head />
	        <Content style={{padding: '10px 50px'}}>
	        	{this.props.children}
	        </Content>
          <Foot>Footer</Foot>
		    </Layout>
		  );
		}

}

module.exports = Main;
