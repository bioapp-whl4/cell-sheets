import React, {Component} from 'react'
import {connect} from 'react-redux'
import DisplayFreezers from '../DisplayFreezers/DisplayFreezers'
import FreezerBox from '../FreezerBox/FreezerBox'
import FreezerCane from '../FreezerCane/FreezerCane'
import {updateFreezerId,updateCaneId,updateBoxId,updateDisplayFreezer,
    updateDisplayCane,updateDisplayBoxes, updateDisplayBox} from '../../redux/display.reducer'

class DisplayInventory extends Component {

    backToFreezer = async () => {
        this.props.updateDisplayCane(false)
        this.props.updateDisplayFreezer(true)
        this.props.updateFreezerId(null)
        
        
    }
    backToCane = async () => {
        this.props.updateDisplayBoxes(false)
        this.props.updateDisplayCane(true)
        this.props.updateCaneId(null)

    }
    render (){
        
        return (
            <div>
                {this.props.freezer && <div><DisplayFreezers/></div>}
               {this.props.cane && <div><FreezerCane/> <button onClick={this.backToFreezer}>Back to Freezers</button></div>}
               {this.props.boxes && <div><FreezerBox/><button onClick={this.backToCane}>Back to Canes</button></div>}
               
            </div>
        )
}
}
const mapDispatchToProps = {
    //update ids
    updateFreezerId,
    updateCaneId,
    updateBoxId,
    // updateDisplays
    updateDisplayFreezer,
    updateDisplayCane,
    updateDisplayBoxes,
    updateDisplayBox
}
function mapStateToProps(state) {
    return {
        // Display Booleans
        freezer: state.display.freezer,
        cane: state.display.cane,
        boxes: state.display.boxes,
        box: state.display.box,
        // IDs to Search by
        freezer_id: state.display.freezer_id,
        cane_id: state.display.cane_id,
        box_id: state.display.box_id
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(DisplayInventory)