import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateFreezers,updateFreezerCanes,updateFreezerBoxes,updateBoxes} from '../../redux/auth.reducer'

class AddLocation extends Component {
    constructor() {
        super();
        this.state = {
            freezer: '',
            freezercane: '',
            feezerbox:'',
            box:'',
        }
    }
    componentDidMount() {
        this.updatingRedux()
    }
    updatingRedux = () => {
        axios.get('/api/freezers').then(res=>this.props.updateFreezers(res.data))
        .catch(err=>console.log('error updating freezers on redux',err))
        axios.get('/api/freezercanes').then(res=> this.props.updateFreezerCanes(res.data))
        .catch(err=>console.log('error updating freezercanes on redux',err))
        axios.get('/api/freezerboxes').then(res=> this.props.updateFreezerBoxes(res.data))
        .catch(err=>console.log('error updating freezerboxes on redux',err))
        axios.get('/api/boxes').then(res=>this.props.updateBoxes(res.data))
        .catch(err=>console.log('error updating boxes on redux',err))
    }
    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
        
    }
    render() {
        console.log(this.state)
        let freezers = this.props.freezers.map((elem,i)=> {
            return <option value={elem.freezer_name} key={i}>{`${elem.freezer_name}: ${elem.freezer_type}`}</option>
        })
        
        let freezerCanes = this.props.freezercanes.map((elem,i)=> {
            return <option value={elem.name} key={i}>{elem.name}</option>
        })
        return(
            <div>
                <h3>Location</h3>
               <h4>freezers</h4>
                <select name='freezer' onChange={this.handleChange}><option value=''>Choose a Freezer</option>{freezers}</select>
                <h4>freezerCane</h4>
                <select name='freezerCane' onChange={this.handleChange}><option value=''>Choose a Freezercane</option>{this.props.freezerCanes && freezerCanes}</select>
            </div>
        )
    }

}
const mapDispatchToProps = {
    updateBoxes,
    updateFreezerCanes,
    updateFreezerBoxes,
    updateFreezers
}
function mapStateToProps(state) {
    return {
        freezers: state.freezers,
        freezercanes: state.freezercanes,
        freezerboxes: state.freezerboxes,
        boxes: state.boxes
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddLocation)