import React from 'react';
import { Input, Table, Button, TableCell, TableRow, TextArea } from 'semantic-ui-react';
import './Memo.css'

// 상세 메모 표시 
class Memo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isEdit: false }
    }

    render() {
        const { memo } = this.props;
        let title, dated, content;
        
        if (this.state.isEdit) {
            title = <Table.Cell>Title <Input /> </Table.Cell>;
            content = <TextArea />;
        } else {
            title = <Table.Cell>
                Title
            <Button className='right floated red mini '>삭제</Button>
            </Table.Cell>;
            dated = <Table.Row>
                        <TableCell textAlign='right'>
                            dated
                        </TableCell>
                    </Table.Row>;
            
            content = 'content';
        }
        return (
            <div className='Memo'>
                <Table >
                    <Table.Header>
                        <Table.Row>
                            <Table.Cell>
                                Memo
                    </Table.Cell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            {title}
                        </Table.Row>
                        { dated }
                        <TableRow >
                        <TableCell>
                        { content }
                        </TableCell>
                        </TableRow>
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

export default Memo;