import React from 'react';
import { connect } from 'react-redux';
import { LabelList } from '../components'
import { bindActionCreators } from 'redux';

import * as apiLabels from '../fetch/fetchLabels';

class LabelsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddLabel = this.handleAddLabel.bind(this);
    }

    componentWillMount() {
        const {fetchLabels} = this.props;
        // 라벨 가져오기 
        fetchLabels();
    }

    handleAddLabel = (title) => {
        const {addLabel} = this.props
        let res = addLabel(title);
    }

    render() {
        const {labels, error, pending, deleteLabel, getLabel} = this.props;
        return (
            <LabelList labels={labels} 
                        error={error} 
                        pending={pending}  
                        handleAddLabel={this.handleAddLabel}
                        handleDeleteLabel={deleteLabel}
                        handleGetLabel={getLabel} />
        )
    }

}


// props로 넣어줄 스토어 상태값 
const mapStateToProps = state => ({
    pending: state.labels.pending,
    labels: state.labels.labels,
    error: state.labels.error,
});

// props 로 넣어줄 액션 생성함수
const mapDispatchToProps = dispatch => bindActionCreators({
    fetchLabels: apiLabels.fetchLabels,
    addLabel: apiLabels.addLabel,
    deleteLabel: apiLabels.deleteLabel,
    getLabel: apiLabels.getLabel
}, dispatch)

// 컴포넌트에 리덕스 스토어를 연동해줄 때에는 connect 함수 사용 
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LabelsContainer);