import React, {Component} from 'react'
import { slide as Menu } from 'react-burger-menu'
import {decorator as reduxBurgerMenu} from 'redux-burger-menu';
import {action as toggleMenu} from 'redux-burger-menu';
import store from '../../redux/store'
import {connect} from 'react-redux'
import axios from 'axios'
import {updateFreezerId,updateCaneId,updateBoxId,updateDisplayFreezer,
    updateDisplayCane,updateDisplayBoxes, updateDisplayBox} from '../../redux/display.reducer'
import { updateEverything } from '../../redux/auth.reducer'


class BurgerMenu extends Component {
    componentWillMount(){
        this.getData()
    }
    getData = async () => {
        let freezers = []
        let res1 = await axios.get('/api/freezers')
        res1.data.map( async (freezer) => {
            let res2 = await axios.get(`/api/freezer/canes?id=${freezer.freezer_id}`)
            freezer.canes = res2.data  // add the canes array to the freezer object
            freezer.canes.forEach( async (cane) => { // get the boxes for each cane
                let res3 = await axios.get(`/api/cane/boxes?id=${cane.cane_id}`)
                cane.boxes = res3.data // add the boxes to the cane object
                cane.boxes.forEach( async (box) => {
                    let res4 = await axios.get(`/api/samples`)
                    box.samples = res4.data
                })
            })
                freezers.push(freezer) //add each freezer to the freezer array
        })
        this.props.updateEverything(freezers) // send data to redux
    }

    toggleBurger = () => {
        store.dispatch(toggleMenu(!this.props.isOpen));
    }
    handleFreezer = (id) => {
        this.props.updateDisplayFreezer(false)
        this.props.updateDisplayCane(true)
        this.props.updateDisplayBoxes(false)
        this.props.updateDisplayBox(false)
        this.props.updateFreezerId(id)
        this.props.updateCaneId(null)
        this.props.updateBoxId(null)
    }
    handleCane = (freeze_id,cane_id) => {
        this.props.updateDisplayFreezer(false)
        this.props.updateDisplayCane(false)
        this.props.updateDisplayBoxes(true)
        this.props.updateDisplayBox(false)
        this.props.updateFreezerId(freeze_id)
        this.props.updateCaneId(cane_id)
        this.props.updateBoxId(null)
    }
    handleBox = (freeze_id,cane_id,box_id) => {
        this.props.updateDisplayFreezer(false)
        this.props.updateDisplayCane(false)
        this.props.updateDisplayBoxes(false)
        this.props.updateDisplayBox(true)
        this.props.updateFreezerId(freeze_id)
        this.props.updateCaneId(cane_id)
        this.props.updateBoxId(box_id)
    }
  render () {
    
    let freezers = (
        <ul>
            {this.props.everything.map(freezer => {
                return (
                    <li>
                        <h5 onClick={()=>this.handleFreezer(freezer.freezer_id)}>{freezer.freezer_name} : {freezer.freezer_type}</h5>
                        <ul>
                            {freezer.canes.map(cane => {
                                return (
                                    <li >
                                        <h6 onClick={()=>this.handleCane(freezer.freezer_id,cane.cane_id)}> Cane: {cane.cane}</h6>
                                        <ul>
                                            {cane.boxes.map(box => {
                                                return (
                                                    <li>
                                                       <h6 onClick={()=>this.handleBox(freezer.freezer_id,cane.cane_id,box.box_id)}>Box:{box.box_name}</h6> 
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </li>
                                )
                            })}
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
    

    return (
        <div className='burger-menu'>
            <button onClick={this.toggleBurger}>Toggle Burger Menu</button>
            <Menu isOpen={this.props.isOpen}>
                {freezers}
            </Menu>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
    const { everything } = reduxState.reducer
    return { everything } 
}
const mapDispatchToProps = {
    updateEverything,
     //update ids
     updateFreezerId,
     updateCaneId,
     updateBoxId,
     // updateDisplays
     updateDisplayFreezer,
     updateDisplayCane,
     updateDisplayBoxes,
     updateDisplayBox
}
export default connect(mapStateToProps, mapDispatchToProps)(reduxBurgerMenu(BurgerMenu))

