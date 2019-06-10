import React, {Component} from 'react'
import {submit_picklist} from '../redux/display.reducer'
import {connect} from 'react-redux'


class Picklist_Icon extends Component{

    render(){
        return(
            <div>
                Picklist: {this.props.picklist.length} sample(s).
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const { picklist } = reduxState.display
    return { picklist } 
}
const mapDispatchToProps = {
    submit_picklist
}
export default connect(mapStateToProps, mapDispatchToProps)(Picklist_Icon)

