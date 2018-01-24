import {LOAD_LIST_ITEMS, SEARCH_ITEM} from '../actions'

const initialState = {
    listItems: [
        {"name": "name1", "alpha2_code": "string1.1", "alpha3_code": "string1.2"},
        {"name": "name2", "alpha2_code": "string2.1", "alpha3_code": "string2.2"},
    ],
    searchValue: '',
    selectItem: null
}

export default function reducer(state = initialState, action) {
    let newState = {...state};

    switch (action.type) {
        case LOAD_LIST_ITEMS:
            //let listItems = load(newState, action);
            let tmpList = [...state.listItems];
            newState.listItems = tmpList;
        break;
        case SEARCH_ITEM: 
        break;
        default:
        return state;
    }
    return newState;
}