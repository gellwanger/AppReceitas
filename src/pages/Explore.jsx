import React, { Component } from 'react';
import Header from '../components/Header';

class Explore extends Component {
  constructor() {
    super();

    this.state = {
      showSearchBtn: false,
    };
  }

  render() {
    const { showSearchBtn } = this.state;

    return (
      <Header
        showSearchBtn={ showSearchBtn }
      >
        Explore
      </Header>
    );
  }
}

export default Explore;