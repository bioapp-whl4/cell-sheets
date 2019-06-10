import React, { Component } from 'react'
import axios from 'axios'
import { updateFreezerId, updateDisplayFreezer, updateDisplayCane } from '../../../../redux/display.reducer'
import { connect } from 'react-redux'

class DisplayFreezers extends Component {
    constructor() {
        super();
        this.state = {
            freezers: []

        }
    }
    async componentDidMount() {
        await this.getFreezers()
    }


    getFreezers = async () => {
        let res = await axios.get('/api/freezers')
        this.setState({ freezers: res.data })

    }
    updateDisplay = (id) => {
        this.props.updateFreezerId(id)
        this.props.updateDisplayFreezer(false)
        this.props.updateDisplayCane(true)
    }
    render() {

        let displayFreezers = this.state.freezers.map((elem, i) => {
            return <div  className='freezersList'onClick={() => this.updateDisplay(elem.freezer_id)} key={i}>
                <h3>Freezer: {elem.freezer_name}</h3>
                <h4>Temperature: {elem.temperature}</h4>
                <h4>Type: {elem.freezer_type}</h4>
                <i className="fas fa-temperature-low icon"></i>
            </div>
        })
        return (
            <div className='app'>
                <div className='contents'>
                    <h1 className='CellInventory'>Cell Inventory</h1>
                    <div className='categoryContents'>
                        <h3 className='category'>Freezers</h3>
                        <i className="fas fa-snowflake cold"></i>
                    </div>
                    <div className='displayContents'>{displayFreezers}</div>
                </div>

            </div>
        )
    }
}
const mapDispatchToProps = {
    updateFreezerId,
    updateDisplayFreezer,
    updateDisplayCane
}


export default connect(null, mapDispatchToProps)(DisplayFreezers)