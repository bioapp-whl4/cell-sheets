import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {updateFreezerBoxes} from '../../redux/auth.reducer'

class FreezerBox extends Component {
    constructor() {
        super();
        this.state = {
            freezerBoxes: []
        }
    }
    async componentDidMount() {
        await this.getFreezerBoxes()
    }
    getFreezerBoxes = async () => {
        let res = await axios.get(`/api/cane/boxes?id=${this.props.match.params.id}`)
        this.setState({freezerBoxes: res.data})
        this.props.updateFreezerBoxes(res.data)
    }
    render() {
        let displayFreezerBoxes = this.state.freezerBoxes.map((elem,i)=> {
            return <Link to={`/api/box/${elem.box_id}`}>
            <div key={i}>
            <h4>Box: {elem.box_name}</h4>
            <i class="fas fa-box"></i>
            </div>
            </Link>
        })
      
        console.log(this.state.freezerBoxes)
        return(
            <div>   
            <h4>Freezer Boxes</h4>
            
            <div>{displayFreezerBoxes}</div>
            </div>
        )
    }
}
const mapDispatchToProps = {
    updateFreezerBoxes
}
export default connect(null,mapDispatchToProps)(FreezerBox)