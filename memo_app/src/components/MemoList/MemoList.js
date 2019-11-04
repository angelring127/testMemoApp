import React from 'react';
import './MemoList.css';
import { Table, Button } from 'semantic-ui-react';


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
    const { memos, handlePack } = this.props;
    console.log(this.props);
    return (
      <div className="MemoList">
        <MemoItems memos= { memos } handlePack={handlePack} />
      </div>
    );
  }
}

// 메모
function MemoItem(props) {
  const {title} = props.memo;
  return (
    <Table.Row>
      <Table.Cell onClick={e => props.handleGetMemo(props.memo._id)}>
        {title}
      </Table.Cell>
    </Table.Row>
  );
}

// 메모 리스트 
function MemoItems(props) {
  const memos = props.memos;
  const memoList = memos.map((memo) =>
    <MemoItem key={memo._id} memo={memo} handleGetMemo={props.handlePack.getMemo} />
  );
  return (
    <Table>
      <Table.Header>
      <Table.Row>
        <Table.HeaderCell >MemoList 
          {/* 새로운 메모 등록 화면 이동 */}
          <Button icon='plus' 
                  className='right floated mini'
                  onClick= {e => props.handlePack.isCreateMemo(true)}/>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>
      <Table.Body>
        {memoList}
      </Table.Body>
    </Table>
  );
}

export default MemoList;