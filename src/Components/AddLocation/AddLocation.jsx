import React, { Component } from 'react'
import axios from 'axios'
import Popup from 'reactjs-popup'
import { addFreezerId, addCaneId, addBoxId } from '../../redux/display.reducer'
import { connect } from 'react-redux'



class AddLocation extends Component {
    constructor() {
        super();
        this.state = {
            //Axios info
            freezers: [],
            freezercanes: [],
            freezerboxes: [],
            box: [],

            freezer_id: '',
            freezercane_id: '',
            freezerbox_id: '',

            // adding Freezer
            freezer_name: '',
            temperature: '',
            freezer_type: '',
            custom_temp: false,
            custom_type: false,
            // adding freezercane
            cane: '',
            // adding freezerbox
            box_name: '',
            custom_size: false,
            //box size
            x: 0,
            y: 0




        }
    }
    componentDidMount() {
        this.getAllFreezers()
    }

    //Dynamic Selection Options 
    getAllFreezers = () => {
        axios.get('/api/freezers').then(res => this.setState({ freezers: res.data }))
            .catch(err => console.log('get freezers in adding', err))

    }

    //Add New Tiers
    addNewFreezer = async () => {
        // ${name}, ${temp}, ${lab_id});
        const { freezer_name, temperature } = this.state
        let name = freezer_name
        let temp = +temperature
        // let type = freezer_type
        let lab_id = 1
        await axios.post("/api/freezer", { name, temp, lab_id })
        this.setState({ freezer_name: '', temperature: '', freezer_type: '', freezers: [] })
        this.getAllFreezers()
    }
    addNewCane = async () => {
        // ${name}, ${freezer_id})
        const { freezer_id, cane } = this.state
        let name = cane
        await axios.post('/api/cane', { name, freezer_id })
        this.setState({ cane: '' })
        this.getFreezer()
    }
    addNewBox = () => {
        // ${name}, ${cane_id})
        const { freezercane_id, box_name } = this.state
        let name = box_name
        let cane_id = freezercane_id
        axios.post('/api/box', { name, cane_id })
        this.setState({ box_name: '' })
        this.getCane()

    }
    getFreezer = async () => {
        if (+this.state.freezer_id < 0) {
            this.setState({ freezer_id: '', freezercane_id: '', freezerboxes: [], freezercanes: [] })
            this.props.addFreezerId(null)
            this.props.addCaneId(null)
            this.props.addBoxId(null)
        } else {
            let res = await axios.get(`/api/freezer/canes?id=${this.state.freezer_id}`)
            this.setState({ freezercanes: res.data, freezerboxes: [] })
            this.props.addFreezerId(this.state.freezer_id)
        }
    }
    handleFreezer = async (e) => {

        await this.setState({ [e.target.name]: e.target.value, freezercane_id: '', freezerbox_id: '' })
        if (+this.state.freezer_id < 0) {
            this.setState({ freezer_id: '', freezercane_id: '', freezerboxes: [], freezercanes: [] })
            this.props.addFreezerId(null)
            this.props.addCaneId(null)
            this.props.addBoxId(null)
        } else {
            let res = await axios.get(`/api/freezer/canes?id=${this.state.freezer_id}`)
            this.setState({ freezercanes: res.data, freezerboxes: [] })
            this.props.addFreezerId(this.state.freezer_id)
        }
    }

    getCane = async () => {
        if (+this.state.freezercane_id < 0) {
            this.setState({ freezerboxes: [], freezercane_id: '', freezerbox_id: '' })
            this.props.addCaneId(null)
        } else {
            let res = await axios.get(`/api/cane/boxes?id=${this.state.freezercane_id}`)
            this.setState({ freezerboxes: res.data })
            this.props.addCaneId(this.state.freezercane_id)
        }
    }

    handleCane = async (e) => {
        await this.setState({ [e.target.name]: e.target.value, freezerboxes: [], freezerbox_id: '' })
        if (+this.state.freezercane_id < 0) {
            this.setState({ freezerboxes: [], freezercane_id: '', freezerbox_id: '' })
            this.props.addCaneId(null)
        } else {
            let res = await axios.get(`/api/cane/boxes?id=${this.state.freezercane_id}`)
            this.setState({ freezerboxes: res.data })
            this.props.addCaneId(this.state.freezercane_id)
        }


    }

    handleBox = async (e) => {
        await this.setState({ [e.target.name]: e.target.value, box: '' })
        if (+this.state.freezerbox_id < 0) {
            this.setState({ box_id: '', freezerbox_id: '', box_position: '' })
            this.props.addBoxId(null)
        } else {
            let res = await axios.get(`/api/cane/boxes?id=${this.state.freezercane_id}`)
            this.setState({ freezerboxes: res.data })
            this.props.addBoxId(this.state.freezerbox_id)
            this.props.updateBoxPostion(null)

        }

    }
    //Adding New Freezers
    selectChange = (e, field) => {
        if (e.target.value !== 'custom' && e.target.value !== 'default') {
            this.setState({ [e.target.name]: e.target.value, [field]: false })
        } else if (e.target.value === 'default') {
            this.setState({ [e.target.name]: '', [field]: false })
        }
        else { this.setState({ [e.target.name]: '', [field]: true }) }
    }
    selectBox = (e, field) => {
        if (e.target.value !== 'custom' && e.target.value !== 'default') {
            let z = e.target.value.split(',')
            let x = +z[0]
            let y = +z[1]
            this.setState({ x: x, y: y, [field]: false })
        } else if (e.target.value === 'custom') {
            this.setState({ x: 0, y: 0, [field]: true })
        }
        else { this.setState({ x: 0, y: 0, [field]: false }) }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })

    }

    render() {
        let freezers = this.state.freezers.map((elem, i) => {
            return <option value={elem.freezer_id} key={i}>{`${elem.freezer_name}: ${elem.freezer_type}`}</option>
        })

        let freezerCanes = this.state.freezercanes.map((elem, i) => {
            return <option value={elem.cane_id} key={i}>Cane: {elem.cane}</option>
        })
        let freezerBoxes = this.state.freezerboxes.map((elem, i) => {
            return <option value={elem.box_id} key={i}>{elem.box_name}</option>
        })
        return (
            <div>
                <h4>Location:</h4>
                <h4>Freezers</h4>
                <Popup trigger={<button className='NewLocations'>Add New Freezer</button>} modal>
                    {close => (
                        <div className="modal">
                            <button onClick={close} className="close">&times;</button>
                            <div className="PopUpheader" > <h3>Add New Freezer</h3> </div>
                            <div className="PopUpcontent" >
                                <h4>Freezer Name</h4>
                                <input onChange={this.handleChange} placeholder='Freezer Name' name='freezer_name' value={this.state.freezer_name} />
                                <h4>Freezer Type</h4>
                                <select name='freezer_type' onChange={(e) => this.selectChange(e, 'custom_type')}>
                                    <option value='default'>Choose Freezer Type</option>
                                    <option value='Liquid Nitrogen'>Liquid Nitrogen</option>
                                    <option value='custom'>Custom</option>
                                </select>
                                {this.state.custom_type && <input onChange={this.handleChange} placeholder='Freezer Type' name='freezer_type' />}
                                <h4>Freezer Temperature</h4>
                                <select name='temperature' onChange={(e) => this.selectChange(e, 'custom_temp')}>
                                    <option value='default'>Choose A Temperature</option>
                                    <option value='-39'>-39C</option>
                                    <option value='-40'>-40C</option>
                                    <option value='custom'>Custom Temperature</option>
                                </select>
                                {this.state.custom_temp && <input onChange={this.handleChange} placeholder='Custom Temperature' name='temperature' />}
                            </div>
                            <div className="PopUpactions" >
                                <button className="PopUpcancel" onClick={() => { this.setState({ freezer_type: '', temperature: '', freezer_name: '' }); console.log('modal closed '); close() }}>Cancel</button>
                                <button className='SubmitNew' onClick={() => { this.addNewFreezer(); close() }}>Add Freezer</button>
                            </div>
                        </div>
                    )}
                </Popup>
                <select name='freezer_id' onChange={this.handleFreezer}><option value='-1'>Choose a Freezer</option>{freezers}</select>
                <h4>Freezer Cane</h4>
                {this.state.freezer_id && <Popup trigger={<button className='NewLocations' >Add New Cane</button>} modal>
                    {close => (
                        <div className="modal">
                            <button onClick={close} className="close">&times;</button>
                            <div className="PopUpheader" > Add New Freezer Cane </div>
                            <div className="PopUpcontent" >
                                <h4>Freezer Cane Name</h4>
                                <input onChange={this.handleChange} placeholder='Freezer Cane Name' name='cane' value={this.state.cane} />
                            </div>
                            <div className="PopUpactions" >
                                <button className="PopUpcancel" onClick={() => { this.setState({ cane: '' }); console.log('modal closed '); close() }}>Cancel</button>
                                <button className='SubmitNew' onClick={() => { this.addNewCane(); close() }}>Add Cane</button>

                            </div>
                        </div>
                    )}
                </Popup>}

                <select name='freezercane_id' onChange={this.handleCane}><option value='-1'>Choose a Freezercane</option>{freezerCanes}</select>
                <h4>Freezer Boxes</h4>
                {this.state.freezercane_id && <Popup trigger={<button className='NewLocations'>Add New Box</button>} modal>
                    {close => (
                        <div className="modal">
                            <button onClick={close} className="close">&times;</button>
                            <div className="PopUpheader" > Add New Box </div>
                            <div className="PopUpcontent" >
                                <h4>Freezer Box</h4>
                                <input onChange={this.handleChange} placeholder='Box Name' name='box_name' />

                                <select name='box_size' onChange={(e) => this.selectBox(e, 'custom_size')}>
                                    <option value='default'>Choose A Size</option>
                                    <option value='9,9'>9X9</option>
                                    <option value='10,10'>10X10</option>
                                    <option value='8,12'>8X12</option>
                                    <option value='custom'>Custom size</option>
                                </select>
                                {this.state.custom_size &&
                                    <div>
                                        <h4>How many Rows</h4>
                                        <input onChange={this.handleChange} type='number' placeholder='Enter in Rows' name='x' />
                                        <h4>How many Columns</h4>
                                        <input onChange={this.handleChange} type='number' placeholder='Enter in Columns' name='y' />
                                    </div>}
                            </div>
                            <div className="PopUpactions" >
                                <button className="PopUpcancel" onClick={() => { this.setState({ custom_size: false,box_name: '', x: 0, y: 0 }); console.log('modal closed '); close() }}>Cancel</button>
                                <button className='SubmitNew' onClick={() => { this.addNewBox(); close() }}>Add Box</button>
                            </div>
                        </div>
                    )}
                </Popup>}
                <select name='freezerbox_id' onChange={this.handleBox}><option value='-1'>Choose a Freezer Box</option>{freezerBoxes}</select>
            </div>
        )
    }

}
const mapDispatchToProps = {
    addFreezerId,
    addCaneId,
    addBoxId

}



export default connect(null, mapDispatchToProps)(AddLocation)