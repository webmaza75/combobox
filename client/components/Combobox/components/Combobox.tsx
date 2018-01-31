import * as React from 'react'
import List from './List'
import Input from './Input'

class Combobox extends React.Component<any, any> {
    render() {
        return(
            <div className='search'>
                <Input />
                <List /> 
            </div>
        );
    }
}

export default Combobox;