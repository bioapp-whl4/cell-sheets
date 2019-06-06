import React, {Component} from 'react'
import {connect} from 'react-redux'

class Filter extends Component {
    state = {
        search_value: '',
        description: false,
        sample_id: false,
        experiment_id: false,
        start_date: '',
        end_date: '',
        dateContext: ''
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

    handleDate = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    dateContext = event => {
        this.setState({
            dateContext: event.target.id
        })
    }

    render(){

        let date_input = this.state.dateContext !== 'between' ? null : (
            <div>
                <label>End date:</label>
                <input type="date" name="end_date" value={this.state.end_date} onChange={this.handleDate}>
                </input>        
            </div>  
        )

        return(
            <div>
                <input type="text" name='search_value' placeholder='Search for...' onChange={this.handleInput}/>
                <div>
                    <input type="checkbox" name="description" onClick={this.handleCheck}/>
                    <label>Description</label>
                </div>            
                <div>
                    <input type="checkbox" name="sample_id" onClick={this.handleCheck}/>
                    <label>Sample ID</label>
                </div>            
                <div>
                    <input type="checkbox" name="experiment_id" onClick={this.handleCheck}/>
                    <label>Experiment ID</label>
                </div>  
                <div>
                    <label>Search by date:</label>
                    <input type="date" name="start_date" value={this.state.start_date} onChange={this.handleDate}>
                    </input>        
                </div> 
                <div>
                    <input type="radio" name="drone" id='before' onClick={this.dateContext}/>
                    <label>Before</label>
                </div>

                <div>
                    <input type="radio" name="drone" id='after' onClick={this.dateContext}/>
                    <label>After</label>
                </div>

                <div>
                    <input type="radio" name="drone" id='between' onClick={this.dateContext}/>
                    <label>Between</label>
                </div>

                {date_input}

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
