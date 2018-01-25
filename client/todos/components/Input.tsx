import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import {
    LOAD_LIST_ITEMS,
    SHOW_ERROR
} from '../actions'
import { Promise } from 'es6-promise';


type list = {
    albumId: number,
    id: number,
    title: string,
    url: string
    thumbnailUrl: string
}

interface IProps {
    listItems?: list[],
    selectedItem?: list,
    searchVal?: string,
    loadListItems?: (searchVal: string) => void,
    showError?: (err: string) => void,
    error?: null
}

interface IState {
    listItems?: list[],
    searchVal: string,
    isLoading: boolean,
    timeRun: number,
    selectedItem?: list
}

class Input extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            searchVal: '',
            timeRun: null,
            isLoading: false,
            selectedItem: null
        }
    }

    handleChangeSearch = (e) => {
        let value = e.target.value;
        let timeStart = (new Date()).getTime();
        this.setState({
            searchVal: value,
            timeRun: timeStart,
            isLoading: true,
        });

        //let timeStart = new Date().getTime();
        let timerId = setTimeout(() => {
            // if (this.state.timeRun + 3 >= (new Date()).getTime()) {
            //     clearTimeout(timerId);
            // }
            this.props.loadListItems(value);
            // this.setState({
            //     isLoading: false
            // });
        }, 1000);
    };

    componentWillReceiveProps (nextProps) {
        if ( nextProps.selectedItem ) {
            let item = nextProps.selectedItem['title'];
            this.setState({ searchVal: item, 
                timeRun: 1,
                isLoading: true, });
        }
    }

    render() {
        let err = (this.props.error) ? <div className='err_message' >{this.props.error}</div> : null;

        return (
            <div>
                {err}
                <input className='search__text' type='text' onChange={this.handleChangeSearch} value={this.state.searchVal} />
            </div>
        );
    }
}

function mapStateToProps(state: IProps) {
    return {
        listItems: state.listItems,
        searchVal: state.searchVal,
        selectedItem: state.selectedItem,
        error: state.error
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
        loadListItems: function (searchVal) {
            let fullUrl = `https://jsonplaceholder.typicode.com/photos/`;
            //let fullUrl = 'http://services.groupkt.com/country/search?text=' + searchVal;
            //let fullUrl = `https://typeahead-js-twitter-api-proxy.herokuapp.com/demo/search?q=${searchVal}`;

            httpGet(fullUrl)
                .then(
                    response => {
                        let res = [];

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
                        //alert(error);

                        const action = {
                            type: SHOW_ERROR,
                            payload: error
                        };
                        dispatch(action);
                    }
                );



            //1.update text+progress loading
            //ajax => Promise;
            //.then(() => {
            //2.update list+progress finished
            //},
            // () => {
            //2.show error
            // })

            //dispatch(action);
        }/*,
        showError (err) {
            const action = {
                type: SHOW_ERROR,
                payload: err
            };
            dispatch(action);
        }*/
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Input as any);