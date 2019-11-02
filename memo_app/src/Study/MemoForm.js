import React from 'react';
import AdminLTE, { Content, Row, Col, Box, Button } from 'adminlte-2-react';

class MemoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    // Todo validation 추가
    // memo api추가
    alert('Success insert memo' + this.state.title);
    event.preventDefault();
  }


  render() {
    return (
      <Box title="Add Memo" type="primary" closable collapsable footer={<Button type="success" text="Add" onClick={this.handleSubmit} />}>
        <div className="form-group">
          <label for="title">Title</label>
          <input type="text" className="form-control" value={this.state.title} onChange={this.handleInputChange} name="title" />
        </div>
        <div className="form-group">
          <label for="content">Content</label>
          <textarea className="form-control" value={this.state.title} onChange={this.handleInputChange} name="content" />
        </div>
      </Box>
    );
  }
}


export default MemoForm;