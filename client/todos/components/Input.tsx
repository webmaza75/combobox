import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import {
    LOAD_LIST_ITEMS,
    SHOW_ERROR,
    SET_PROCESSING
} from '../actions'
import { Promise } from 'es6-promise';
import TList from '../model/model'


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

function httpGet(url) {
    let promise = new Promise((resolve, reject) => {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onload = function () {
            if (xhr.status == 200) {
                resolve(JSON.parse(xhr.response));
            } else {
                var error = new Error(xhr.statusText);
                error.name = xhr.status + '';
                reject(error);
            }
        };

        xhr.onerror = function () {
            reject(new Error("Network Error"));
        };

        xhr.send();
    });

    return promise;

}

function mapDispatchToProps(dispatch: Dispatch<any>) {

    return {
        loadListItems: function (searchVal: string) {
            let fullUrl: string = `https://jsonplaceholder.typicode.com/photos/`;
            //let fullUrl = 'http://services.groupkt.com/country/search?text=' + searchVal;
            //let fullUrl = `https://typeahead-js-twitter-api-proxy.herokuapp.com/demo/search?q=${searchVal}`;

                const action = {
                    type: SET_PROCESSING,
                    payload: searchVal // loading data
                };
                dispatch(action);

            if (searchVal == '') {
                const action = {
                    type: LOAD_LIST_ITEMS,
                    payload: []
                };
                dispatch(action);
            } else {
//setTimeout(() => {
                httpGet(fullUrl)
                    .then(
                        response => {
                            const res = [];

                        //filter response with title
                            for ( let item in response) {
                                if (response[item]['title'].indexOf(searchVal) >= 0 ) {
                                    res.push(response[item]);
                                }
                            } 
                        

                            const action = {
                                type: LOAD_LIST_ITEMS,
                                payload: res
                            };
                            dispatch(action);
                        },
                        error => {

                            const action = {
                                type: SHOW_ERROR,
                                payload: error
                            };
                            dispatch(action);
                        }
                    );
                
              //  }, 500); // end of setTimeout

            }
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Input as any);