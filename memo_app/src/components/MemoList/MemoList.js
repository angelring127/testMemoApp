import React from 'react';
import './MemoList.css';
import MemoItems from './MemoItems';
import { Table, Button, Checkbox, TableCell, Modal, Select } from 'semantic-ui-react';


/* 
* 메모리스트 컴포턴트
* 각 라벨,전체, 메모 리스트를 표시
*
*
*
*/
class MemoList extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedLabel: null,
      modal: 0,
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

  /**
   * 메모 다중선택, 라벨에 다중 메모 입력, 라벨에서 다중 메모 삭제
    */
  handleInputChange = (event) => {
    const target = event.target;
    const { handlePack, labelsStore, memosStore } = this.props;

    if (target.type === 'checkbox') {
      // 체크 설정
      const currentMemoList = memosStore.memos.map(function(memo){
        if (target.checked) {
          memo.checked = memo._id === target.id ? true : memo.checked;
        } else {
          memo.checked = memo._id === target.id ? false : memo.checked;
        }
        return memo;
      });
      handlePack.fetchMemosSuccess(currentMemoList);

    } else if (target.type === 'submit') {
      const selectedMemoIdList = memosStore.memos.filter(memo => memo.checked).map(memo => memo._id);

      if(this.state.selectedLabel !== null && selectedMemoIdList.length > 0) {
        // 체크한 리스트 선택된 라벨에 넣음
        if ( this.state.modal === 0 ) {
          handlePack.setLabel(this.state.selectedLabel,selectedMemoIdList);
        }
      } else if (selectedMemoIdList.length > 0) {
        // 체크한 리스트 라벨에서 삭제
        handlePack.deleteMemos(labelsStore.selectedLabelId,selectedMemoIdList);
      }
      this.setState({ open: false })
    } 
  }

  handleSelect = (event, {value}) => {
    this.setState({selectedLabel:value});
  }

  // modal handler
  show = (modalValue) => this.setState({ open: true, modal: modalValue })
  close = () => this.setState({ open: false })

  render() {
    const { open } = this.state
    const { memosStore, handlePack, labelsStore, selectedMemoIds } = this.props;
    const labelOptions = labelsStore.labels.map(function (label) {
      return {
        key: label._id,
        value: label._id,
        text: label.title
      }
    });
    const selectList = <Select placeholder='Select Label' options={labelOptions} onChange={this.handleSelect}/>;
    
    return (
      <div className="MemoList">
        <MemoItems selectedLabelId={labelsStore.selectedLabelId} memos= { memosStore.memos } handlePack={handlePack} handleInputChange={this.handleInputChange} showModal={this.show}/>
        <Modal size='mini' open={open} onClose={this.close}>
          <Modal.Header>{memosStore.modalTitle[this.state.modal]}</Modal.Header>
          <Modal.Content>
            <p>{ memosStore.modalMessage[this.state.modal]}</p>
            { (this.state.modal === 0) ? selectList : null  }
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

export default MemoList;