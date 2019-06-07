import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateAdvanceSearch} from '../../redux/display.reducer'

class AdvanceSearchResults extends Component {


        render () {
            
                let results_display = this.props.filterResults.map((sample, i) => {
            return (
                <div key={i}>
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
    updateAdvanceSearch
}

function mapStateToProps(state) {
    return {
        filterResults: state.reducer.filter_results
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AdvanceSearchResults)
    