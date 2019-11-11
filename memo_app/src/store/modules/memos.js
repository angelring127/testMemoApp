//  맥션 타입 정의 
export const FETCH_MEMOS_PENDING = 'FETCH_MEMOS_PENDING';
export const FETCH_MEMOS_SUCCESS = 'FETCH_MEMOS_SUCCESS';
export const FETCH_MEMOS_ERROR = 'FETCH_MEMOS_ERROR';
export const TOTAL_MEMOS = 'TOTAL_MEMOS';
export const GET_MEMO = 'GET_MEMO';
export const ADD_MEMO = "ADD_MEMO";
export const IS_CREATE_MEMO = 'CREATE_MEMO';
export const IS_EDIT_MEMO = 'IS_EDIT_MEMO';

//  액션 생성함수 정의 
export const fetchMemosPending = () => ({ type: FETCH_MEMOS_PENDING });
export const fetchMemosSuccess = (memos) => ({ type: FETCH_MEMOS_SUCCESS, memos:memos});
export const fetchMemosError = (error) => ({ type: FETCH_MEMOS_ERROR, error: error});
export const addMemo = title => ({ type: ADD_MEMO, payload: { title }});
export const totalMemos = total => ({type: TOTAL_MEMOS, payload: { total }});
export const isCreateMemo = (isCreateMemo) => ({ type: IS_CREATE_MEMO, payload: { isCreateMemo}});
export const isEditMemo = (isEditMemo) => ({ type: IS_EDIT_MEMO, payload: { isEditMemo }});
export const getMemo = memo => ({ type: GET_MEMO, payload: { memo }});

// 초기상태 정의
const initialState = {
    pending: false,
    memos: [],
    error: null,
    total: null,
    currentMemo: null,
    isCreateMemo: false,
    isEdit: false,
    modalTitle: {
        0: "Setting Label",
        1: "Delete Label",
    },
    modalMessage: {
        0: "메모에 라벨을 설정하시겠습니까",
        1: "메모를 삭제 하시겠습니까?"
    },
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
        case TOTAL_MEMOS:
            return {
                ...state,
                total: action.payload.total
            }
        case GET_MEMO:
            return {
                ...state,
                currentMemo: action.payload.memo
            }
        case IS_CREATE_MEMO:
            return {
                ...state,
                isCreateMemo: action.payload.isCreateMemo
            }
        case IS_EDIT_MEMO:
            return {
                ...state,
                isEditMemo: action.payload.isEditMemo
            }
        default:
            return state;
    }
}