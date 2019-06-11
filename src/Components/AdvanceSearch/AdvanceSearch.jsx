import React, {Component} from 'react'
import {connect} from 'react-redux'
import { updateEverything, store_filter_results } from '../../redux/auth.reducer'
import {updateAdvanceSearch,updateFreezerId,updateCaneId,updateBoxId,updateDisplayFreezer,updateDisplayCane,updateDisplayBoxes,updateDisplayBox} from '../../redux/display.reducer'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

class Filter extends Component {
    state = {
        search_value: '',
        description: true,
        sample_id: true,
        experiment_id: true,
        date: false,
        start_date: '2019-01-01',
        end_date: '2019-01-01',
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
            console.log(`Something is wrong`)
        }
    }
    async componentDidMount(){
        this.props.updateEverything( await this.getInventory())
        this.setState({
            inventory: this.props.everything
        })
    }
    // Added Clear Search as well as close display
    closeDisplay = () => {
        this.props.updateFreezerId(null)
        this.props.updateCaneId(null)
        this.props.updateBoxId(null)
        this.props.updateDisplayFreezer(true)
        this.props.updateDisplayCane(false)
        this.props.updateDisplayBoxes(false)
        this.props.updateDisplayBox(false)
        this.props.updateAdvanceSearch(false)
    }
    resetSearch = () => {
        this.setState({search_value: '',
        description: true,
        sample_id: true,
        experiment_id: true,
        date: false,
        start_date: '2019-01-01',
        end_date: '2019-01-01',
        dateContext: '',})
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
        let results
        if (this.state.search_value){
            results = this.state.samples.filter(sample => {
                let search_within = ''
                search_within += this.state.description && sample.description ? sample.description.toLowerCase() : ''
                search_within += this.state.experiment_id && sample.experiment_name ? sample.experiment_name.toLowerCase() : ''
                search_within += this.state.sample_id && sample.sample_name ? sample.sample_name.toLowerCase() : ''
                return search_within.includes(this.state.search_value.toLowerCase())
            })
        } else {
            results = this.state.samples
        }

        if (this.state.date){
            let start_date = Date.parse(new Date(this.state.start_date))
            let end_date = Date.parse(new Date(this.state.end_date))

            if (this.state.dateContext === `before`) {
                results = results.filter(sample => {
                    let sample_date = Date.parse(new Date(sample.freeze_date))
                    return start_date - sample_date > 0
              })

            } else if(this.state.dateContext === `after`){
                results = results.filter(sample => {
                    let sample_date = Date.parse(new Date(sample.freeze_date))
                    return start_date - sample_date < 0
                })

            } else if(this.state.dateContext === `between`){
                results = results.filter(sample => {
                    let sample_date = Date.parse(new Date(sample.freeze_date))
                    return ((sample_date - start_date > 0) && (end_date - sample_date > 0))
                })
            }
        }
        
        // store filter results in redux
        this.props.store_filter_results(results)

        // let results_display = results.map((sample, i) => {
        //     return (
                // <div key={i} onClick={() => {this.props.history.push(`/api/cane/boxes/${sample.box_id}`)}}>
                //     <h6>{sample.sample_name}</h6>
                //     <ul>
                //         <li>Description: {sample.description}</li>
                //         <li>Freeze Date: {sample.freeze_date}</li>
                //         <li>Experiment ID: {sample.experiment_name}</li>
                //     </ul>
        
                // </div>
        //     )
        // })
        

        return(
            <div>
                <i onClick={this.closeDisplay} className="fas fa-times exit"></i>

                <input type="text" name='search_value' value={this.state.search_value} placeholder='Search for...' onChange={this.handleInput}/>
                <div>
                    <input type="checkbox" name="description"  onClick={this.handleCheck} defaultChecked/>
                    <label>Description</label>
                </div>            
                <div>
                    <input type="checkbox" name="sample_id" onClick={this.handleCheck} defaultChecked/>
                    <label>Sample ID</label>
                </div>            
                <div>
                    <input type="checkbox" name="experiment_id" onClick={this.handleCheck} defaultChecked/>
                    <label>Experiment ID</label>
                </div>  
                <div>
                    <label>Search by date:</label>
                    <input type="date" name="start_date" value={this.state.start_date} onChange={this.handleDate}>
                    </input>        
                </div> 
                <div>
                    <input type="checkbox" name="date" onClick={this.handleCheck} />
                    <label>Filter by Date </label>
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
                <button onClick={this.resetSearch}>Clear Search</button>

            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const { everything, user_id } = reduxState.reducer
    return { everything, user_id } 
}
const mapDispatchToProps = {
    updateEverything,
    store_filter_results,
    updateFreezerId,
    updateCaneId,
    updateBoxId,
    updateDisplayFreezer,
    updateDisplayCane,
    updateDisplayBoxes,
    updateDisplayBox,
    updateAdvanceSearch
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter((Filter)))
