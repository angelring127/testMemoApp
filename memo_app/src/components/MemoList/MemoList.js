import React from 'react';
import './MemoList.css';
import { Table } from 'semantic-ui-react';


class MemoList extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentRender = this.shouldComponentRender.bind(this);
  }

  shouldComponentRender() {
    const { pending } = this.props;
    if (pending === false) return false;
    return true;
  }

  render() {
    const { memos } = this.props;
    return (
      <div className="MemoList">
        <MemoItems memos= { memos }/>
      </div>
    );
  }
}


function MemoItem(props) {
  const {title} = props.memo;
  return (
    <Table.Row>
      <Table.Cell>
        {title}
      </Table.Cell>
    </Table.Row>
  );
}

function MemoItems(props) {
  const memos = props.memos;
  const memoList = memos.map((memo) =>
    <MemoItem key={memo._id} memo={memo} />
  );
  return (
    <Table>
      <Table.Header>
      <Table.Row>
        <Table.HeaderCell >MemoList</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
      <Table.Body>
        {memoList}
      </Table.Body>
    </Table>
  );
}

export default MemoList;