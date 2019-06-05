import React, { Component } from 'react'
import DisplayFreezers from '../DisplayFreezers/DisplayFreezers'
import Header from '../Header/Header'
import {Link} from 'react-router-dom'
import BurgerMenu from '../BurgerMenu/BurgerMenu'

class Dashboard extends Component {
    render() {
        return (<div className='app'>
        <img className='BG'alt='labratory'src='http://news.efinancialcareers.com/binaries/content/gallery/efinancial-careers/articles/2018/11/lab.jpg'/>
            <Header/>
            <div><DisplayFreezers/></div>
            <Link to='/addlocation'>ADD STUFF</Link>
            <Link to='/api/test'>SINGLE VIEW</Link>
            <BurgerMenu/>
        </div>)
    }
}
export default Dashboard