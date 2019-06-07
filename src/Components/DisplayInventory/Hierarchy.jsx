import React, { Component } from 'react'
import {updateFreezerId,updateCaneId,updateBoxId,updateDisplayFreezer,
    updateDisplayCane,updateDisplayBoxes, updateDisplayBox} from '../../redux/display.reducer'
import { connect } from 'react-redux'


class Hierarchy extends Component {

    handleFreezer = (id) => {
        this.props.updateDisplayFreezer(true)
        this.props.updateDisplayCane(false)
        this.props.updateDisplayBoxes(false)
        this.props.updateDisplayBox(false)
        this.props.updateFreezerId(id)
        this.props.updateCaneId(null)
        this.props.updateBoxId(null)
    }
    render() {
        let displayInventory = (
            <ul>
                {this.props.inventory.map(freezer => {
                    return ( <li onClick={()=>this.handleFreezer(freezer.freezer_id)}> {freezer.freezer_name}:{freezer.freezer_type}
                            <ul>
                                {freezer.canes.map(cane => {
                                    return (
                                        <li>
                                            <h6>Cane:{cane.cane}</h6>
                                            <ul>
                                                {cane.boxes.map(box => {
                                                    return (
                                                        <li>
                                                            <h6>Box:{box.box_name}</h6>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </li>
                                    )
                                })}
                            </ul>
                        </li>
                    )
                })}
            </ul>
        )
        console.log('props everything',this.props.inventory)
        
        return (
           <div>
               <h1>TEST</h1>
               <div>{displayInventory}</div>
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
    return {inventory: state.reducer.everything
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Hierarchy)