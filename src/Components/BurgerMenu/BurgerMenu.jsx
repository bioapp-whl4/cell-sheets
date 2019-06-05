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
        this.getData()
    }
    getData = async () => {
        //get freezers and put onto state
        let res1 = await axios.get('/api/freezers')
        // get canes for each freezer
        let freezers = []
         res1.data.map( async (freezer) => {
            let res2 = await axios.get(`/api/freezer/canes?id=${freezer.freezer_id}`)
            // add the canes array to the freezer object
            freezer.canes = res2.data
            // get the boxes for each cane
            freezer.canes.forEach( async (cane) => {
                let res3 = await axios.get(`/api/cane/boxes?id=${cane.cane_id}`)
                // console.log(`res3` , res3 )
                cane.boxes = res3.data
            })
             freezers.push(freezer)
            })
            this.props.updateEverything(freezers)
    }
    toggleBurger = () => {
        store.dispatch(toggleMenu(!this.props.isOpen));
    }

  render () {

    let freezers = (
        <ul>
            {this.props.everything.map(freezer => {
                return (
                    <li>
                        {freezer.freezer_name}
                        <ul>
                            {freezer.canes.map(cane => {
                                return (
                                    <li>
                                        {cane.cane}
                                        <ul>
                                            {cane.boxes.map(box => {
                                                return (
                                                    <li>
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

