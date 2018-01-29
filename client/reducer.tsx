import {LOAD_LIST_ITEMS, SELECT_ITEM, SHOW_ERROR, SET_PROCESSING} from './actions'

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
        case LOAD_LIST_ITEMS:
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
        case SHOW_ERROR: 
            newState.error = action.payload.message;
            newState.isLoading = false;
            newState.selectedItem = null;
        break;
        case SET_PROCESSING:
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