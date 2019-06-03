import React, {Component} from 'react'
import axios from 'axios'

class Freezer extends Component {
    constructor() {
        super();
        this.state = {
            freezerCane: []
        }
    }
   async componentDidMount() {
    await this.getFreezerCane()
    }
    getFreezerCane = () => {
     axios.get(`/freezer/${this.props.match.params.id}`).then(res=>this.setState({freezerCane:res.data}))
    }
    render() {
        let displayFreezerCane = this.state.freezerCane.map((elem,i)=>{
            return <Link to={`/freezercane/${this.props.match.params.id}`}><div>
                <h4>Cane {elem.id}</h4>
                <i class="fas fa-layer-group cane"></i>
                </div></Link>
        })
        return(
            <div>
                <h4>Freezer Cane</h4>
                {displayFreezerCane}
            </div>
        )
    }
}
export default Freezer