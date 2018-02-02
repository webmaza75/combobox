import * as React from 'react'

class Row extends React.Component<any, any> {

    constructor (props) {
        super(props);
    }

    render() {
        const {item, onClick, index} = this.props;

        return (<div>
                    <span onClick={onClick.bind(this)} id={index}>{item.id}</span>
                    : 
                    <span onClick={onClick.bind(this)} id={index}>{item.screen_name}</span>
                </div>);
            }
}

export default Row;