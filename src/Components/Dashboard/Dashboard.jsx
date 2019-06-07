import React, { Component } from 'react'
import Header from '../Header/Header'
import {Link} from 'react-router-dom'
import DisplayInventory from '../DisplayInventory/DisplayInventory'

import BurgerMenu from '../BurgerMenu/BurgerMenu'

class Dashboard extends Component {
    render() {
        return (<div className='app'>
        <img className='BG'alt='labratory'src='http://news.efinancialcareers.com/binaries/content/gallery/efinancial-careers/articles/2018/11/lab.jpg'/>
            <Header/>
            <div className='display'><DisplayInventory/></div>
            
            <Link to='/api/hierarchy'>HIERARCHY TEST</Link>
            <Link to='/addlocation'>ADD STUFF</Link>
            <Link to='/api/test'>SINGLE VIEW</Link>
            <BurgerMenu/>
        </div>)
    }
}
export default Dashboard;
