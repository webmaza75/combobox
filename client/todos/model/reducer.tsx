import {LOAD_LIST_ITEMS, SELECT_ITEM} from '../actions'

const initialState = {
    listItems: [
        {"albumId": 1, "id": 1, "title": "url1.1", "thumbnailUrl": "thumurl1.2"},
        {"albumId": 1, "id": 2, "title": "url2.1", "thumbnailUrl": "thumurl2.2"},
    ],
    selectedItem: null,
    isLoading: false //searchVal: '',
}

export default function reducer(state = initialState, action) {
    let newState = {...state};

    switch (action.type) {
        case LOAD_LIST_ITEMS:
            let tmpList = [...action.payload];

            newState.listItems = tmpList;
            newState.isLoading = false;
            newState.selectedItem = null;
        break;
        case SELECT_ITEM: 
            let val = newState.listItems[action.payload];
            
            newState.selectedItem = val;
            newState.listItems = newState.listItems.splice(action.payload, 1)
        break;
        default:
        return state;
    }
    return newState;
}