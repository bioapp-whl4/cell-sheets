import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {submit_picklist} from '../redux/display.reducer'


class Picklist_Icon extends Component{

    navigate = () => {
        this.props.history.goBack()
    }

    deleteSample = (sample) => {
        let new_picklist
        let removed = this.props.picklist.filter(pl_item => {
            return pl_item.specimen_id !== sample.specimen_id
        })
        if (removed.length === this.props.picklist.length){
            new_picklist = [...this.props.picklist, sample]
        } else {
            new_picklist = removed
        }
        this.props.submit_picklist(new_picklist)
    }

    render(){
        let samples = this.props.picklist.map((sample, i) => {
            return (
                <div key={i} >
                    <h6>
                        {sample.sample_name}
                        <div onClick={() => {this.deleteSample(sample)} }>X</div>
                    </h6>
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
                <div onClick={this.navigate}>
                    Back
                </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Picklist_Icon))

