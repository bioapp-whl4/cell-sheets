import React, {Component} from 'react'
import { slide as Menu } from 'react-burger-menu'
import {decorator as reduxBurgerMenu} from 'redux-burger-menu';
import {action as toggleMenu} from 'redux-burger-menu';
import { connect } from 'react-redux'
import store from '../../redux/store'

class BurgerMenu extends Component {

    toggleBurger = () => {
        console.log('firing')
        const isOpen = true
        store.dispatch(toggleMenu(isOpen));
    }

  render () {
      console.log(this.props)
    return (
        <div>
        <button onClick={this.toggleBurger}>Toggle Burger Menu</button>
        <Menu>
            <div>test</div>
            <div>test</div>
            <div>test</div>
        </Menu>
      </div>
    );
  }
}

// const mapStateToProps = (reduxState) => {
//     console.log(`reduxState`, reduxState)
//     const { isOpen } = reduxState
//     return { isOpen } 
// }

// const mapDispatchToProps = {
//     toggleMenu
// }

export default reduxBurgerMenu(BurgerMenu)
// export default connect(mapStateToProps, mapDispatchToProps)(BurgerMenu)
// export default connect(mapStateToProps, mapDispatchToProps)(reduxBurgerMenu(BurgerMenu))
