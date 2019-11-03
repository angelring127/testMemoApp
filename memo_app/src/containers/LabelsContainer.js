import React from 'react';
import { connect } from 'react-redux';
import { addLabel } from '../store/modules/labels';
import { bindActionCreators } from 'redux';

import fetchLabelsAction from '../fetch/fetchLabels';

class LabelsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.shouldComponentRender = this.shouldComponentRender.bind(this);
    }

    componentWillMount() {
        const {fetchLabels} = this.props;
        fetchLabels();
    }

    shouldComponentRender() {
        const {pending} = this.props;
        console.log(pending);
        if(this.pending === false) return false;

        return true;
    }

    render() {
        this.shouldComponentRender()
        return (
            <div>

            </div>
        )
    }

}


// props로 넣어줄 스토어 상태값 
const mapStateToProps = state => ({
    pending: state.labels.pending,
    labels: state.labels.labels,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchLabels: fetchLabelsAction
}, dispatch)

// 컴포넌트에 리덕스 스토어를 연동해줄 때에는 connect 함수 사용 
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LabelsContainer);