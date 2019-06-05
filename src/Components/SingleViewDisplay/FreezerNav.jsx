import React, { Component } from 'react'
import axios from 'axios'
import { updateFreezers } from '../../redux/auth.reducer'
import { connect } from 'react-redux'

class FreezerNav extends Component {
    constructor() {
        super();
        this.state = {
            freezers: [],
            freezercanes: [],
            freezerboxes: [],
            //tier display

            freezer_id: '',
            cane_id: '',
            box_id:''

        }
    }
    async componentDidMount() {
        await this.getFreezers()
    }
    getFreezers = async () => {
        let res = await axios.get('/api/freezers')
        this.setState({ freezers: res.data })
        this.props.updateFreezers(res.data)
    }
    getFreezerCane = async (freezer_id) => {
        let res = await axios.get(`/api/freezer/canes?id=${freezer_id}`)
        this.setState({ freezer_id: freezer_id, cane_id: '', freezercanes: res.data })

    }
    getFreezerBox = async (cane_id) => {
        let res = await axios.get(`/api/cane/boxes?id=${cane_id}`)
        this.setState({ freezerboxes: res.data, cane_id: cane_id })

    }
    clearFreezers = () => {
        this.setState({ freezer_id: '',cane_id: ''})
    }
    clearCanes = () => {
        this.setState({cane_id: ''})
    }
    
    render() {
        let displayFreezers = this.state.freezers.map((elem, i) => {
            return <button onClick={() => this.getFreezerCane(elem.freezer_id)} key={i}>
                <h3>{elem.freezer_name}</h3>
                <i class="fas fa-temperature-low"></i>
                <h4>{elem.temperature}</h4>
                <h4>{elem.freezer_type}</h4>
            </button>
        })
        let displayFreezerCanes = this.state.freezercanes.map((elem, i) => {
            return <button onClick={() => this.getFreezerBox(elem.cane_id)} key={i}>
                <h4>Cane {elem.cane}</h4>
                <i class="fas fa-layer-group cane"></i>
            </button>
        })
        let displayFreezerBoxes = this.state.freezerboxes.map((elem, i) => {
            return <button key={i}>
                <div >
                    <h4>Box: {elem.box_name}</h4>
                    <i class="fas fa-box"></i>
                </div>
            </button>
        })
        
        console.log('this state',this.state)
        return (
            <div className='display'>
                <div className='contents'>
                    <h1 className='CellInventory'>Cell Inventory</h1>

                    <h4 onClick={()=>this.clearFreezers()}>Freezers</h4>
                    <i class="fas fa-snowflake cold"></i>
                    <div className='displayContents'>{displayFreezers}</div>
                    
                    {this.state.freezer_id && <div>
                        <h4 onClick={()=>this.clearCanes()}>Freezer Canes</h4>
                        {displayFreezerCanes}</div>}

                    {this.state.cane_id && <div> <h4>Freezer Boxes</h4>
                        {displayFreezerBoxes}
                    </div>}


                </div>
            </div>
        )
    }
}
const mapDispatchToProps = {
    updateFreezers
}

export default connect(null, mapDispatchToProps)(FreezerNav)