import React from 'react';
import './LabelList.css';
import {Table, Button, Input } from 'semantic-ui-react';

class LabelList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: ""}
    this.shouldComponentRender = this.shouldComponentRender.bind(this);
    this.handleAddLabel = this.handleAddLabel.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
  }

  updateTitle = title => {
    this.setState({title});
  }

  handleAddLabel = () => {
    if(this.state.title === "") {
      console.log("입력해주세요");
    } else {
      this.props.handleAddLabel(this.state.title);
      this.setState({title: ""});
    }
  }

  handleDeleteLabel = id => {

  }

  shouldComponentRender() {
    const { pending } = this.props;
    if (this.pending === false) return false;
    return true;
  }

  render() {
    const { labels, handleDeleteLabel, handleGetLabel } = this.props;
    if (!this.shouldComponentRender()) {
      return (
        <div className="LabelList">
        </div>
      );
    }
    return (
      <div className="LabelList">
        <LabelItems labels={labels} 
                    handleAddLabel={this.handleAddLabel} 
                    updateTitle={this.updateTitle} 
                    title={this.state.title}
                    handleDeleteLabel={handleDeleteLabel}
                    handleGetLabel={handleGetLabel}/>
      </div>
    );
  }
}


function LabelItem(props) {
  const title = props.title;
  return (
    <Table.Row>
      <Table.Cell className='active' onClick={e => props.handleGetLabel(props.id)}>
        <span>{title}</span><Button onClick={e => props.handleDeleteLabel(props.id)} icon='minus'/>
      </Table.Cell>
    </Table.Row>
  );
}

function LabelItems(props) {
  const labels = props.labels;
  const labelList = labels.map((label) =>
    <LabelItem key={label._id} 
                id={label._id} 
                title={label.title} 
                handleDeleteLabel={props.handleDeleteLabel}
                handleGetLabel={props.handleGetLabel}/>
  );
  return (
    <Table>
      <Table.Header>
      <Table.Row>
        <Table.HeaderCell >Label</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Input onChange={e => props.updateTitle(e.target.value)} value={props.title}/>
            <Button onClick={props.handleAddLabel} primary>입력</Button>
          </Table.Cell>
        </Table.Row>
        {labelList}
      </Table.Body>
    </Table>
  );
}

export default LabelList;