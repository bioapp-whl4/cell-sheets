import React, {Component} from 'react'
import axios from 'axios'

import {connect} from 'react-redux'
import {updateBoxId} from '../../redux/display.reducer'

class FreezerBox extends Component {
    constructor() {
        super();
        this.state = {
            freezerBoxes: []
        }
    }
    async componentDidMount() {
       if(this.props.cane_id) {
        this.getFreezerBoxes()
    }
}
    getFreezerBoxes = async () => {
        let res = await axios.get(`/api/cane/boxes?id=${this.props.cane_id}`)
        this.setState({freezerBoxes: res.data})
       
    }
    render() {
        let displayFreezerBoxes = this.state.freezerBoxes.map((elem,i)=> {
            return <div onClick={ ()=> this.props.updateBoxId(elem.box_id)} key={i}>
            <h4>Box: {elem.box_name}</h4>
            <i class="fas fa-box"></i>
            </div>
           
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
    updateBoxId
}
function mapStateToProps (state) {
    return { cane_id: state.display.cane_id
}
}
export default connect(mapStateToProps,mapDispatchToProps)(FreezerBox)