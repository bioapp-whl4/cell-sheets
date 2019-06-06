import React, {Component} from 'react'
import {connect} from 'react-redux'

class Filter extends Component {
    state = {
        search_value: '',
        description: false,
        sample_id: false,
        experiment_id: false
    }

    handleInput = event => {
        this.setState({
            [event.target.name]: event.target.value
        })}

    handleCheck = event => {
        this.setState({
            [event.target.name]: !this.state[event.target.name]
        })
    }

    render(){
        return(
            <div>
                <input type="text" name='search_value' placeholder='Search for...' onChange={this.handleInput}/>
                <div>
                    <input type="checkbox" id="scales" name="description" onClick={this.handleCheck}/>
                    <label htmlFor="scales">Description</label>
                </div>            
                <div>
                    <input type="checkbox" id="scales" name="sample_id" onClick={this.handleCheck}/>
                    <label htmlFor="scales">Sample ID</label>
                </div>            
                <div>
                    <input type="checkbox" id="scales" name="experiment_id" onClick={this.handleCheck}/>
                    <label htmlFor="scales">Experiment ID</label>
                </div>            
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const { everything } = reduxState.reducer
    return { everything } 
}
// const mapDispatchToProps = {
//     updateEverything
// }
export default connect(mapStateToProps, null)(Filter)
