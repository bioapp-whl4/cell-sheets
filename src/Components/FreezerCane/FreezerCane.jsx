import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {updateFreezerCanes} from '../../redux/auth.reducer'

class FreezerCane extends Component {
    constructor() {
        super();
        this.state = {
            freezerCanes: []
        }
    }
   async componentDidMount() {
    await this.getFreezerCanes()
    }
    getFreezerCanes = async () => {
     let res = await axios.get(`/api/freezer/canes?id=${this.props.match.params.id}`)
     this.setState({freezerCanes:res.data})
     this.props.updateFreezerCanes(res.data)
    }
    render() {
        let displayFreezerCanes = this.state.freezerCanes.map((elem,i)=>{
            return <Link to={`/api/cane/boxes/${elem.cane_id}`}><div key={i}>
                <h4>Cane {elem.cane}</h4>
                <i class="fas fa-layer-group cane"></i>
                </div></Link>
        })
        let freezerInfo = this.props.freezers.filter(elem=>{
            return elem.freezer_id === this.props.match.params.id
        })
        console.log('freezer info',this.props.freezers)
        console.log(freezerInfo)
        return(
            <div>
                
                <h4>Freezer Canes</h4>
                {displayFreezerCanes}
            </div>
        )
    }
}

const mapDispatchToProps = {
    updateFreezerCanes
}
function mapStateToProps (state) {
   return { freezers: state.freezers
}
}
export default connect(mapStateToProps,mapDispatchToProps)(FreezerCane)