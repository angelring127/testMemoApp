import React from 'react';
import MemoItem from './MemoItem';
import { Table, Button, Checkbox, TableCell, Modal, Select } from 'semantic-ui-react';

// 메모 리스트 
function MemoItems(props) {
    const memos = props.memos;
    const memoList = memos.map((memo) =>
      <MemoItem key={memo._id} memo={memo} handleGetMemo={props.handlePack.getMemo} handleInputChange={props.handleInputChange} />
    );
    const btnDelete = props.selectedLabelId !== null ? 
      <Button icon='delete' className='right floated mini red' onClick={() => props.showModal(1)}/> : null ;
    return (
      <Table>
        <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan='2' >MemoList 
            {/* 새로운 메모 등록 화면 이동 */}
            { btnDelete }
            <Button icon='setting'
                    className='right floated mini'
                    onClick={() => props.showModal(0)} />
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

  export default MemoItems