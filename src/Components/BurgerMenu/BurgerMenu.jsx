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
    componentDidMount(){
        this.getInventory()
    }

    getInventory = async () => {
        let freezers = []
        try{
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
        } catch(err){
            alert(`Something is wrong (BurgerMenu.jsx - getInventory)`, err)
        }
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
   let freezerdisplay
    if(this.props.everything) {
    freezerdisplay = (
        <div>
            <div className='collapse' onClick={this.toggleBurger}><i class="fas fa-caret-left"></i></div>
            <ul className='bm-freezers'>
                {this.props.everything.map((freezer, i) => {
                    return (
                        <li key={i}>
                            <div onClick={()=>this.handleFreezer(freezer.freezer_id)}>{freezer.freezer_name} : {freezer.freezer_type}</div>
                            <ul className='bm-canes'>
                                {freezer.canes.map((cane, i) => {
                                    return (
                                        <li key={i}>
                                            <div onClick={()=>this.handleCane(freezer.freezer_id,cane.cane_id)}> Cane: {cane.cane}</div>
                                            <ul className='bm-boxes'>
                                                {cane.boxes.map((box, i) => {
                                                    return (
                                                        <li key={i}>
                                                        <div onClick={()=>this.handleBox(freezer.freezer_id,cane.cane_id,box.box_id)}>Box:{box.box_name}</div> 
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
        </div>
    )}

    const bmToggle = this.props.isOpen ? `hide` : `bm-toggle`

    return (
        <div className='burger-menu'>
            <div className={bmToggle} onClick={this.toggleBurger}><i class="fas fa-caret-right"></i></div>
            <Menu isOpen={this.props.isOpen}>
                {freezerdisplay}
            </Menu>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
    const { everything } = reduxState.reducer
    const {isOpen } = reduxState.burgerMenu
    return { everything, isOpen } 
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

