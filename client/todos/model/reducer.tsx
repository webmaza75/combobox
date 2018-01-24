import {LOAD_LIST_ITEMS, SHOW_FOUND} from '../actions'

const initialState = {
    listItems: [
        {"id": "name1", "name": "string1.1", "screen_name": "string1.2"},
        {"id": "name2", "name": "string2.1", "screen_name": "string2.2"},
    ],
    searchVal: '',
    selectItem: null
}

export default function reducer(state = initialState, action) {
    let newState = {...state};

    switch (action.type) {
        case LOAD_LIST_ITEMS:
            let tmpList = [...action.payload];
            newState.listItems = tmpList;
        break;
        case SHOW_FOUND: 
        break;
        default:
        return state;
    }
    return newState;
}