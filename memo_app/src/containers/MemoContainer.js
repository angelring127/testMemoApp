import React from 'react';
import Memo from '../components/Memo/Memo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import  * as apiMemo from '../fetch/fetchMemos';
import  * as storeMemo from '../store/modules/memos';

class MemoContainer extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        const { currentMemo, isCreateMemo, selectedMemoIds, addMemo, deleteMemo, isEditMemo, setEditMemo, editMemo } = this.props

        const handlePack = {
            addMemo,
            deleteMemo,
            setEditMemo,
            editMemo,
        }
        return (
            <Memo   memo={currentMemo} 
                    isEditMemo={isEditMemo} 
                    isCreateMemo={isCreateMemo} 
                    selectedMemoIds={selectedMemoIds}
                    handlePack={handlePack}/>
        );
    }
}

// props로 넣어줄 스토어 상태값 
const mapStateToProps = state => ({
    currentMemo: state.memos.currentMemo,
    isCreateMemo: state.memos.isCreateMemo,
    isEditMemo: state.memos.isEditMemo,
    selectedMemoIds: state.memos.selectedMemoIds,
});

// Store상태를 변환하는 액션
const mapDispatchToProps = dispatch => bindActionCreators({
    getMemo: apiMemo.getMemo,
    addMemo: apiMemo.addMemo,
    deleteMemo: apiMemo.deleteMemo,
    setEditMemo: storeMemo.isEditMemo,
    editMemo: apiMemo.editMemo,
    setSelectedMemoIds: storeMemo.setSelectedMemoIds,
}, dispatch)

// 컴포넌트에 리덕스 스토어를 연동해줄 때에는 connect 함수 사용 
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MemoContainer);