import { fetchLabelsPending, fetchLabelsSuccess, fetchLabelsError } from '../store/modules/labels';
import * as services from '../services/API';

function fetchLabels() {
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

export default fetchLabels;