import * as React from 'react'
import List from './List'
import Input from './Input'

interface IProps {
    isVisibleList: any
}

class Combobox extends React.Component<IProps, any> {

    constructor(props) {
        super(props);
    }

    render() {
        const { isVisibleList } = this.props;
        return (
            <div className='search' >
                <Input />
                {isVisibleList && <List/> }
            </div>
        );
    }
}

export default Combobox;