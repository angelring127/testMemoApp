import React from 'react';
import './LabelList.css';
import Header from '../Header/Header';
import * as service from '../../services/API';

class LabelList extends React.Component {
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
    console.log('fetchLabelList');
    this.fetchLabelList();
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

  fetchLabelList = async () => {
    this.setState({
      fetching: true
    });

    try {
      const res = await Promise.all([service.getLabels()]);

      this.setState({
        labels: res[0].data,
        fetching: false  //done!;
      })
      console.log(this.state.labels);
    } catch (error) {
      
    }
  }

  render() {
    return (
      <div className="LabelList">
        <Header title="Label"/>
      </div>
    );
  }
}

export default LabelList;