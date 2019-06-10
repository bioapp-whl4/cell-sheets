import React, { Component } from 'react'
import Header from '../Header/Header'
import {Link} from 'react-router-dom'
import DisplayInventory from '../DisplayInventory/DisplayInventory'
import {DragDropContextProvider} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import BurgerMenu from '../BurgerMenu/BurgerMenu'
import AdvanceSearch from '../AdvanceSearch/AdvanceSearch' 



class Dashboard extends Component {
    render() {
        return (
            <DragDropContextProvider backend={HTML5Backend}>
        <div className='app'>
            <img className='BG'alt='labratory'src='http://news.efinancialcareers.com/binaries/content/gallery/efinancial-careers/articles/2018/11/lab.jpg'/>
            <Header/>
            <div className='advanceSearch'><AdvanceSearch/></div>
            <div className='display'><DisplayInventory/></div>
           
            <Link to='/addspecimen'>Add</Link>
            <Link to='/api/hierarchy'>HIERARCHY TEST</Link>
            <Link to='/addlocation'>ADD STUFF</Link>
            <Link to='/api/test'>SINGLE VIEW</Link>
            <BurgerMenu/>
        </div>
            </DragDropContextProvider>
        )
    }
}

export default Dashboard
