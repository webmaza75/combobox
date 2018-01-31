import { 
    GET_HINTS_FAILURE, 
    GET_HINTS_BEGIN, // true - loading, false - finished
    GET_HINTS_SUCCESS,
    SELECT_ITEM
} from './consts'

const initialState = {
    listItems: [],
    selectedItem: null,
    isLoading: false,
    error: null,
    searchVal: ''
}

export default function reducer(state = initialState, action) {
    let newState = {...state};

    switch (action.type) {
        case GET_HINTS_SUCCESS:
            const tmpList = [...action.payload];
            newState.listItems = tmpList;
            newState.selectedItem = null;
            newState.error = null;
            newState.isLoading = false;
        break;
        case SELECT_ITEM: 
            const val = newState.listItems[action.payload];
            newState.selectedItem = val;
            newState.listItems = [val];
            newState.isLoading = false;
            newState.error = null;
        break;
        case GET_HINTS_FAILURE: 
            newState.error = action.payload.message;
            newState.isLoading = false;
            newState.selectedItem = null;
        break;
        case GET_HINTS_BEGIN:
            newState.isLoading = true;
            newState.searchVal = action.payload;
            const list = [...newState.listItems];
            list.length = 0;
            newState.listItems = list;
            newState.selectedItem = null;
        break;
        default:
        return state;
    }
    return newState;
}