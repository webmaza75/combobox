import loader from './service'
import { 
    GET_HINTS_FAILURE, 
    GET_HINTS_BEGIN, // true - loading, false - finished
    GET_HINTS_SUCCESS,
    SELECT_ITEM
} from './consts'

export function getData(searchVal) {
    return (dispatch) => {
        const action = {
            type: GET_HINTS_BEGIN,
            payload: searchVal // loading data
        };
        dispatch(action);

        loader.getHints(searchVal)
            .then(
                response => { 
                    if (response) {                   
                        const action = {
                            type: GET_HINTS_SUCCESS,
                            payload: response
                        };
                        dispatch(action);
                    }
                },
                error => {
                    const action = {
                        type: GET_HINTS_FAILURE,
                        payload: error
                    };
                    dispatch(action);
                }
            );
    }
}

export function getItem(index) {
    return (dispatch) => {
        const action = {
            type: SELECT_ITEM,
            payload: index
        };
        dispatch(action);
    }
}