import React, { Component} from 'react'
import axios from 'axios'
import {updateFreezerId,updateDisplayFreezer,updateDisplayCane} from '../../redux/display.reducer'
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
   
    }
    updateDisplay = (id) => {
        this.props.updateFreezerId(id)
        this.props.updateDisplayFreezer(false)
        this.props.updateDisplayCane(true)
    } 
    render() {
        
        let displayFreezers = this.state.freezers.map((elem,i)=>{
<<<<<<< HEAD
            return <Link to={`/api/freezer/canes/${elem.freezer_id}`} key={i}>
            <div>
                <h3>{elem.freezer_name}</h3>
                <i className="fas fa-temperature-low"></i>
                <h4>{elem.temperature}</h4>
                <h4>{elem.freezer_type}</h4>
            </div>
            </Link>
||||||| merged common ancestors
            return <Link to={`/api/freezer/canes/${elem.freezer_id}`}><div key={i}>
            <h3>{elem.freezer_name}</h3>
            <i class="fas fa-temperature-low"></i>
            <h4>{elem.temperature}</h4>
            <h4>{elem.freezer_type}</h4>
            </div></Link>
=======
            return <div onClick={()=>this.updateDisplay(elem.freezer_id)}key={i}>
            <h3>{elem.freezer_name}</h3>
            <i class="fas fa-temperature-low"></i>
            <h4>{elem.temperature}</h4>
            <h4>{elem.freezer_type}</h4>
            </div>
>>>>>>> master
        })
        return (
            <div className='app'>
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
    updateFreezerId,
    updateDisplayFreezer,
    updateDisplayCane
}

export default connect(null,mapDispatchToProps)(DisplayFreezers)