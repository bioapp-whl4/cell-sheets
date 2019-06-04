import React, { Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {updateFreezer} from '../../redux/auth.reducer'
import {connect} from 'react-redux'

class DisplayFreezers extends Component {
    constructor() {
        super();
        this.state = {
            freezer: []
        }
    }
    async componentDidMount() {
        await this.getFreezer()
    }
    getFreezer = async () => {
       let res = await axios.get('/freezer')
       this.setState({freezer: res.data})
       this.props.updateFreezer(res.data)
    }
    render() {
        let displayFreezer = this.state.freezer.map((elem,i)=>{
            return <Link to={`/freezercane/${elem.id}`}><div key={i}>
            <h3>{elem.freezer_name}</h3>
            <i class="fas fa-temperature-low"></i>
            <h4>{elem.freezer_location}</h4>
            <h4>{elem.freezer_type}</h4>
            </div></Link>
        })
        return (
            <div className='display'>
            <div className='contents'>
            <h1 className='CellInventory'>Cell Inventory</h1>
                <h3 className='category'>Freezers</h3>
                <i class="fas fa-snowflake cold"></i>
                <div className='displayContents'>{displayFreezer}</div>
            </div>
                
            </div>
        )
    }
}
const mapDispatchToProps = {
    updateFreezer
}

export default connect(null,mapDispatchToProps)(DisplayFreezers)