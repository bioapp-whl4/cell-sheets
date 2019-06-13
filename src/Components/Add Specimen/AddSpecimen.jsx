import React, {Component} from 'react'
import axios from 'axios'
import AddLocation from '../AddLocation/AddLocation'
import {addFreezerId,addCaneId,addBoxId} from '../../redux/display.reducer'
import AddSamples from '../AddBoxLocation/AddSamples'
import {connect} from 'react-redux'
class AddSpecimen extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            description: '',
            freeze_date: '',
            cell_vial: '',
            experiment_id: '',
            culture_condition: '',
            freezing_medium_id: '',
            freezingMediums: [],
            expanded_note: '',
            field1: false,
            field2: false,
            field3: false,
            body1: '',
            body2: '',
            body3: '',
            title1: '',
            title2: '',
            title3: ''
            
        
           
        }
    }
    componentDidMount () {
        this.getFreezerMediums()
    }
    createSample = () => {
        let freezer_id = this.props.freezerId
        let cane_id = this.props.caneId
        let box_id = this.props.boxId
        let user_id = this.props.user_id
        let box_position = this.state
        const {name,description,freeze_date,cell_vial,experiment_id,
            culture_condition,freezing_medium_id,expanded_note,add1,add2,add3} = this.state
        
        axios.post('/api/sample',{box_position,freezer_id,cane_id,box_id,user_id,name,description,freeze_date,cell_vial,experiment_id,
            culture_condition,freezing_medium_id,expanded_note,add1,add2,add3})
    }
    cancelField = (title,body,field) => {
        this.setState({[title]: '',[body]:'',[field]: false})

    }
  
    addNewField = (field) => {
        if(!this.state[field]) {
            this.setState({[field]:true})
        } else {this.setState({[field]:false})}
    }
    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }
    updateBoxPostion = (arr) => {
        this.setState({box_position: arr})
    }

    getFreezerMediums = () => {
        axios.get("/api/medium").then(res=>this.setState({freezingMediums: res.data}))
        .catch(err=>console.log('err getting freezer mediums',err))
    }
    render () {
        console.log('box_position', this.state.box_position)
        let freezingOptions = this.state.freezingMediums.map((elem,i)=>{
            return <option value={elem.id} key={i}>{elem.name}</option>
        })
        return(
            <div>
                <h3>Sample ID:</h3>
                <input name='name' placeholder='Enter Sample ID'value={this.state.name} onChange={this.handleChange}/>
                <h3>Sample Description</h3>
                <input name='description' placeholder='Enter Sample Description' value={this.state.description} onChange={this.handleChange}/>
                <h3>Experiment ID</h3>
                <input name='experiment_id' placeholder='Enter Experiment ID' value={this.state.experiment_id} onChange={this.handleChange}/>
                <h3>Cell Vial</h3>
                <input name='cell_vial' placeholder='Enter Cell Count' value={this.state.cell_vial} onChange={this.handleChange}/>
                <h3>Freeze Date</h3>
                <input name='freeze_date'placeholder='Enter Sample Freeze Date' type='date' value={this.state.freeze_date} onChange={this.handleChange}/>
                <h3>Culture Condition</h3>
                <input name='culture_condition' placeholder='Enter Culture Conditions' value={this.state.culture_condition} onChange={this.handleChange}/>
                <h3>Freezing Medium</h3>
                <select name='freezing_medium_id' onChange={this.handleChange}><option value=''>Choose Freezer Medium</option>{freezingOptions}</select>
                <h3>Expanded Notes</h3>
                <input name='expanded_note' value={this.state.expanded_note} onChange={this.handleChange}/>
                {/* Adding Additional Fields */}
                <button name='field1' value={this.state.field1} >
                {!this.state.field1 && <h3 onClick={()=>this.addNewField('field1')}>ADD NEW FIELD</h3>}
                {this.state.field1 && <h3  onClick={()=>this.cancelField('title1','body1','field1')}>Cancel</h3>}
                </button>
                {this.state.field1 &&  <div><h3>Add New Field</h3>
                <input/>
                <input name='title1' placeholder='Field Name' value={this.state.title1} onChange={this.handleChange}/>
                <input name='body1' placeholder='Description' value={this.state.body1} onChange={this.handleChange}/></div>}
                
                <button name='field2' value={this.state.field2} >
                {!this.state.field2 && <h3 onClick={()=>this.addNewField('field2')}>Add Second Field</h3>}
                {this.state.field2 && <h3 onClick={()=>this.cancelField('title2','body2','field2')}>Cancel Second Field</h3>}
                </button>
                {this.state.field2 &&  <div><h3>Add Second Field</h3>
                
                <input name='add2'onChange={this.handleChange}/></div>}

                <button name='field3' value={this.state.field3} >
                {!this.state.field3 && <h3 onClick={()=>this.addNewField('field3')}>Add Third Field</h3>}
                {this.state.field3 && <h3 onClick={()=>this.cancelField('title3','body3','field3')}>Cancel Third Field</h3>}
                </button>
                {this.state.field3 &&  <div><h3>Add Third Field</h3><input name='add3'onChange={this.handleChange}/></div>}
                <AddLocation/>
                {this.props.boxId && <div><AddSamples box_id={this.props.boxId} x={9} y={9} updateBoxPostion={this.updateBoxPostion}/></div>}
                <button className='addSpecimen' onClick={this.createSample}>Add Sample</button>
                <button className='Cancel' onClick={this.backToDash}>Cancel</button>
            </div>
        )
    }
}
const mapDispatchToProps = {
    addFreezerId,
    addCaneId,
    addBoxId
}
function mapStateToProps(state) {
    const {freezerId,caneId,boxId} = state.display
    const {user_id} = state.reducer
    return { user_id,freezerId,caneId,boxId}
        
}
export default connect(mapStateToProps,mapDispatchToProps)(AddSpecimen)