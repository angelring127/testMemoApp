import { fetchMemosPending, fetchMemosSuccess, fetchMemosError } from '../store/modules/memos';
import * as services from '../services/API';

export const fetchMemos = () => {
    return dispatch => {
        dispatch(fetchMemosPending());
        services.getMemos()
            .then(function (res) {
                if (res.error) {
                    throw (res.error);
                }
                dispatch(fetchMemosSuccess(res.data));
                return res.data;
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