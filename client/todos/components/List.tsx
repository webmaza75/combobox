import * as React from 'react'
import {connect, Dispatch} from 'react-redux'
import {
    LOAD_LIST_ITEMS,
    SELECT_ITEM,
} from '../actions'

type list = {
    albumId: number,
    id: number,
    title: string,
    url: string
    thumbnailUrl: string
}

interface IProps {
    listItems?: list[],
    selectedItem?: list
    selectItem?: (index: number) => void,
}

interface IState {
    listItems?: list[],
    selectedItem?: list
}

class List extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    handleChange = (e) => {
        let index = +e.target.id;
        this.props.selectItem(index);
    }

    render() {
        let list = this.props.listItems;
        let items = list.map(
            (item, index) => 
                <div 
                    key={index} 
                    id={index+''} 
                    value={item.title} 
                    onClick={this.handleChange}>{item.id}: {item.title} <img src={item.thumbnailUrl} width='20' height='20'/>
                </div>);

        let text = (!items.length) ? 'Ничего не найдено' : `Найдено: ${items.length}` ;

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
        selectedItem: state.selectedItem
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