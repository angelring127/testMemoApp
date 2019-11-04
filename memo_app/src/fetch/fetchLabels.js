import { fetchLabelsPending, fetchLabelsSuccess, fetchLabelsError } from '../store/modules/labels';
import * as fetchMemos from '../store/modules/memos';
import * as services from '../services/API';


const defaultSuccess = (res,dispatch) => {
    if (res.error) {
        throw (res.error);
    }
    dispatch(fetchLabels());
    return res.data;
}
// 라벨  갱신
export const fetchLabels = () => {
    return dispatch => {
        dispatch(fetchLabelsPending());
        services.getLabels()
            .then(function (res) {
                if (res.error) {
                    throw (res.error);
                }
                dispatch(fetchLabelsSuccess(res.data));
                return res.data;
            })
            .catch(error => {
                dispatch(fetchLabelsError(error));
            })
    }
}

// 라벨 추가 
export const addLabel = (title) => {
    return dispatch => {
        dispatch(fetchLabelsPending());
        services.addLabel(title).
            then(function(res){
                defaultSuccess(res,dispatch);
            })
            .catch(error => {
                dispatch(fetchLabelsError(error));
            })
    }
}

// 라벨 삭제
export const deleteLabel = (id) => {
    return dispatch => {
        dispatch(fetchLabelsPending());
        services.deleteLabel(id).
            then(function(res) {
                defaultSuccess(res, dispatch);
            })
            .catch(error => {
                dispatch(fetchLabelsError(error));
            })
    }
}

// 라벨 선택
export const getLabel = (id) => {
    return dispatch => {
        dispatch(fetchLabelsPending());
        services.getLabel(id).
            then(function(res){
                if (res.error) {
                    throw (res.error);
                }
                // 메모 갱신
                dispatch(fetchMemos.fetchMemosSuccess(res.data.memos));
                return res.data;
            })
            .catch(error => {
                dispatch(fetchLabelsError(error));
            })
    }
}

// 메모 라벨 설정
export const setLabel = (id,memoIds) => {
    return dispatch => {
        dispatch(fetchLabelsPending());
        services.setLabel(id,memoIds)
            .then(function(res){
                console.log(res);
                dispatch(fetchLabels());
                return res.data;
            })
            .catch(error => {
                dispatch(fetchLabelsError(error));
            })
    }   
}