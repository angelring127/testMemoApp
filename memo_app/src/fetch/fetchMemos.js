import { fetchMemosPending, fetchMemosSuccess, fetchMemosError, totalMemos } from '../store/modules/memos';
import * as services from '../services/API';


// 메모 전체 리스트 
export const fetchMemos = () => {
    console.log('fetchMemos');
    return dispatch => {
        dispatch(fetchMemosPending());
        services.getMemos()
            .then(function (res) {
                if (res.error) {
                    throw (res.error);
                }
                dispatch(fetchMemosSuccess(res.data));
                dispatch(totalMemos(res.data.length));
                return res.data;
            })
            .catch(error => {
                dispatch(fetchMemosError(error));
            })
    }
}

export const getMemo = (id) => {
    return dispatch => {
        dispatch(fetchMemosPending());
        services.getMemo(id)
                .then(function(res) {
                    if (res.error) {
                        throw (res.error);
                    }
                    console.log(res);

                    return res
                })
                .catch(error => {
                    dispatch(fetchMemosError(error));
                })
    }
}

export const addMemos = () => {
    return dispatch => {
        dispatch(fetchMemosPending());
    }
}


export default fetchMemos;