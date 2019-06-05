import React, {Component} from 'react'
import { slide as Menu } from 'react-burger-menu'
import {decorator as reduxBurgerMenu} from 'redux-burger-menu';
import {action as toggleMenu} from 'redux-burger-menu';
import store from '../../redux/store'

class BurgerMenu extends Component {

    toggleBurger = () => {
        console.log('firing')
        store.dispatch(toggleMenu(!this.props.isOpen));
    }

  render () {
      console.log(this.props)
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

export default reduxBurgerMenu(BurgerMenu)

