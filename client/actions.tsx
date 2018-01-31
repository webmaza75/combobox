import Loader from './service'
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

        // if (searchVal == '') {
        //     const action = {
        //         type: LOAD_LIST_ITEMS,
        //         payload: []
        //     };
        //     dispatch(action);
        //} else {

        new Loader().getHints()
            .then(
                response => {
                    if (response) {
                        const res = [];
                        //filter response with title
                        for ( let item in response) {
                            if (response[item]['title'].indexOf(searchVal) >= 0 ) {
                                res.push(response[item]);
                            }
                        } 
                    
                        const action = {
                            type: GET_HINTS_SUCCESS,
                            payload: res
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
            //}
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