import React from 'react';
import Memo from '../components/Memo/Memo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import  * as apiMemo from '../fetch/fetchMemos';

class MemoContainer extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        const { currentMemo, isCreateMemo, addMemo } = this.props
        const handlePack = {
            addMemo
        }
        return (
            <Memo memo={currentMemo} isCreateMemo={isCreateMemo} handlePack={handlePack}/>
        );
    }
}



// props로 넣어줄 스토어 상태값 
const mapStateToProps = state => ({
    currentMemo: state.memos.currentMemo,
    isCreateMemo: state.memos.isCreateMemo,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getMemo: apiMemo.getMemo,
    addMemo: apiMemo.addMemo,
}, dispatch)

// 컴포넌트에 리덕스 스토어를 연동해줄 때에는 connect 함수 사용 
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MemoContainer);