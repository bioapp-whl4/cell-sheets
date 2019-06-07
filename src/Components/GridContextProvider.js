import React from 'react'
import GridContainer from './Grid-components/GridContainer'

import { updateDisplayBoxes, updateDisplayBox } from '../redux/display.reducer'
import { connect } from 'react-redux';

export function ContextProvider (props) {
   
        if (props.box_id) {
            props.updateDisplayBox(true)
          props.updateDisplayBoxes(false)
           
        }
    
        return (<div>
          
                <h3>Box: {props.box_id}</h3>
                <GridContainer box_id={props.box_id} />
            
            </div>
        )
    
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