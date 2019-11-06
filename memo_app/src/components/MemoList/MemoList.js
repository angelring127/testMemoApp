import React from 'react';
import './MemoList.css';
import { Table, Button, Checkbox, TableCell, Modal, Select } from 'semantic-ui-react';


class MemoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMemo: [],
      open: false,
      selectedLabel: null,
      modalTitle: 'Setting Label',
      modalComment: '메모에 라벨을 설정하시겠습니까?',
    };
    this.shouldComponentRender = this.shouldComponentRender.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.show = this.show.bind(this);
    this.close= this.close.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  shouldComponentRender() {
    const { pending } = this.props;
    if (pending === false) return false;
    return true;
  }

  handleInputChange = (event) => {
    const target = event.target;
    if (target.type === 'checkbox') {
      if(target.checked) {
        this.setState(state => {
          const selectedMemo = [...state.selectedMemo,target.id];
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
          return {
            ...state,
            selectedMemo: selectedMemo
          };
        });
      }
    } else if (target.type == 'submit') {
      if(this.state.selectedLabel !== null && this.state.selectedMemo.length > 0) {
        const { handlePack } = this.props;
        handlePack.setLabel(this.state.selectedLabel,this.state.selectedMemo);
      }
      this.setState({ open: false })
    } 
  }

  handleSelect = (event, {value}) => {
    this.setState({selectedLabel:value});
    console.log(this.state);
  }

  show = () => this.setState({ open: true, })
  close = () => this.setState({ open: false })

  render() {
    const { open } = this.state
    const { memos, handlePack, labels } = this.props;
    const labelOptions = labels.map(function (label) {
      return {
        key: label._id,
        value: label._id,
        text: label.title
      }
    });
    const selectList = <Select placeholder='Select Label' options={labelOptions} onChange={this.handleSelect}/>;
    
    return (
      <div className="MemoList">
        <MemoItems memos= { memos } handlePack={handlePack} handleInputChange={this.handleInputChange} showModal={this.show}/>
        <Modal size='mini' open={open} onClose={this.close}>
          <Modal.Header>{this.state.modalTitle}</Modal.Header>
          <Modal.Content>
            <p>{ this.state.modalComment }</p>
            { selectList }
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.close}>No</Button>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content='Yes'
              onClick={this.handleInputChange}
              name='setLabel'
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

// 메모
function MemoItem(props) {
  const {title} = props.memo;
  return (
    <Table.Row>
      <TableCell width='1'><Checkbox onChange={props.handleInputChange}  id={props.memo._id} name='checkbox' /></TableCell>
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
          <Button icon='delete'
                  className='right floated mini red'
                  onClick={props.showModal}/>
          <Button icon='setting'
                  className='right floated mini'
                  onClick={props.showModal}/>
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