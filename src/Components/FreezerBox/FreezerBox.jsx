import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {updateFreezerBox} from '../../redux/auth.reducer'

class FreezerBox extends Component {
    constructor() {
        super();
        this.state = {
            freezerBox: []
        }
    }
    async componentDidMount() {
        await this.getFreezerBox()
    }
    getFreezerBox = async () => {
        let res = await axios.get(`/freezerbox/${this.props.match.params.id}`)
        this.setState({freezerBox: res.data})
        this.props.updateFreezerBox(res.data)
    }
    render() {
        let displayFreezerBox = this.state.freezerBox.map((elem,i)=> {
            return <Link to={`/box/${elem.id}`}>
            <div key={i}>
            <h4>{elem.name}</h4>
            </div>
            </Link>
        })
        return(
            <div>   
            <h4>Freezer Box</h4>
            <div>{displayFreezerBox}</div>
            </div>
        )
    }
}
const mapDispatchToProps = {
    updateFreezerBox
}
export default connect(null,mapDispatchToProps)(FreezerBox)