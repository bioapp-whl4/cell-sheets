import React, { Component } from 'react'
import GridContainer from './Grid-components/GridContainer'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { updateDisplayBoxes, updateDisplayBox } from '../redux/display.reducer'
import { connect } from 'react-redux';

class ContextProvider extends Component {
    constructor() {
        super();
        this.state = {
            displayBox: false
        }
    }

    componentDidMount() {
        if (this.props.box_id) {
            this.props.updateDisplayBox(true)
            this.props.updateDisplayBoxes(false)
            this.setState({displayBox: true})
        }
    }
    async componentDidUpdate(prevProps) {
        if(prevProps.box_id !== this.props.box_id) {
            this.props.updateDisplayBox(true)
            this.setState({displayBox: true})
            
        }
    }
    render() {
        return (<div>
           {this.state.displayBox &&  <DragDropContextProvider backend={HTML5Backend}>
                <h3>Box: {this.props.box_id}</h3>
                <GridContainer box_id={this.props.box_id} />
            </DragDropContextProvider>}
            </div>
        )
    }
}

const mapDispatchtoProps = {
    updateDisplayBoxes,
    updateDisplayBox
}
function mapStateToProp(state) {
    return {
        box_id: state.display.box_id,
        boxDisplay: state.display.displayBox
    }
}
export default connect(mapStateToProp, mapDispatchtoProps)(ContextProvider)