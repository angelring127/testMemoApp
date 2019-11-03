//  맥션 타입 정의 
export const FETCH_MEMOS_PENDING = 'FETCH_MEMOS_PENDING';
export const FETCH_MEMOS_SUCCESS = 'FETCH_MEMOS_SUCCESS';
export const FETCH_MEMOS_ERROR = 'FETCH_MEMOS_ERROR';
export const ADD_MEMO = "ADD_MEMO";

//  액션 생성함수 정의 
export const fetchMemosPending = () => ({ type: FETCH_MEMOS_PENDING });
export const fetchMemosSuccess = (memos) => ({ type: FETCH_MEMOS_SUCCESS, memos:memos});
export const fetchMemosError = (error) => ({ type: FETCH_MEMOS_ERROR, error: error});
export const addMemo = title => ({
    type: ADD_MEMO,
    payload: {
        title
    }
});

// 초기상태 정의
const initialState = {
    pending: false,
    memos: [],
    error: null
}

export default function memos(state = initialState, action) {
    switch(action.type) {
        case FETCH_MEMOS_PENDING:
            return {
                ...state,
                pending: true
            }
        case FETCH_MEMOS_SUCCESS:
            return {
                ...state,   
                pending: false,
                memos: action.memos
            }
        case FETCH_MEMOS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        
        default:
            return state;
    }
}