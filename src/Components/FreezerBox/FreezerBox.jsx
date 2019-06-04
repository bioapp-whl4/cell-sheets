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
        let res = await axios.get(`/api/freezerbox/${this.props.match.params.id}`)
        this.setState({freezerBox: res.data})
        this.props.updateFreezerBox(res.data)
    }
    render() {
        let displayFreezerBoxes = this.state.freezerBox.map((elem,i)=> {
            return <Link to={`/api/box/${elem.id}`}>
            <div key={i}>
            <h4>{elem.name}</h4>
            </div>
            </Link>
        })
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