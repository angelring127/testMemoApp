import React from 'react';
import Memo from '../components/Memo/Memo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getMemo } from '../fetch/fetchMemos';

class MemoContainer extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        const { currentMemo } = this.props
        return (
            <Memo  memo={currentMemo}/>
        );
    }
}



// props로 넣어줄 스토어 상태값 
const mapStateToProps = state => ({
    currentMemo: state.memos.currentMemo,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getMemo: getMemo,
}, dispatch)

// 컴포넌트에 리덕스 스토어를 연동해줄 때에는 connect 함수 사용 
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MemoContainer);