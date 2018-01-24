import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import {
    LOAD_LIST_ITEMS,
    SHOW_FOUND,
} from '../actions'
import { Promise } from 'es6-promise';


type list = {
    name: string,
    alpha2_code: string,
    alpha3_code: string
}

interface IProps {
    listItems?: list[],
    selectItem?: null,
    searchVal: string,
    loadListItems?: (searchVal: string) => void
}

interface IState {
    listItems?: list[],
    searchVal: string,
}

class Input extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            searchVal: ''
        }
    }

    handleChangeSearch = (e) => {
        let value = e.target.value;
        this.setState({
            searchVal: value
        });

        setTimeout(() => {
            this.props.loadListItems(value);
        }, 1000);
    };

    render() {
        return (
            <input type='text' onChange={this.handleChangeSearch} value={this.state.searchVal} />
        );
    }
}

function mapStateToProps(state: IProps) {
    return {
        listItems: state.listItems,
        searchVal: state.searchVal,
        selectItem: state.selectItem,
    };
}

function httpGet(url) {
    let promise = new Promise((resolve, reject) => {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onload = function () {
            if (xhr.status == 200) {
                resolve(xhr.response);
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
            //https://jsonplaceholder.typicode.com/photos
            //let fullUrl = 'http://services.groupkt.com/country/search?text=' + searchVal;
            let fullUrl = `https://typeahead-js-twitter-api-proxy.herokuapp.com/demo/search?q=${searchVal}`;

            httpGet(fullUrl)
                .then(
                    response => {
                        //let res = JSON.stringify(response);

                        console.log(response);
                        const action = {
                            type: LOAD_LIST_ITEMS,
                            payload: response
                        };
                        dispatch(action);
                    },
                    error => alert(`Rejected: ${error}`)
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
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Input as any);