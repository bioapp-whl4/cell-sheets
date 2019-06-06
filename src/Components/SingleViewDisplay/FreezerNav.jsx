import React, { Component } from 'react'
import axios from 'axios'
import { updateFreezers } from '../../redux/auth.reducer'
import { connect } from 'react-redux'
import GridContextProvider from '../GridContextProvider'

class FreezerNav extends Component {
    constructor() {
        super();
        this.state = {
            freezers: [],
            freezercanes: [],
            freezerboxes: [],
            //tier display

            freezer_id: null,
            cane_id: null,
            box_id: null

        }
    }
    async componentDidMount() {
        await this.getFreezers()
    }
    getFreezers = async () => {
        let res = await axios.get('/api/freezers')
        this.setState({ freezers: res.data})
        this.props.updateFreezers(res.data)
    }
    getFreezerCane = async (freezer_id) => {
        let res = await axios.get(`/api/freezer/canes?id=${freezer_id}`)
        this.setState({ freezer_id: freezer_id,box_id: null, cane_id: null, freezercanes: res.data })

    }
    getFreezerBox = async (cane_id) => {
        let res = await axios.get(`/api/cane/boxes?id=${cane_id}`)
        this.setState({ freezerboxes: res.data, cane_id: cane_id })

    }
    clearFreezers = () => {
        this.setState({ freezer_id: null,cane_id: null,box_id:null})
    }
    clearCanes = () => {
        this.setState({cane_id: null,box_id:null})
    }
    clearBoxes = () => {
        this.setState({box_id: null})
    }
    render() {
        let displayFreezers = this.state.freezers.map((elem, i) => {
            return <div className='displayFreezers'onClick={() => this.getFreezerCane(elem.freezer_id)} key={i}>
                <h5>{elem.freezer_name}</h5>
                <i className="fas fa-temperature-low"></i>
                <h6>{elem.temperature}</h6>
                <h6>{elem.freezer_type}</h6>
            </div>
        })
        let displayFreezerCanes = this.state.freezercanes.map((elem, i) => {
            return <button onClick={() => this.getFreezerBox(elem.cane_id)} key={i}>
                <h4>Cane {elem.cane}</h4>
                <i className="fas fa-layer-group cane"></i>
            </button>
        })
        let displayFreezerBoxes = this.state.freezerboxes.map((elem, i) => {
            return <button onClick={()=> this.setState({box_id:elem.box_id})}key={i}>
                <div >
                    <h4>Box: {elem.box_name}</h4>
                    <i className="fas fa-box"></i>
                </div>
            </button>
        })
        
        console.log('this state',this.state)
        return (
            <div className='display'>
                <div className='contents'>
                    <h3 className='CellInventory'>Cell Inventory</h3>

                    <h4 onClick={()=>this.clearFreezers()}>Freezers</h4>
                    <i className="fas fa-snowflake cold"></i>
                    <div className='displayContents'>{displayFreezers}</div>
                    
                    {this.state.freezer_id !== null && <div>
                        <h4 onClick={()=>this.clearCanes()}>Freezer Canes</h4>
                        {displayFreezerCanes}</div>}

                    {this.state.cane_id !== null && <div> <h4 onClick={()=>this.clearBoxes()}>Freezer Boxes</h4>
                        {displayFreezerBoxes}
                    </div>}
                    {this.state.box_id !== null && <div><h4>Box</h4><GridContextProvider box_id={this.state.box_id}/></div>}


                </div>
            </div>
        )
    }
}
const mapDispatchToProps = {
    updateFreezers
}

export default connect(null, mapDispatchToProps)(FreezerNav)