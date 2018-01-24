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
    searchValue: string,
    loadListItems?: (listItems: list[]) => void    
}

interface IState {
    listItems?: list[],
    searchValue?: string
}

class Input extends React.Component <IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.handleChangeSearchInput = this.handleChangeSearchInput.bind(this);
    }

    handleChangeSearchInput () {
        this.setState({
            searchValue: this.state.searchValue
        });
    };

    componentWillReceiveProps (nextProps) {
        if( nextProps.searchValue ) {
            this.setState({searchValue: nextProps.searchValue});
        }
    }

    render() {
        return(
            <input type='text' onChange={this.handleChangeSearchInput} name='search' value={this.state.searchValue} />
        );
    }
}

function mapStateToProps(state: IProps) {
    return { 
        listItems: state.listItems,
        searchValue: state.searchValue,
        selectItem: state.selectItem
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

export default connect(mapStateToProps, mapDispatchToProps)(Input as any);