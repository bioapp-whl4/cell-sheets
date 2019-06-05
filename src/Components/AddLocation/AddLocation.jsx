import React, { Component } from 'react'
import axios from 'axios'
import Popup from 'reactjs-popup'


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
    handleFreezer = async (e) => {

        await this.setState({ [e.target.name]: e.target.value, freezercane_id: '', freezerbox_id: '' })
        if(+this.state.freezer_id < 0) {
            this.setState({freezer_id: '',freezerboxes:[], freezercanes:[]})
        } else {
        let res = await axios.get(`/api/freezer/canes?id=${this.state.freezer_id}`)
        this.setState({ freezercanes: res.data, freezerboxes: [] })}
        }

    handleCane = async (e) => {
        await this.setState({ [e.target.name]: e.target.value, freezerbox: '' })
        let res = await axios.get(`/api/cane/boxes?id=${this.state.freezercane_id}`)
        this.setState({ freezerboxes: res.data })


    }
    handleBox = async (e) => {
        await this.setState({[e.target.name]: e.target.value})
    }
    //Adding New Freezers
    selectChange = (e,field) => {
        if (e.target.value !== 'custom' && e.target.value !== 'default') {
            this.setState({ [e.target.name]: e.target.value, [field]: false })
        } else if (e.target.value === 'default') {
            this.setState({[e.target.name]: '',[field]: false})
        }  
        else {this.setState({[field]: true})}
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value})

    }
    // //<h3>{elem.freezer_name}</h3>
    // <i class="fas fa-temperature-low"></i>
    // <h4>{elem.temperature}</h4>
    // <h4>{elem.freezer_type}</h4>
    render() {
        console.log('this is the STATE', this.state)
        console.log(this.state.freezercanes)
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
                <h3>Location</h3>
                <h4>Freezers</h4>
                <Popup trigger={<button>Add New Freezer</button>} modal>
                    {close => (
                        <div className="modal">
                            <button onClick={close} className="close">&times;</button>
                            <div className="PopUpheader" > Add New Freezer </div>
                            <div className="PopUpcontent" >
                                <h4>Freezer Name</h4>
                                <input onChange={this.handleChange} placeholder='Freezer Name' name='freezer_name' value={this.state.freezer_name} />
                                <h4>Freezer Type</h4>
                                <select name='freezer_type' onChange={(e)=>this.selectChange(e,'custom_type')}>
                                    <option value='default'>Choose Freezer Type</option>
                                    <option value='Liquid Nitrogen'>Liquid Nitrogen</option>
                                    <option value='custom'>Custom</option>
                                </select>
                                {this.state.custom_type && <input onChange={this.handleChange} placeholder='Freezer Type' name='freezer_type' />}
                                <h4>Freezer Temperature</h4>
                                <select name='temperature' onChange={(e)=>this.selectChange(e,'custom_temp')}>
                                    <option value='default'>Choose A Temperature</option>
                                    <option value='-39C'>-39C</option>
                                    <option value='-40C'>-40C</option>
                                    <option value='custom'>Custom Temperature</option>
                                </select>
                                {this.state.custom_temp && <input onChange={this.handleChange} placeholder='Custom Temperature' name='temperature' />}
                            </div>
                            <div className="PopUpactions" >
                                <button className="PopUpcancel" onClick={() => { console.log('modal closed '); close() }}>Cancel</button>
                            </div>
                        </div>
                    )}
                </Popup>
                <select name='freezer_id' onChange={this.handleFreezer}><option value='-1'>Choose a Freezer</option>{freezers}</select>
                <h4>Freezer Cane</h4>
                {this.state.freezer_id && <Popup trigger={<button>Add New Freezer Cane</button>} modal>
                    {close => (
                        <div className="modal">
                            <button onClick={close} className="close">&times;</button>
                            <div className="PopUpheader" > Add New Freezer Cane </div>
                            <div className="PopUpcontent" >
                                <h4>Freezer Cane Name</h4>
                                <input onChange={this.handleChange} placeholder='Freezer Cane Name' name='cane' value={this.state.cane} />
                                <button className="PopUpcancel" onClick={() => { console.log('modal closed '); close() }}>Cancel</button>
                            </div>
                        </div>
                    )}
                </Popup>}
                
                <select name='freezercane_id' onChange={this.handleCane}><option value='-1'>Choose a Freezercane</option>{freezerCanes}</select>
                <h4>Freezer Boxes</h4>
                <Popup trigger={<button>Add New Freezer Box</button>} modal>
                    {close => (
                        <div className="modal">
                            <button onClick={close} className="close">&times;</button>
                            <div className="PopUpheader" > Add New Box </div>
                            <div className="PopUpcontent" >
                                <h4>Freezer Box</h4>
                                <input onChange={this.handleChange} placeholder='Box Name' name='cane' value={this.state.cane} />
                                <button className="PopUpcancel" onClick={() => { console.log('modal closed '); close() }}>Cancel</button>
                            </div>
                        </div>
                    )}
                </Popup>}
                <select name='freezerbox_id' onChange={this.handleChange}><option value='-1'>Choose a Freezer Box</option>{freezerBoxes}</select>
            </div>
        )
    }

}



export default AddLocation