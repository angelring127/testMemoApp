import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import LabelsContainer from './containers/LabelsContainer';
import MemoContainer from './containers/MemoContainer';


class App extends Component {
  render() {
    return (
      <div className="App">
        <LabelsContainer className='ui'/>
        <MemoContainer />
      </div>
    );
  }
}

export default App;