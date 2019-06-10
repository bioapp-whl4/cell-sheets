import React, {Component} from 'react'
import {submit_picklist} from '../redux/display.reducer'
import {connect} from 'react-redux'


class Picklist_Icon extends Component{

    render(){
        let samples = this.props.picklist.map((sample, i) => {
            return (
                <div key={i} >
                    <h6>{sample.sample_name}</h6>
                    <ul>
                        <li>Description: {sample.description}</li>
                        <li>Freeze Date: {sample.freeze_date}</li>
                        <li>Experiment ID: {sample.experiment_name}</li>
                    </ul>
                </div>
            )
        })

        return(
            <div>
                {samples}
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

