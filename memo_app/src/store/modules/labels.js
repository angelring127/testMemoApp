//  맥션 타입 정의 
export const FETCH_LABELS_PENDING = 'FETCH_LABELS_PENDING';
export const FETCH_LABELS_SUCCESS = 'FETCH_LABELS_SUCCESS';
export const FETCH_LABELS_ERROR = 'FETCH_LABELS_ERROR';
export const ADD_LABEL = "ADD_LABEL";
export const SET_LABEL = "SET_LABEL";

//  액션 생성함수 정의 
export const fetchLabelsPending = () => ({ type: FETCH_LABELS_PENDING });
export const fetchLabelsSuccess = (labels) => ({ type: FETCH_LABELS_SUCCESS, labels:labels});
export const fetchLabelsError = (error) => ({ type: FETCH_LABELS_ERROR, error: error});
export const setLabel = (labelId) => ({ type: SET_LABEL, payload: {labelId}});
export const addLabel = title => ({
    type: ADD_LABEL,
    payload: {
        title
    }
});

// 초기상태 정의
const initialState = {
    pending: false,
    labels: [],
    error: null,
    selectedLabelId: null
}

export default function labels(state = initialState, action) {
    switch(action.type) {
        case FETCH_LABELS_PENDING:
            return {
                ...state,
                pending: true
            }
        case FETCH_LABELS_SUCCESS:
            return {
                ...state,   
                pending: false,
                labels: action.labels
            }
        case FETCH_LABELS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case SET_LABEL:
            return {
                ...state,
                pending: false,
                selectedLabelId: action.payload.labelId === undefined ? null : action.payload.labelId,
                labels: state.labels.map(function(label){
                    label.selected = label._id === action.payload.labelId;
                    return label;
                })
            }
        default:
            return state;
    }
}