import Loader from './service'

export const LOAD_LIST_ITEMS = 'load_list_items';
export const SELECT_ITEM = 'select_item';
export const SHOW_ERROR = 'show_error';
export const SET_PROCESSING = 'set_processing'; // true - loading, false - finished

export function getData(searchVal) {
    return (dispatch) => {
        const action = {
            type: SET_PROCESSING,
            payload: searchVal // loading data
        };
        dispatch(action);

        if (searchVal == '') {
            const action = {
                type: LOAD_LIST_ITEMS,
                payload: []
            };
            dispatch(action);
        } else {

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
                                type: LOAD_LIST_ITEMS,
                                payload: res
                            };
                            dispatch(action);
                        }
                    },
                    error => {
                        const action = {
                            type: SHOW_ERROR,
                            payload: error
                        };
                        dispatch(action);
                    }
                );
            }
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