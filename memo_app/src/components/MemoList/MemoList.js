import React from 'react';
import './MemoList.css';
import { Table, Button, Checkbox, TableCell } from 'semantic-ui-react';


class MemoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMemo: []
    };
    this.shouldComponentRender = this.shouldComponentRender.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  shouldComponentRender() {
    const { pending } = this.props;
    if (pending === false) return false;
    return true;
  }

  handleInputChange = (event) => {
    const target = event.target;
    if (target.type) {
      if(target.checked) {
        this.setState(state => {
          const selectedMemo = [...state.selectedMemo,target.id];
          console.log(selectedMemo);
          return {
            ...state,
            selectedMemo: selectedMemo
          };
        });
      } else {
        this.setState(state => {
          const selectedMemo = state.selectedMemo.filter(function(id){
            return target.id === id ? false : true;
          });
          console.log(selectedMemo);
          return {
            ...state,
            selectedMemo: selectedMemo
          };
        });
      }
    }
  }

  render() {
    const { memos, handlePack } = this.props;
    return (
      <div className="MemoList">
        <MemoItems memos= { memos } handlePack={handlePack} handleInputChange={this.handleInputChange} />
      </div>
    );
  }
}

// 메모
function MemoItem(props) {
  const {title} = props.memo;
  return (
    <Table.Row>
      <TableCell width='1'><Checkbox onChange={props.handleInputChange}  id={props.memo._id} /></TableCell>
      <Table.Cell width='16' onClick={e => props.handleGetMemo(props.memo._id)}>
        {title}
      </Table.Cell>
    </Table.Row>
  );
}

// 메모 리스트 
function MemoItems(props) {
  const memos = props.memos;
  const memoList = memos.map((memo) =>
    <MemoItem key={memo._id} memo={memo} handleGetMemo={props.handlePack.getMemo} handleInputChange={props.handleInputChange} />
  );
  return (
    <Table>
      <Table.Header>
      <Table.Row>
        <Table.HeaderCell colSpan='2' >MemoList 
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