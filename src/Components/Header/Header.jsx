import React, {Component} from 'react'
// import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import  {updateAdvanceSearch} from '../../redux/display.reducer'



class Header extends Component {
    
    navigate = () => {
        if(!this.props.advancedSearch) {
            this.props.updateAdvanceSearch(true)
        } else {this.props.updateAdvanceSearch(false)}
    }

    render() {
        return(
            <header className='Header'>
                <h3 className='AppName'>CELL SHEETS</h3>
                <div className='nav-links'>
                    <h4 className='logout'>LOG OUT</h4>
                    <i className="fas fa-search search"></i>
                    <div className='advance' onClick={this.navigate}>Advanced Search</div>
                </div>
            </header>
        )
    }
}

const mapDispatchToProps = {updateAdvanceSearch}

function mapStateToProps(state) {
    return {
        advancedSearch: state.display.advancedSearch
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header)