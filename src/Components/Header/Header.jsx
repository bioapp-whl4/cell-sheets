import React, {Component} from 'react'

class Header extends Component {
    render() {
        return(
            <div className='Header'>
            <div className='BlueBar'></div>
            <h3 className='AppName'>CELL SHEETS</h3>
            <h4 className='logout'>LOG OUT</h4>
            </div>
        )
    }
}
export default Header