import React, {Component} from 'react'
// import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import  {updateAdvanceSearch,updateDisplayFreezer,updateDisplayCane,updateDisplayBoxes, updateDisplayBox} from '../../redux/display.reducer'



class Header extends Component {
    
    navigate = () => {
        if(!this.props.advancedSearch) {
            this.props.updateDisplayFreezer(false)
            this.props.updateDisplayCane(false)
            this.props.updateDisplayBoxes(false)
            this.props.updateDisplayBox(false)
            this.props.updateAdvanceSearch(true)
        } else {this.props.updateAdvanceSearch(false)
            this.props.updateDisplayFreezer(true)
            this.props.updateDisplayCane(false)
            this.props.updateDisplayBoxes(false)
            this.props.updateDisplayBox(false)
            this.props.updateAdvanceSearch(false)
                }
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
const mapStateToProps = reduxState => {
  const {advancedSearch} = reduxState.display;
  const { user_id, samples, authenticated } = reduxState;
  return { user_id, samples, authenticated };
};

const mapDispatchToProps = {
    updateAdvanceSearch,
    updateDisplayFreezer,
    updateDisplayCane,
    updateDisplayBoxes, 
    updateDisplayBox}


export default connect(mapStateToProps,mapDispatchToProps)(Header)
