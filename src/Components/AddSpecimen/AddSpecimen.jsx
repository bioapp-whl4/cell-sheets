import React, { Component } from 'react'
import axios from 'axios'
import AddLocation from '../AddLocation/AddLocation'
import { addFreezerId, addCaneId, addBoxId } from '../../redux/display.reducer'
import AddSamples from '../AddBoxLocation/AddSamples'
import { connect } from 'react-redux'
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
    componentDidMount() {
        this.getFreezerMediums()
    }
    createSample = async () => {
        const { box_position,body1, body2, body3, title1, title2, title3,name, description, freeze_date, cell_vial, experiment_id,
            culture_condition, freezing_medium_id, expanded_note} = this.state
        let add1 = `${title1}: ${body1}`
        let add2 = `${title2}: ${body2}`
        let add3 = `${title3}: ${body3}`
        +freezing_medium_id
        let location_id = 1
        let freezer_id = +this.props.freezerId
        let cane_id = +this.props.caneId
        let box_id = +this.props.boxId
        let user_id = +this.props.user_id
        await axios.post('/api/sample', {
            box_position, location_id, freezer_id, cane_id, box_id, user_id, name, description, freeze_date, cell_vial, experiment_id,
            culture_condition, freezing_medium_id, expanded_note, add1, add2, add3
        }).then(res => {console.log('success creating new sample',res); this.setState({ name: '',
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
        title3: ''})})
        this.props.addFreezerId(null)
        this.props.addCaneId(null)
        this.props.addBoxId(null)
    }
    cancelField = (title, body, field) => {
        this.setState({ [title]: '', [body]: '', [field]: false })

    }

    addNewField = (field) => {
        if (!this.state[field]) {
            this.setState({ [field]: true })
        } else { this.setState({ [field]: false }) }
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    updateBoxPostion = (arr) => {
        this.setState({ box_position: arr })
    }

    getFreezerMediums = () => {
        axios.get("/api/medium").then(res => this.setState({ freezingMediums: res.data }))
            .catch(err => console.log('err getting freezer mediums', err))
    }
    render() {
        console.log('box_position', this.state.box_position)
        let freezingOptions = this.state.freezingMediums.map((elem, i) => {
            return <option value={elem.id} key={i}>{elem.name}</option>
        })
        return (
            <div className='NewInventory'>
            <div className='InputFields'>
                <div className='SampleId'>
                <h4 className='title'>Sample ID:</h4>
                <input className='' name='name' placeholder='Enter Sample ID' value={this.state.name} onChange={this.handleChange} />
                </div>
                <div className='SampleDescription'>
                <h4>Sample Description</h4>
                <input name='description' placeholder='Enter Sample Description' value={this.state.description} onChange={this.handleChange} />
                </div>
                <div className='ExperimentId'>
                <h4>Experiment ID</h4>
                <input name='experiment_id' placeholder='Enter Experiment ID' value={this.state.experiment_id} onChange={this.handleChange} />
                </div>
                <div className='CellVial'>
                <h4>Cell Vial</h4>
                <input name='cell_vial' placeholder='Enter Cell Count' value={this.state.cell_vial} onChange={this.handleChange} />
                </div>
                <div className='FreezeDate'>
                <h4>Freeze Date</h4>
                <input name='freeze_date' placeholder='Enter Sample Freeze Date' type='date' value={this.state.freeze_date} onChange={this.handleChange} />
                </div>
                <div className='CultureCondition'>
                <h4>Culture Condition</h4>
                <input name='culture_condition' placeholder='Enter Culture Conditions' value={this.state.culture_condition} onChange={this.handleChange} />
                </div>
                <div className='FreezingMedium'>
                <h4>Freezing Medium</h4>
                <select name='freezing_medium_id' onChange={this.handleChange}><option value=''>Choose Freezer Medium</option>{freezingOptions}</select>
                </div>
                <div className='ExpandedNotes'>
                <h4>Expanded Notes</h4>
                <input name='expanded_note' value={this.state.expanded_note} onChange={this.handleChange} />
                {/* Adding Additional Fields */}
                </div>
                </div>
                <div className='additionalFields'>
                <button className='FieldButton'name='field1' value={this.state.field1} >
                    {!this.state.field1 && <h4 onClick={() => this.addNewField('field1')}>Add New Field</h4>}
                    {this.state.field1 && <h4 onClick={() => this.cancelField('title1', 'body1', 'field1')}>Cancel</h4>}
                </button>
                {this.state.field1 && <div className='NewField'><h4>Add New Field</h4>
          
                    <input name='title1' placeholder='Field Name' value={this.state.title1} onChange={this.handleChange} />
                    <input name='body1' placeholder='Description' value={this.state.body1} onChange={this.handleChange} /></div>}

                <button className='FieldButton' name='field2' value={this.state.field2} >
                    {!this.state.field2 && <h4 onClick={() => this.addNewField('field2')}>Add Second Field</h4>}
                    {this.state.field2 && <h4 onClick={() => this.cancelField('title2', 'body2', 'field2')}>Cancel Second Field</h4>}
                </button>
                {this.state.field2 && <div className='NewField' ><h4>Add Second Field</h4>

                    <input name='title2' placeholder='Field Name' value={this.state.title2} onChange={this.handleChange} />
                    <input name='body2' placeholder='Description' value={this.state.body2} onChange={this.handleChange} /></div>}

                <button className='FieldButton' name='field3' value={this.state.field3} >
                    {!this.state.field3 && <h4 onClick={() => this.addNewField('field3')}>Add Third Field</h4>}
                    {this.state.field3 && <h4 onClick={() => this.cancelField('title3', 'body3', 'field3')}>Cancel Third Field</h4>}
                </button>
                {this.state.field3 && <div className='NewField' ><h4>Add Third Field</h4>
                    <input name='title3' placeholder='Field Name' value={this.state.title3} onChange={this.handleChange} />
                    <input name='body3' placeholder='Description' value={this.state.body3} onChange={this.handleChange} /></div>}
                </div>
                <div className='AddLocation'><AddLocation updateBoxPostion={this.updateBoxPostion} /></div>
                {this.props.boxId && <div className='addSample'><AddSamples x={9} y={9} updateBoxPostion={this.updateBoxPostion} /></div>}
                
                <button className='Add' onClick={this.createSample}>Add Sample</button>
                <button className='Cancel' onClick={this.props.back}>Cancel</button>
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
    const { freezerId, caneId, boxId } = state.display
    const { user_id } = state.reducer
    return { user_id, freezerId, caneId, boxId }

}
export default connect(mapStateToProps, mapDispatchToProps)(AddSpecimen)