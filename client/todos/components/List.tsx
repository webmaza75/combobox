import * as React from 'react'
import {connect, Dispatch} from 'react-redux'
import {
    LOAD_LIST_ITEMS,
    SEARCH_ITEM,
    loadListItems
} from '../actions'

type list = {
    name: string,
    alpha2_code: string,
    alpha3_code: string
}

interface IProps {
    listItems?: list[],
    selectItem?: null,
    loadListItems?: (listItems: list[]) => void    
}

interface IState {
    listItems?: list[],
}

class List extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    render() {
        let list = this.props.listItems;
        let items = list.map(item => <div>{item.name}</div>);

        return(
            <div>
                {items}
            </div>
        );
    }

}

function mapStateToProps(state: IProps) {
    return { 
        listItems: state.listItems,
        selectItem: null
    };
}

function mapDispatchToProps(dispatch: Dispatch<any>) {

    return { 
        loadListItems (listItems) {

            const action = {
                type: LOAD_LIST_ITEMS,
                payload: listItems
            };
            dispatch(action);
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(List as any);