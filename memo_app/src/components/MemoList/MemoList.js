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
      selectedMemo: [],
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

  handleInputChange = (event) => {
    const target = event.target;
    if (target.type === 'checkbox') {
      // 체크유무에 따라 selectedMemo에 넣음
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
    } else if (target.type === 'submit') {
      const { handlePack, labelsStore } = this.props;
      if(this.state.selectedLabel !== null && this.state.selectedMemo.length > 0) {
        // 체크한 리스트 선택된 라벨에 넣음
        if ( this.state.modal === 0 ) {
          handlePack.setLabel(this.state.selectedLabel,this.state.selectedMemo);
        }
      } else if (this.state.selectedMemo.length > 0) {
        // 체크한 리스트 라벨에서 삭제
        handlePack.deleteMemos(labelsStore.selectedLabelId,this.state.selectedMemo);
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

  // Render
  render() {
    const { open } = this.state
    const { memosStore, handlePack, labelsStore } = this.props;
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