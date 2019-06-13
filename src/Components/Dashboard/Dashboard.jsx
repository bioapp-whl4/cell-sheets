import React, { Component } from 'react'
import { connect } from "react-redux";
import Header from '../Header/Header'
import DisplayInventory from '../DisplayInventory/DisplayInventory'
import {DragDropContextProvider} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import axios from 'axios'
import swal from 'sweetalert2'
import BurgerMenu from '../BurgerMenu/BurgerMenu'
import AdvanceSearch from '../AdvanceSearch/AdvanceSearch' 

class Dashboard extends Component {
    constructor(){
        super()
        this.state = {
            alertFired: false,
        }

        this.checkTemp = this.checkTemp.bind(this)
    }

    componentDidMount(){
        this.checkTemp()
    }

    checkTemp(){
        setInterval(async() => {
            let response = await axios.get('http://192.168.2.142:3333')
            let temp = response.data.temperature
            let freezer_id = 1
            if(temp > 16 && !this.state.alertFired){
                axios.post('/api/warning',{freezer_id})
                swal.fire('Freezer temperature too high!', 'Please relocate samples or adjust freezer temperature.', 'warning')
                this.setState({
                    alertFired: true
                })
            }
            if(temp <= 16 && this.state.alertFired){
                this.setState({
                    alertFired: false
                })
            }
        }, 10000)
    }

    render() {
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
