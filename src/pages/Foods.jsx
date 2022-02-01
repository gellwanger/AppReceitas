import React, { Component } from 'react';
import Header from '../components/Header';

class Foods extends Component {
  constructor() {
    super();

    this.state = {
      showSearchBtn: true,
    };
  }

  render() {
    const { showSearchBtn } = this.state;

    return (
      <Header
        showSearchBtn={ showSearchBtn }
      >
        Foods
      </Header>
    );
  }
}

export default Foods;