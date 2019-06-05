import React, {Component} from 'react'
import { slide as Menu } from 'react-burger-menu'
import {decorator as reduxBurgerMenu} from 'redux-burger-menu';
import {action as toggleMenu} from 'redux-burger-menu';
import store from '../../redux/store'
import {connect} from 'react-redux'
import axios from 'axios'
import { updateEverything } from '../../redux/auth.reducer'


class BurgerMenu extends Component {
    state = {
        freezers: [],
        canes: [],
        boxes: [],
        grids: []
    }

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
            console.log(`111111`, freezers, typeof freezers)
            this.props.updateEverything(freezers)
    }

    toggleBurger = () => {
        console.log('firing')
        store.dispatch(toggleMenu(!this.props.isOpen));
    }

  render () {
      console.log(`render`, this.props)
    return (
        <div className='burger-menu'>
        <button onClick={this.toggleBurger}>Toggle Burger Menu</button>
        <Menu isOpen={this.props.isOpen}>
            <div>test</div>
            <div>test</div>
            <div>test</div>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
    const { freezers, freezercanes, freezerboxes, boxes } = reduxState.reducer
    return { freezers, freezercanes, freezerboxes, boxes } 
}

const mapDispatchToProps = {
    updateEverything
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxBurgerMenu(BurgerMenu))

