import React, {Component} from 'react'

class Header extends Component {
    render() {
        return(
            <div className='Header'>
            <div className='BlueBar'></div>
            <h4 className='logout'>LOG OUT</h4>
            <i className="fas fa-search search"></i>
            <h3 className='AppName'>CELL SHEETS</h3>
            
            </div>
        )
    }
}
export default Header