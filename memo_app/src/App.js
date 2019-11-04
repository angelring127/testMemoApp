import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import {LabelsContainer, MemosContainer, MemoContainer } from './containers';


class App extends Component {
  render() {
    return (
      <div className="App">
        <LabelsContainer className='ui'/>
        <MemosContainer />
        <MemoContainer />
      </div>
    );
  }
}

export default App;