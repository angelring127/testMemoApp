import * as storeMemos from '../store/modules/memos';
import * as fetchLabels from '../fetch/fetchLabels';
import * as services from '../services/API';

const setMemo = (res, dispatch) => {
    if(res.error) {
        throw (res.error);
    }
    dispatch(storeMemos.isCreateMemo(false));
    dispatch(storeMemos.getMemo(res.data));
    dispatch(fetchMemos());
    dispatch(storeMemos.isEditMemo(false));
}

// 메모 전체 리스트 
export const fetchMemos = () => {
    return dispatch => {
        dispatch(storeMemos.fetchMemosPending());
        services.getMemos()
            .then(function (res) {
                if (res.error) {
                    throw (res.error);
                }
                dispatch(storeMemos.fetchMemosSuccess(res.data));
                dispatch(storeMemos.totalMemos(res.data.length));
                return res.data;
            })
            .catch(error => {
                dispatch(storeMemos.fetchMemosError(error));
            })
    }
}

// 메모리스트에서 선택해서 상세 메모 습득
export const getMemo = (id) => {
    return dispatch => {
        dispatch(storeMemos.fetchMemosPending());
        services.getMemo(id)
                .then(function(res) {
                    if (res.error) {
                        throw (res.error);
                    }
                    dispatch(storeMemos.isCreateMemo(false));
                    dispatch(storeMemos.getMemo(res.data));
                    dispatch(storeMemos.isEditMemo(false));
                    return res
                })
                .catch(error => {
                    dispatch(storeMemos.fetchMemosError(error));
                })
    }
}

// 메모 등록
export const addMemo = (memo) => {
    return dispatch => {
        dispatch(storeMemos.fetchMemosPending());
        services.addMemo(memo.title, memo.content)
            .then(function(res){
                setMemo(res,dispatch);
            })
            .catch(error => {
                dispatch(storeMemos.fetchMemosError(error));
            })
    }
}

// 메모 삭제
export const deleteMemo = (id) => {
    return dispatch => {
        dispatch(storeMemos.fetchMemosPending());
        services.deleteMemo(id)
            .then(function(res){
                if (res.error) {
                    throw (res.error);
                }

                dispatch(storeMemos.isCreateMemo(false));
                dispatch(storeMemos.getMemo(null))
                dispatch(fetchMemos());
            })
            .catch(error => {
                dispatch(storeMemos.fetchMemosError(error));
            })
    }
}

// 라벨에서 선택된 메모 삭제 
export const deleteMemos = (labelId,memoIds) => {
    return dispatch => {
        dispatch(storeMemos.fetchMemosPending());
        services.deleteMemos(labelId, memoIds) 
            .then(function(res){
                if (res.error) {
                    throw (res.error);
                }

                dispatch(fetchLabels.fetchLabels());
                dispatch(fetchMemos());
                dispatch(storeMemos.isCreateMemo(false));

            })
            .catch(error => {
                dispatch(storeMemos.fetchMemosError(error));
            })
    }
}

// 메모 수정
export const editMemo = (memo) => {
    console.log('editmemo');
    return dispatch => {
        dispatch(storeMemos.fetchMemosPending());
        services.updateMemo(memo.id, memo.title, memo.content)
            .then(function(res){
                setMemo(res,dispatch);
            })
            .catch(error => {
                dispatch(storeMemos.fetchMemosError(error));
            })
    }
}