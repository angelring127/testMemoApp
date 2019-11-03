import { fetchLabelsPending, fetchLabelsSuccess, fetchLabelsError } from '../store/modules/labels';
import * as services from '../services/API';

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

export const addLabel = (title) => {
    return dispatch => {
        dispatch(fetchLabelsPending());
        services.addLabel(title).
            then(function(res){
                if (res.error) {
                    throw (res.error);
                }
                dispatch(fetchLabels());
                return res.data;
            })
            .catch(error => {
                dispatch(fetchLabelsError(error));
            })
    }
}

export const deleteLabel = (id) => {
    return dispatch => {
        dispatch(fetchLabelsPending());
        services.deleteLabel(id).
            then(function(res){
                if (res.error) {
                    throw (res.error);
                }
                dispatch(fetchLabels());
                return res.data;
            })
            .catch(error => {
                dispatch(fetchLabelsError(error));
            })
    }
}