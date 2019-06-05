import React, {Component} from 'react'
import { slide as Menu } from 'react-burger-menu'
import {decorator as reduxBurgerMenu} from 'redux-burger-menu';
import {action as toggleMenu} from 'redux-burger-menu';
import store from '../../redux/store'
import {connect} from 'react-redux'
import axios from 'axios'

class BurgerMenu extends Component {
    state = {
        freezers: [],
        canes: [],
        boxes: [],
        grids: []
    }

    componentWillUpdate(){
    }
    
    getFreezers = async () => {
        let res = await axios.get('/api/freezers')
        this.setState({ freezers: res.data })
        this.props.updateFreezers(res.data)
    }
    getFreezerCane = async (freezer_id) => {
        let res = await axios.get(`/api/freezer/canes?id=${freezer_id}`)
        this.setState({ freezer_id: freezer_id, cane_id: '', freezercanes: res.data })
    }
    getFreezerBox = async (cane_id) => {
        let res = await axios.get(`/api/cane/boxes?id=${cane_id}`)
        this.setState({ freezerboxes: res.data, cane_id: cane_id })
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

export default connect(mapStateToProps, null)(reduxBurgerMenu(BurgerMenu))

