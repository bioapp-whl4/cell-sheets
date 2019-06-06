import React, { Component } from 'react'

import { updateFreezers } from '../../redux/auth.reducer'
import { connect } from 'react-redux'


class Hierarchy extends Component {

    render() {
        let displayInventory = (
            <ul>
                {this.props.inventory.map(freezer => {
                    return ( <li> {freezer.freezer_name}:{freezer.freezer_type}
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
        console.log('this state',this.state)
        return (
           <div>
               {displayInventory}
           </div>
        )
    }
}
const mapDispatchToProps = {
    updateFreezers
}
function mapStateToProps(state) {
    return {inventory: state.reducer.everything
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Hierarchy)