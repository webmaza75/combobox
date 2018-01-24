import * as React from 'react'
import List from './List'
import Input from './Input'

class App extends React.Component<any, any> {
    render() {
        return(
            <div>
                <Input />
                <List />
            </div>
        );
    }
}

export default App;