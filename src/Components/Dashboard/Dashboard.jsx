import React, { Component } from 'react'
import Display from '../Display/Display'
import Header from '../Header/Header'
class Dashboard extends Component {
    render() {
        return (<div className='app'>
        <img className='BG'alt='labratory'src='http://news.efinancialcareers.com/binaries/content/gallery/efinancial-careers/articles/2018/11/lab.jpg'/>
            <Header/>
            <div><Display/></div>
        </div>)
    }
}
export default Dashboard