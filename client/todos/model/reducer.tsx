import {LOAD_LIST_ITEMS, SELECT_ITEM, SHOW_ERROR} from '../actions'

const initialState = {
    listItems: [],
    selectedItem: null,
    isLoading: false,
    error: null
}

export default function reducer(state = initialState, action) {
    let newState = {...state};

    switch (action.type) {
        case LOAD_LIST_ITEMS:
            let tmpList = [...action.payload];

            newState.listItems = tmpList;
            newState.isLoading = false;
            newState.selectedItem = null;
            newState.error = null;
        break;
        case SELECT_ITEM: 
            let val = newState.listItems[action.payload];

            newState.selectedItem = val;
            newState.listItems = newState.listItems.splice(action.payload, 1);
            newState.error = null;
        break;
        case SHOW_ERROR: 
            newState.error = action.payload.message;
        break;
        default:
        return state;
    }
    return newState;
}