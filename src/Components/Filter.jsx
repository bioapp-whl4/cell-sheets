import React, {Component} from 'react'
import {connect} from 'react-redux'
import { updateEverything } from '../redux/auth.reducer'
import axios from 'axios'

class Filter extends Component {
    state = {
        search_value: '',
        description: false,
        sample_id: false,
        experiment_id: false,
        start_date: '',
        end_date: '',
        dateContext: '',
        inventory: [],
        samples: []
    }

    getInventory = async () => {
        let freezers = []
        let samples = []
        try{
            let res1 = await axios.get('/api/freezers')
            res1.data.map( async (freezer) => {
                let res2 = await axios.get(`/api/freezer/canes?id=${freezer.freezer_id}`)
                freezer.canes = res2.data  // add the canes array to the freezer object
                freezer.canes.forEach( async (cane) => { // get the boxes for each cane
                    let res3 = await axios.get(`/api/cane/boxes?id=${cane.cane_id}`)
                    cane.boxes = res3.data // add the boxes to the cane object
                    cane.boxes.forEach( async (box) => {
                        let res4 = await axios.get(`/api/box/samples?id=${box.box_id}`)
                        box.samples = res4.data
                        samples.push(...res4.data)
                    })
                })
                    freezers.push(freezer) //add each freezer to the freezer array
            })
            this.setState({
                samples: samples
            })
            return freezers
        } catch(err){
            alert(`Something is wrong`)
        }
    }
    async componentDidMount(){
        this.props.updateEverything( await this.getInventory())
        this.setState({
            inventory: this.props.everything
        })
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

        let results = this.state.samples.filter(sample => {
            
        })

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
                {this.state.dateContext !== 'between' ? null : (
                    <div>
                        <label>End date:</label>
                        <input type="date" name="end_date" value={this.state.end_date} onChange={this.handleDate}>
                        </input>        
                    </div>  
                )}

            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const { everything, user_id } = reduxState.reducer
    return { everything, user_id } 
}
const mapDispatchToProps = {
    updateEverything
}
export default connect(mapStateToProps, mapDispatchToProps)(Filter)
