import * as React from 'react'
import {connect, Dispatch} from 'react-redux'
import {
    LOAD_LIST_ITEMS,
    SELECT_ITEM,
    SET_PROCESSING
} from '../actions'
import TList from '../model/model'


interface IProps {
    listItems?: TList[],
    selectedItem?: TList
    selectItem?: (index: number) => void,
    searchVal: string,
}

interface IState {
    listItems?: TList[],
    selectedItem?: TList
}

class List extends React.Component<IProps, IState> {

    handleChange = (e) => { 
        let index = e.target.id;
        this.props.selectItem(index);
    }
//.replace(searchVal, `<span className='highlight'>`+searchVal+`</span>`)
    render() {
        const {listItems, searchVal} = this.props;

        const items = listItems.map(
            (item, index) => 
                <div 
                    key={index} 
                    id={index+''} 
                    value={item.title} 
                    onClick={this.handleChange}>
                {item.id}: <div id={index+''}>{ item.title.replace(searchVal, `<i className='highlight'>${searchVal}</i>`)}</div> <img src={item.thumbnailUrl} width='20' height='20'/>
                </div>);

        const text = (!items.length) ? 'Ничего не найдено' : `Найдено: ${items.length}` ;

        return(
            <div className='search__content'>
                <p className='search__count'>{text}</p>
                {items}
            </div>
        );
    }
}

function mapStateToProps(state: IProps) {
    return { 
        listItems: state.listItems,
        selectedItem: state.selectedItem,
        searchVal: state.searchVal,
    };
}

function mapDispatchToProps(dispatch: Dispatch<any>) {

    return { 
        selectItem (index) {

            const action = {
                type: SELECT_ITEM,
                payload: index
            };
            dispatch(action);
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(List as any);