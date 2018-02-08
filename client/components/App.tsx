import * as React from 'react'
import Combobox from './Combobox/components/Combobox'

class App extends React.Component<any, any> {

    state = {
        isVisibleList: true,
        index: -1
    };

    handleClick = (e) => {
        if (e.target.id === 'box') {
            this.setState({isVisibleList: false});
        } else {
            this.setState({isVisibleList: true});
        }
    }

    changeSelectItem(keyCode) {
        if (keyCode == 40) {
            
        }
        
    }

    handleKeyUp = (e) => {
        switch (e.keyCode) {
            case 27:
                this.setState({isVisibleList: false});
                break; 
            case 38: // up
                this.changeSelectItem(38);
                break;
            case 40: // down
                this.changeSelectItem(40);
                break;
            default:
                this.setState({isVisibleList: true});
                break;
        }
    }

    render() {
        return(
            <div id='box' onClick={this.handleClick} onKeyUp={this.handleKeyUp} >
                <Combobox isVisibleList={this.state.isVisibleList} />
            </div>
        );
    }
}

export default App;
//export default connect(mapStateToProps, mapDispatchToProps)(App);