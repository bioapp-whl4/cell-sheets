import React, { Component } from 'react'
import { connect } from "react-redux";
import Header from '../Header/Header'
import DisplayInventory from '../DisplayInventory/DisplayInventory'
import {DragDropContextProvider} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import BurgerMenu from '../BurgerMenu/BurgerMenu'
import AdvanceSearch from '../AdvanceSearch/AdvanceSearch' 

class Dashboard extends Component {
    render() {
        console.log(this.props.adv_search_display_state)
        return (
            <DragDropContextProvider backend={HTML5Backend}>
        <div className='app'>
            <img className='BG'alt='labratory'src='http://news.efinancialcareers.com/binaries/content/gallery/efinancial-careers/articles/2018/11/lab.jpg'/>
            <Header/>
            {this.props.adv_search_display_state ? <div className='advanceSearch'><AdvanceSearch/></div> : null}
            <div className='display'><DisplayInventory/></div>
           
            <BurgerMenu/>
        </div>
            </DragDropContextProvider>
        )
    }
}

const mapStateToProps = reduxState => {
    const { adv_search_display_state } = reduxState.display;
    return { adv_search_display_state};
  };

export default connect(mapStateToProps, null)(Dashboard);
