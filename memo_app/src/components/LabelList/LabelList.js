import React from 'react';
import './LabelList.css';
import { Table, Button, Input } from 'semantic-ui-react';

class LabelList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "" }
    this.shouldComponentRender = this.shouldComponentRender.bind(this);
    this.handleAddLabel = this.handleAddLabel.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.handleSetTotal = this.handleSetTotal.bind(this);
  }

  updateTitle = title => {
    this.setState({ title });
  }

  handleAddLabel = () => {
    if (this.state.title === "") {
      console.log("입력해주세요");
    } else {
      this.props.handleAddLabel(this.state.title);
      this.setState({ title: "" });
    }
  }

  handleDeleteLabel = id => {

  }

  handleSetTotal = () => {
    const { handlePack } = this.props;
    handlePack.setLabelId();
    handlePack.fetchMemos();
  }

  shouldComponentRender() {
    const { pending } = this.props;
    if (this.pending === false) return false;
    return true;
  }

  render() {
    const { labelStore, handlePack, totalMemoLength } = this.props;
    if (!this.shouldComponentRender()) {
      return (
        <div className="LabelList">
        </div>
      );
    }
    return (
      <div className="LabelList">
        <LabelItems labelStore={labelStore}
          handleAddLabel={this.handleAddLabel}
          updateTitle={this.updateTitle}
          title={this.state.title}
          handlePack={handlePack}
          handleSetTotal={this.handleSetTotal}
          totalMemoLength={totalMemoLength}
          />
      </div>
    );
  }
}

// 각 라벨
function LabelItem(props) {
  return (
    <Table.Row>
      <Table.Cell className={props.label.selected ? 'active' : ''} onClick={e => props.handleGetLabel(props.label._id)}>
        <span>{props.label.title}({props.length})</span>
        <Button onClick={e => props.handleDeleteLabel(props.id)} icon='minus' className='right floated mini red'/>
      </Table.Cell>
    </Table.Row>
  );
}

// 라벨 리스트
function LabelItems(props) {
  const labels = props.labelStore.labels;
  // 라벨중에 선택된게 없으면 전체가 선택되었음을 의미한다.
  const selectedTotal = labels.filter(label => label.selected).length === 0;
  const labelList = labels.map((label) =>
    <LabelItem key={label._id}
      label={label}
      length={label.memos.length}
      handleDeleteLabel={props.handlePack.deleteLabel}
      handleGetLabel={props.handlePack.getLabel} />
  );
  
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell >LabelList</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Input onChange={e => props.updateTitle(e.target.value)} value={props.title} />
            <Button onClick={props.handlePack.handleAddLabel} primary>입력</Button>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell className={selectedTotal ? 'active':''} onClick={props.handleSetTotal}>
            {/* 전체 메모 */}
            Total({props.totalMemoLength})
          </Table.Cell>
        </Table.Row>
        {/* 라벨 리스트 */}
        {labelList}
      </Table.Body>
    </Table>
  );
}

export default LabelList;