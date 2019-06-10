import React, {Component} from 'react'
import axios from 'axios'
class AddSpecimen extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            description: '',
            box_position: null,
            freeze_date: '',
            cell_vial: null,
            experiment_id: '',
            culture_condition: '',
            freezing_medium_id: null,
            freezingMediums: [],
            expanded_note: '',
            field1: false,
            field2: false,
            field3: false,
            add1: '',
            add2: '',
            add3: '',
            locations: [],
            availableLocations: [],
        }
    }
    componentDidMount() {

    }
    addNewField = () => {
        if(!this.state.field1) {
            this.setState({field1:true})
        } else {this.setState({field1:false})}
    }
    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }
    getFreezerMediums = () => {
        axios.get('api/freezingmedium').then(res=>this.setState({freezingMediums: res.data}))
        .catch(err=>console.log('err getting freezer mediums',err))
    }
    render () {
        let freezingOptions = this.state.freezingMediums.map((elem,i)=>{
            return <option value={elem.freezing_medium_id} key={i}>{elem.freezingMedium}</option>
        })
        return(
            <div>
                {/* name, 
             description, 
             freeze_date, 
             cell_vial, 
			 freeezer_id,             
             experiment_id, 
             location_id, 
             cane_id, 
             box_id, 
             box_position, 
             culture_condition, 
             freezing_medium_id, 
             expanded_note, 
             add1, 
             add2, 
             add3, 
             add4, 
             add5) */}
                <h3>Sample ID:</h3>
                <input name='name' placeholder='Enter Sample ID'value={this.state.name} onChange={this.handleChange}/>
                <h3>Sample Description</h3>
                <input name='description' placeholder='Enter Sample Description' value={this.state.description} onChange={this.handleChange}/>
                <h3>Experiment ID</h3>
                <input name='experiment_id' placeholder='Enter Experiment ID' value={this.state.experiment_id}/>
                <h3>Cell Vial</h3>
                <input name='cell_vial' placeholder='Enter Cell Count' value={this.state.cell_vial} onChange={this.handleChange}/>
                <h3>Freeze Date</h3>
                <input name='freeze_date'placeholder='Enter Sample Freeze Date' value={this.state.freeze_date} onChange={this.handleChange}/>
                <h3>Culture Condition</h3>
                <input name='culture_condition' placeholder='Enter Culture Conditions' value={this.state.culture_condition} onChange={this.handleChange}/>
                <h3>Freezing Medium</h3>
                <select name='freezing_medium_id'>{freezingOptions}</select>
                <h3>Expanded Notes</h3>
                <input name='expanded_note' value={this.state.expanded_note} onChange={this.handleChange}/>
                <button name='field1' value={this.state.field1} >
                {!this.state.field1 && <h3>ADD NEW FIELD</h3>}
                {this.state.field1 && <h3>Cancel</h3>}
                </button>

                
            </div>
        )
    }
}
export default AddSpecimen