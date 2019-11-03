import React from 'react';
import { connect } from 'react-redux';
import { MemoList } from '../components'
import { bindActionCreators } from 'redux';

import {fetchMemos as fetchMemosAction} from '../fetch/fetchMemos';

class MemoContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const {fetchMemos} = this.props;
        // 메모 가져오기 
        fetchMemos();
    }

    render() {
        const {memos, error, pending} = this.props;
        return (
            <MemoList memos={memos} error={error} pending= {pending} />
            // <div></div>
        )
    }

}


// props로 넣어줄 스토어 상태값 
const mapStateToProps = state => ({
    pending: state.memos.pending,
    memos: state.memos.memos,
    error: state.memos.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchMemos: fetchMemosAction
}, dispatch)

// 컴포넌트에 리덕스 스토어를 연동해줄 때에는 connect 함수 사용 
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MemoContainer);