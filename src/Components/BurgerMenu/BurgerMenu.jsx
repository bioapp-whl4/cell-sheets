import React, {Component} from 'react'
import { slide as Menu } from 'react-burger-menu'
import {decorator as reduxBurgerMenu} from 'redux-burger-menu';
import {action as toggleMenu} from 'redux-burger-menu';
import store from '../../redux/store'
import {connect} from 'react-redux'
import axios from 'axios'
import { updateEverything } from '../../redux/auth.reducer'


class BurgerMenu extends Component {
    componentWillMount(){
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
            alert(`Something is wrong`)
        }
    }

    toggleBurger = () => {
        store.dispatch(toggleMenu(!this.props.isOpen));
    }

  render () {

    let freezers = (
        <ul>
            {this.props.everything.map((freezer, i) => {
                return (
                    <li key={i}>
                        {freezer.freezer_name}
                        <ul>
                            {freezer.canes.map((cane, i) => {
                                return (
                                    <li key={i}>
                                        {cane.cane}
                                        <ul>
                                            {cane.boxes.map((box, i) => {
                                                return (
                                                    <li key={i}>
                                                        {box.box_name}
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
    updateEverything
}
export default connect(mapStateToProps, mapDispatchToProps)(reduxBurgerMenu(BurgerMenu))

