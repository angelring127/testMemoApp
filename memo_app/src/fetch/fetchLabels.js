import * as storeLabels from '../store/modules/labels';
import * as storeMemos from '../store/modules/memos';
import * as services from '../services/API';


const defaultSuccess = (res,dispatch) => {
    if (res.error) {
        throw (res.error);
    }
    dispatch(fetchLabels()); 
    return res.data;
}

// 메모에 체크항목 추가
const insertChecked = (res,dispatch) => {
    if (typeof res.data.memos !== 'undefined' && res.data.memos.length > 0) {
        // 라벨의 메모에 체크 여부를 설정한다.
        const memos = res.data.memos.map(function(memo){
            memo.checked = false;
            return memo;
        });
        dispatch(storeMemos.fetchMemosSuccess(memos));
    } else {
        dispatch(storeMemos.fetchMemosSuccess());
    }
}

// 라벨  갱신
export const fetchLabels = () => {
    return dispatch => {
        dispatch(storeLabels.fetchLabelsPending());
        services.getLabels()
            .then(function (res) {
                if (res.error) {
                    throw (res.error);
                }
                if (typeof res.data !== 'undefined' && res.data.length > 0) {
                    // LabelList에 selected를 추가
                    const labelList = res.data.map(function(label){
                        label.selected = false;
                        return label;
                    });
                    dispatch(storeLabels.fetchLabelsSuccess(labelList));
                }
                return res.data;
            })
            .catch(error => {
                dispatch(storeLabels.fetchLabelsError(error));
            })
    }
}

// 라벨 추가 
export const addLabel = (title) => {
    return dispatch => {
        dispatch(storeLabels.fetchLabelsPending());
        services.addLabel(title).
            then(function(res){
                defaultSuccess(res,dispatch);
            })
            .catch(error => {
                dispatch(storeLabels.fetchLabelsError(error));
            })
    }
}

// 라벨 삭제
export const deleteLabel = (id) => {
    return dispatch => {
        dispatch(storeLabels.fetchLabelsPending());
        services.deleteLabel(id).
            then(function(res) {
                defaultSuccess(res, dispatch);
            })
            .catch(error => {
                dispatch(storeLabels.fetchLabelsError(error));
            })
    }
}

// 라벨 선택
export const getLabel = (id) => {
    return dispatch => {
        dispatch(storeLabels.fetchLabelsPending());
        services.getLabel(id).
            then(function(res){
                if (res.error) {
                    throw (res.error);
                }
                
                insertChecked(res, dispatch);
                dispatch(storeLabels.setLabel(id));
                return res.data;
            })
            .catch(error => {
                dispatch(storeLabels.fetchLabelsError(error));
            })
    }
}

// 메모 라벨 설정
export const setLabel = (id,memoIds) => {
    return dispatch => {
        dispatch(storeLabels.fetchLabelsPending());
        services.setLabel(id,memoIds)
            .then(function(res){
                console.log(res);
                dispatch(fetchLabels());
                return res.data;
            })
            .catch(error => {
                dispatch(storeLabels.fetchLabelsError(error));
            })
    }   
}