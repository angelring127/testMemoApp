import React from 'react'
import { Table, Checkbox, TableCell } from 'semantic-ui-react';


// 메모
function MemoItem(props) {
    const { title } = props.memo;
    return (
        <Table.Row>
            <TableCell width='1'><Checkbox onChange={props.handleInputChange} id={props.memo._id} name='checkbox' /></TableCell>
            <Table.Cell width='16' onClick={e => props.handleGetMemo(props.memo._id)}>
                {title}
            </Table.Cell>
        </Table.Row>
    );
}

export default MemoItem;