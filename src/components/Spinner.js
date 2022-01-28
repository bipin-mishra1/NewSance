import React, { Component } from 'react';
import infinity from '../Infinity.gif';
export class Spinner extends Component {
  render() {
    return <div className='text-center'>
      <img src={infinity} alt="..."/>
    </div>;
}
}

export default Spinner;
