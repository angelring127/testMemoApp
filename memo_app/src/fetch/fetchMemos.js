import * as storeMemos from '../store/modules/memos';
import * as services from '../services/API';


// 메모 전체 리스트 
export const fetchMemos = () => {
    console.log('fetchMemos');
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
                    return res
                })
                .catch(error => {
                    dispatch(storeMemos.fetchMemosError(error));
                })
    }
}

export const addMemo = (memo) => {
    return dispatch => {
        dispatch(storeMemos.fetchMemosPending());
        services.addMemo(memo.title, memo.content)
            .then(function(res){
                if (res.error) {
                    throw (res.error);
                }
                dispatch(storeMemos.isCreateMemo(false));
                dispatch(storeMemos.getMemo(res.data));
                dispatch(fetchMemos());
            })
            .catch(error => {
                dispatch(storeMemos.fetchMemosError(error));
            })
    }
}


export default fetchMemos;