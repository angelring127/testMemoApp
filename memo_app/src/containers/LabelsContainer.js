import React from 'react';
import { connect } from 'react-redux';
import { LabelList } from '../components'
import { bindActionCreators } from 'redux';

import * as apiLabels from '../fetch/fetchLabels';
import * as apiMemos from '../fetch/fetchMemos';

import * as storeLabels from '../store/modules/labels';

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
        const {labelStore, total, error, pending, deleteLabel, getLabel, fetchMemos, setLabelId} = this.props;
        const handleAddLabel = this.handleAddLabel;
        const handlePack = {
            deleteLabel, getLabel, fetchMemos, setLabelId , handleAddLabel
        };
        return (
            <LabelList labelStore={labelStore} 
                        error={error} 
                        pending={pending}  
                        handlePack={handlePack}
                        totalMemoLength = {total} />
        )
    }

}


// props로 넣어줄 스토어 상태값 
const mapStateToProps = state => ({
    pending: state.labels.pending,
    labelStore: state.labels,
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
    setLabelId: storeLabels.setLabel,
}, dispatch)

// 컴포넌트에 리덕스 스토어를 연동해줄 때에는 connect 함수 사용 
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LabelsContainer);