import * as React from 'react'
import TList from '../model/model'

class Row extends React.Component<any, any> {

    constructor (props) {
        super(props);
    }

    render() {
        const {item, onClick, id} = this.props;
        return (<div id={id} onClick={onClick.bind(this)}>{item.screen_name}</div>);
    }
}

export default Row;