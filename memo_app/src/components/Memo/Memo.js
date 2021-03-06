import React from 'react';
import { Input, Table, Button, TableCell, TableRow, TextArea, Form, Modal, Icon,Header } from 'semantic-ui-react';
import './Memo.css'

// 상세 메모 표시 
class Memo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            selectedId: null,
            modalOpen: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSetMemo = this.handleSetMemo.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.triggerIsEdit = this.triggerIsEdit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    componentDidUpdate(previousProps, previousState){
        if (previousProps.memo !== this.props.memo) {
            const { memo } = this.props;
            if (memo !== null){
                this.setState ({ title: memo.title,
                                selectedId: memo._id,
                                content: memo.content,
                            });
            }
        }
    }

    handleSetMemo(event) {
        const { handlePack, memo } = this.props;
        const target = event.target;
        const eventName = target.name;
        if (eventName === 'create') {
            if (this.state.title.trim()　=== "" ) {
                this.handleOpen();
            } else {
                const memo = {
                    title : this.state.title,
                    content : this.state.content
                };
                handlePack.addMemo(memo);
            }
        } else if(eventName === 'edit') {
            console.log('handle edit');
            const editMemo = {
                id: memo._id,
                title: this.state.title,
                content: this.state.content,
            }
            handlePack.editMemo(editMemo);
        }
        
    }

    // 모달 핸들링
    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    // 수전 화면 전환
    triggerIsEdit = () => {
        const { isEditMemo, handlePack } = this.props;
        handlePack.setEditMemo(!isEditMemo);
    };

    render() {
        const { memo, isCreateMemo, handlePack, isEditMemo } = this.props;
        let memoTitle, title, dated, content, actionButton;

        if( isCreateMemo ) {
            title = 'Create Memo';
            memoTitle = <TableCell>Title <Input className='fluid' placeholder='Title' onChange={this.handleInputChange}　name='title'　/></TableCell>
            content = <Form><TextArea placeholder='Content' onChange={this.handleInputChange} name='content' /></Form>
            actionButton = <TableRow><TableCell><Button className='right floated' onClick={this.handleSetMemo} name='create' content='Create' primary/></TableCell></TableRow>
        } else if (memo !== null) {
            if(isEditMemo) {
                 // 메모 수정 
                memoTitle = <Table.Cell>Title 
                                <Input placeholder='Title' value={this.state.title} onChange={this.handleInputChange}　name='title' /> 
                            </Table.Cell>;
                content =   <Form>
                                <TextArea placeholder='Content' onChange={this.handleInputChange} name='content' value={this.state.content} />
                            </Form>;
                title =  <div>Edit Memo <Button content='Edit' onClick={this.triggerIsEdit} className='right floated orange mini' /></div>;
                actionButton = <TableRow><TableCell><Button className='right floated' content='Edit' onClick={this.handleSetMemo} name='edit' primary/></TableCell></TableRow>
            } else {
                // 메모가 선택된경우
                title = <div> 
                            Memo
                            <Button content='Edit' onClick={this.triggerIsEdit} className='right floated orange mini' />
                            <Button onClick={e => handlePack.deleteMemo(memo._id)} className='right floated red mini '>Delete</Button>
                        </div>;
                memoTitle = <Table.Cell>
                                {memo.title}
                            </Table.Cell>;
                dated = <Table.Row>
                            <TableCell textAlign='right'>
                                작성일 :{memo.updatedAt}
                            </TableCell>
                        </Table.Row>;
                content = memo.content.split('\n').map((item, key) => {
                    return <span key={key}>{item}<br/></span>
                  });
            }
        } else {
            title = 'Memo'; 
            memoTitle = <TableCell textAlign='center'>
                            선택된 메모가 없습니다.
                        </TableCell>;
        }
        
        return (
            <div className='Memo'>
                <Table >
                    <Table.Header>
                        <Table.Row>
                            <Table.Cell>
                                {title}
                            </Table.Cell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            {memoTitle}
                        </Table.Row>
                        { dated }
                        <TableRow >
                        <TableCell>
                        { content }
                        </TableCell>
                        </TableRow>
                        { actionButton }
                    </Table.Body>
                </Table>
                <AlertModal modalOpen={this.state.modalOpen} onClose={this.handleClose} />
            </div>
        );
    }
}

// 경고 모달 
const AlertModal = (props) => {
    return (
        <div>
            <Modal
                open={props.modalOpen}
                onClose={props.onClose}
                basic
                size='small'
                >
                <Header icon='dont' content='Alert' />
                <Modal.Content>
                <h3>타이틀만이라도 입력해주세요</h3>
                </Modal.Content>
                <Modal.Actions>
                <Button color='green' onClick={props.onClose} inverted>
                    <Icon name='checkmark' /> OK
                </Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
}

export default Memo;