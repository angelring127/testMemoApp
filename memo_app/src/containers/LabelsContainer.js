import React from 'react';
import { connect } from 'react-redux';
import { LabelList } from '../components'
import { bindActionCreators } from 'redux';

import * as apiLabels from '../fetch/fetchLabels';
import * as apiMemos from '../fetch/fetchMemos';

class LabelsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddLabel = this.handleAddLabel.bind(this);
    }

    componentDidMount() {
        const {fetchLabels} = this.props;
        // 라벨 가져오기 
        fetchLabels();
    }

    handleAddLabel = (title) => {
        const {addLabel} = this.props
        let res = addLabel(title);
    }

    render() {
        const {labels, total, error, pending, deleteLabel, getLabel, fetchMemos} = this.props;
        return (
            <LabelList labels={labels} 
                        error={error} 
                        pending={pending}  
                        handleAddLabel={this.handleAddLabel}
                        handleDeleteLabel={deleteLabel}
                        handleGetLabel={getLabel}
                        handleFetchMemos={fetchMemos}
                        totalMemoLength = {total} />
        )
    }

}


// props로 넣어줄 스토어 상태값 
const mapStateToProps = state => ({
    pending: state.labels.pending,
    labels: state.labels.labels,
    error: state.labels.error,
    // 전체 메모 갯수
    total: state.memos.total,
});

// props 로 넣어줄 액션 생성함수
const mapDispatchToProps = dispatch => bindActionCreators({
    //  전체 라벨 갱신
    fetchLabels: apiLabels.fetchLabels,
    addLabel: apiLabels.addLabel,
    deleteLabel: apiLabels.deleteLabel,
    getLabel: apiLabels.getLabel,
    // 전체 메모 갱신
    fetchMemos: apiMemos.fetchMemos,
}, dispatch)

// 컴포넌트에 리덕스 스토어를 연동해줄 때에는 connect 함수 사용 
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LabelsContainer);