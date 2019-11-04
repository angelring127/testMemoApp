import React from 'react';
import { connect } from 'react-redux';
import { MemoList } from '../components'
import { bindActionCreators } from 'redux';
import * as storeMemos from '../store/modules/memos'

import * as apiMemos from '../fetch/fetchMemos';
import * as apiLabels from '../fetch/fetchLabels';

class MemosContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {fetchMemos} = this.props;
        // 메모 가져오기 
        fetchMemos();
    }

    render() {
        const {memos, labels, error, pending, getMemo, isCreateMemo, setLabel} = this.props;
        const handlePack = {
            getMemo, isCreateMemo, setLabel
        };
        return (
            <MemoList memos={memos} labels={labels} error={error} pending= {pending} handlePack={handlePack}/>
        )
    }

}


// props로 넣어줄 스토어 상태값 
const mapStateToProps = state => ({
    pending: state.memos.pending,
    memos: state.memos.memos,
    error: state.memos.error,
    labels: state.labels.labels,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchMemos: apiMemos.fetchMemos,
    getMemo: apiMemos.getMemo,
    isCreateMemo: storeMemos.isCreateMemo,
    setLabel: apiLabels.setLabel,
}, dispatch)

// 컴포넌트에 리덕스 스토어를 연동해줄 때에는 connect 함수 사용 
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MemosContainer);