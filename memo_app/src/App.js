import React, { Component } from 'react';
import { LabelList, MemoList} from './components'


class App extends Component {
  render() {
    return (
      <div>
        <LabelList />
        <MemoList/>
      </div>
    );
  }
}

export default App;