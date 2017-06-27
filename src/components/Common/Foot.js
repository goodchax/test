'use strict'


import React, {PropTypes} from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;

import styles from './common.scss';

class Foot extends React.Component {
  render() {
    return (
      <Footer>Footer</Footer>
    );
  }
}

module.exports = Foot;
