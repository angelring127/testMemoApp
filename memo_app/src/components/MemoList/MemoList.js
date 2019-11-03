import React from 'react';
import './MemoList.css';
import Header from '../Header/Header';
import * as service from '../../services/API';

class MemoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postId: 1,
      fetching: false, // tells whether the request is waiting for response or not
      post: {
        title: null,
        body: null
      },
      labels: [],
      warningVisibility: false
    };
  }



  componentDidMount() {
    // console.log('fetchMemoList');
    this.fetchMemoList();
  }

  showWarning = () => {
    this.setState({
      warningVisibility: true
    });

    // after 1.5 sec

    setTimeout(
      () => {
        this.setState({
          warningVisibility: false
        });
      }, 1500
    );
  }

  fetchMemoList = async () => {
    this.setState({
      fetching: true
    });

    try {
      const res = await Promise.all([service.getMemos()]);
      
      this.setState({
        labels: res[0].data,
        fetching: false  //done!;
      });
    } catch (error) {
      
    }
  }

  render() {
    return (
      <div className="MemoList">
        <Header title="Memo"/>
      </div>
    );
  }
}

export default MemoList;