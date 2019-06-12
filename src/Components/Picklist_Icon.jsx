import React, {Component} from 'react'
import {submit_picklist} from '../redux/display.reducer'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'



class Picklist_Icon extends Component{

    navigate = () => {
        this.props.history.push('/picklist')
    }

    render(){
        return(
            <div className='picklist-icon' onClick={this.navigate}>
                {this.props.picklist.length} sample(s)
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Picklist_Icon))

