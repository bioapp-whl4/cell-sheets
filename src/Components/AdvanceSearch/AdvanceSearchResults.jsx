import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    updateAdvanceSearch, updateDisplayBox,updateFreezerId,updateCaneId,updateBoxId} from '../../redux/display.reducer'

class AdvanceSearchResults extends Component {

    displayBox = (freezer_id, cane_id, box_id) => {
            this.props.updateFreezerId(freezer_id)
            this.props.updateCaneId(cane_id)
            this.props.updateBoxId(box_id)
            this.props.updateAdvanceSearch(false)
            this.props.updateDisplayBox(true)
    }
    render() {
        
        let results_display = this.props.filterResults.map((sample, i) => {

            return (
                <div onClick={()=>this.displayBox(sample.freezer_id,sample.cane_id,sample.box_id)} key={i}>
                    <h6>{sample.sample_name}</h6>
                    <ul>
                        <li>Description: {sample.description}</li>
                        <li>Freeze Date: {sample.freeze_date}</li>
                        <li>Experiment ID: {sample.experiment_name}</li>
                    </ul>

                </div>
            )
        })

        return (<div>
            {results_display}
        </div>
        )
    }
}


const mapDispatchToProps = {
    updateFreezerId,
    updateCaneId,
    updateBoxId,
    updateAdvanceSearch,
    updateDisplayBox
}

function mapStateToProps(state) {
    return {
        filterResults: state.reducer.filter_results
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdvanceSearchResults)
