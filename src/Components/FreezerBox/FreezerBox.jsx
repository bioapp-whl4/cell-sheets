import React, {Component} from 'react'
import axios from 'axios'

import {connect} from 'react-redux'
import {updateBoxId,updateDisplayBoxes,updateDisplayBox} from '../../redux/display.reducer'

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
    updateDisplay = (id) => {
        this.props.updateBoxId(id)
        this.props.updateDisplayBoxes(false)
        this.props.updateDisplayBox(true)
    } 
    render() {
        let displayFreezerBoxes = this.state.freezerBoxes.map((elem,i)=> {
            return <div onClick={ ()=> this.updateDisplay(elem.box_id)} key={i}>
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
    updateBoxId,
    updateDisplayBoxes,
    updateDisplayBox
}
function mapStateToProps (state) {
    return { cane_id: state.display.cane_id
}
}
export default connect(mapStateToProps,mapDispatchToProps)(FreezerBox)