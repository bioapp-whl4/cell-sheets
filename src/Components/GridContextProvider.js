import React from 'react'
import GridContainer from './Grid-components/GridContainer'
import {DragDropContextProvider} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import {updateDisplayBoxes,updateDisplayBox } from '../redux/display.reducer'
import { connect } from 'react-redux';

export function ContextProvider(props){
    if(props.box_id) {
        props.updateDisplayBox(true)
        props.updateDisplayBoxes(false)

    return(
        <DragDropContextProvider backend={HTML5Backend}>
            <GridContainer box_id={props.box_id}/>
        </DragDropContextProvider>
    )
}
}
const mapDispatchtoProps = {
    updateDisplayBoxes,
    updateDisplayBox
}
function mapStateToProp (state) {
    return {
        box_id: state.display.box_id
    }
}
export default connect(mapStateToProp,mapDispatchtoProps)(ContextProvider)