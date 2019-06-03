import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

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
    getFreezerBox = () => {
        axios.get(`/freezerbox/${this.props.match.params.id}`).then(res=> this.setState({freezerBox: res.data}))
        .catch(err=>console.log('error on getting freezer box',err))
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
export default FreezerBox