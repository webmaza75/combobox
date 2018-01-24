import {Dispatch} from 'redux';

export const LOAD_LIST_ITEMS = 'load_list_items';
export const SEARCH_ITEM = 'search_item';

export function loadListItems() {
	return {
		type: LOAD_LIST_ITEMS,
		payload: this.state.listItems
	}
}