import React, { Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {updateFreezers} from '../../redux/auth.reducer'
import {connect} from 'react-redux'

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
       this.setState({freezers: res.data})
       this.props.updateFreezers(res.data)
    }
    render() {
        let displayFreezers = this.state.freezers.map((elem,i)=>{
            return <Link to={`/api/freezer/canes/${elem.freezer_id}`} key={i}>
            <div>
                <h3>{elem.freezer_name}</h3>
                <i className="fas fa-temperature-low"></i>
                <h4>{elem.temperature}</h4>
                <h4>{elem.freezer_type}</h4>
            </div>
            </Link>
        })
        return (
            <div className='display'>
            <div className='contents'>
            <h1 className='CellInventory'>Cell Inventory</h1>
                <h3 className='category'>Freezers</h3>
                <i className="fas fa-snowflake cold"></i>
                <div className='displayContents'>{displayFreezers}</div>
            </div>
                
            </div>
        )
    }
}
const mapDispatchToProps = {
    updateFreezers
}

export default connect(null,mapDispatchToProps)(DisplayFreezers)