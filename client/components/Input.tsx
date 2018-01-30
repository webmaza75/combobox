import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import {
    LOAD_LIST_ITEMS,
    SHOW_ERROR,
    SET_PROCESSING
} from '../actions'
import TList from '../model/model'
import { getData } from '../actions'


interface IProps {
    listItems?: TList[],
    selectedItem?: TList,
    searchVal?: string,
    loadListItems?: (searchVal: string) => void,
    showError?: (err: string) => void,
    error?: null,
    isLoading?: boolean
}

interface IState {
    listItems?: TList[],
    searchVal: string,
    selectedItem?: TList,
}

let timerId = null;

class Input extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            searchVal: '',
            selectedItem: null
        }
    }

    handleResetEvent = (e) => {
        this.setState({ 
            searchVal: '',
            selectedItem: null
        });

        this.handleSetTimout('');
    }

    handleSetTimout(value) {
        if (timerId) {
            clearTimeout(timerId);
        }
        
        timerId = setTimeout(() => {
            this.props.loadListItems(value);
        }, 500);
    }

    handleChangeSearch = (e) => {
        let value = e.target.value;

        this.setState({
            searchVal: value,
            selectedItem: null
        });

        this.handleSetTimout(value);
    };

    componentWillReceiveProps (nextProps: IProps) {
        if ( nextProps.selectedItem ) {
            const item = nextProps.selectedItem['title'];

            this.setState({ 
                searchVal: item, 
            });
        }
    }

    render() {
        const {error, isLoading} = this.props; // just a string
        const err = error ? <div className='err_message' >error</div> : null;
        let loader = (isLoading) ? <div className='loader'></div> : <div></div>;

        return (
            <div>
                <input className='search__text' type='text' onChange={this.handleChangeSearch} value={this.state.searchVal} />
                <span onClick={this.handleResetEvent} className='icon_reset'>&#8634;</span>
                {err}
                {loader}
            </div>
        );
    }
}

function mapStateToProps(state: IProps) {
    return {
        listItems: state.listItems,
        searchVal: state.searchVal,
        selectedItem: state.selectedItem,
        error: state.error,
        isLoading: state.isLoading
    };
}

function mapDispatchToProps(dispatch: Dispatch<any>) {

    return {
        loadListItems: function (searchVal: string) {
            getData(searchVal)(dispatch);
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Input as any);