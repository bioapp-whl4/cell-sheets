import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateCaneId,updateDisplayCane,updateDisplayBoxes} from '../../../../redux/display.reducer'

class FreezerCane extends Component {
    constructor() {
        super();
        this.state = {
            freezerCanes: []
        }
    }
   async componentDidMount() {
    if(this.props.freezer_id !== null) 
    { this.getFreezerCanes()}
    }
    getFreezerCanes = async () => {
     let res = await axios.get(`/api/freezer/canes?id=${this.props.freezer_id}`)
     this.setState({freezerCanes:res.data})
   
    }
    updateDisplay = (id) => {
        this.props.updateCaneId(id)
        this.props.updateDisplayCane(false)
        this.props.updateDisplayBoxes(true)
    } 
    render() {
        let displayFreezerCanes = this.state.freezerCanes.map((elem,i)=>{
            return <div onClick={()=> this.updateDisplay(elem.cane_id)} key={i}>
                <h4>Cane {elem.cane}</h4>
                <i class="fas fa-layer-group cane"></i>
                </div>
        })
        
        return(
            <div>
                
                <h4>Freezer Canes</h4>
                {displayFreezerCanes}
            </div>
        )
    }
}

const mapDispatchToProps = {
    updateCaneId,
    updateDisplayCane,
    updateDisplayBoxes
}
function mapStateToProps (state) {
   return { freezer_id: state.display.freezer_id
}
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FreezerCane);
