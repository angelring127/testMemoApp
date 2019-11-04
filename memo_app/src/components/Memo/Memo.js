import React from 'react';
import { Input, Table, Button, TableCell, TableRow, TextArea, Form, Modal, Icon,Header } from 'semantic-ui-react';
import './Memo.css'

// 상세 메모 표시 
class Memo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: true,
            title: '',
            content: '',
            selectedId: null,
            modalOpen: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCreateMemo = this.handleCreateMemo.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleCreateMemo() {
        const { handlePack } = this.props;
        if (this.state.title.trim()　=== "" ) {
            this.handleOpen();
        } else {
            const memo = {
                title : this.state.title,
                content : this.state.content
            };
            handlePack.addMemo(memo);
        }
    }

    // 모달 핸들링
    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    render() {
        const { memo, isCreateMemo } = this.props;
        let memoTitle, title, dated, content, actionButton;

        if( isCreateMemo ) {
            title = 'Create Memo';
            memoTitle = <TableCell>Title <Input fluid={true} placeholder='Title' onChange={this.handleInputChange}　name='title'　/></TableCell>
            content = <Form><TextArea placeholder='Content' onChange={this.handleInputChange} name='content' /></Form>
            actionButton = <TableRow><TableCell><Button className='right floated' onClick={this.handleCreateMemo} content='Create' primary/></TableCell></TableRow>
        } else if (memo !== null) {
            if(this.state.isEdit) {
                 // 메모 수정 
                memoTitle = <Table.Cell>Title <Input placeholder='Title' fluid={true} value={memo.title}/> </Table.Cell>;
                content =   <Form>
                                <TextArea placeholder='Content'  fluid={true}/>
                            </Form>;
                title = 'Edit Memo';
                actionButton = <TableRow><TableCell><Button className='right floated' content='Edit' primary/></TableCell></TableRow>
            } else {
                // 메모가 선택된경우
                title = 'Memo';
                memoTitle = <Table.Cell>
                                {memo.title}
                                <Button className='right floated red mini '>삭제</Button>
                            </Table.Cell>;
                dated = <Table.Row>
                            <TableCell textAlign='right'>
                                작성일 :{memo.updatedAt}
                            </TableCell>
                        </Table.Row>;
                content = memo.content;
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