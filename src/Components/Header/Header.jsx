
import React, { Component } from "react";
import { connect } from "react-redux";
import { updateFilterTerm } from "../../redux/auth.reducer";
import Picklist_Icon from '../Picklist_Icon'
import {
  updateAdvanceSearch,
  updateDisplayFreezer,
  updateKeywordSearch,
  updateDisplayCane,
  updateDisplayBoxes,
  updateDisplayBox,
  updateDisplayPicklist,
  adv_search_display
} from "../../redux/display.reducer";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      filterTerm: "",
      adv_search_icon: true
    };
  }

  toggle_adv = () => {
    this.props.adv_search_display(this.state.adv_search_icon)
    this.setState({
      adv_search_icon: !this.state.adv_search_icon
    })
  }

  navigate = () => {
    if (!this.props.keywordSearch) {
      this.props.updateDisplayFreezer(false);
      this.props.updateDisplayCane(false);
      this.props.updateDisplayBoxes(false);
      this.props.updateDisplayBox(false);
      this.props.updateAdvanceSearch(false);
      this.props.updateKeywordSearch(true);
    } else {
      this.props.updateAdvanceSearch(false);
      this.props.updateDisplayFreezer(true);
      this.props.updateDisplayCane(false);
      this.props.updateDisplayBoxes(false);
      this.props.updateDisplayBox(false);
      this.props.updateAdvanceSearch(false);
      this.props.updateKeywordSearch(false);
    }
  };
  advanceSearch = () => {
    this.toggle_adv()
    if (!this.props.advancedSearch) {
      this.props.updateDisplayFreezer(false);
      this.props.updateDisplayCane(false);
      this.props.updateDisplayBoxes(false);
      this.props.updateDisplayBox(false);
      this.props.updateAdvanceSearch(true);
      this.props.updateKeywordSearch(false);
    } else {
      this.props.updateAdvanceSearch(false);
      this.props.updateDisplayFreezer(true);
      this.props.updateDisplayCane(false);
      this.props.updateDisplayBoxes(false);
      this.props.updateDisplayBox(false);
      this.props.updateAdvanceSearch(false);
      this.props.updateKeywordSearch(false);
    }
  };
  pickList = () => {
    if (!this.props.displayPicklist) {
      this.props.updateDisplayPicklist(true)
      this.props.updateDisplayFreezer(false);
      this.props.updateDisplayCane(false);
      this.props.updateDisplayBoxes(false);
      this.props.updateDisplayBox(false);
      this.props.updateAdvanceSearch(false);
      this.props.updateKeywordSearch(false);
    } else {
      this.props.updateDisplayPicklist(false)
      this.props.updateAdvanceSearch(false);
      this.props.updateDisplayFreezer(true);
      this.props.updateDisplayCane(false);
      this.props.updateDisplayBoxes(false);
      this.props.updateDisplayBox(false);
      this.props.updateAdvanceSearch(false);
      this.props.updateKeywordSearch(false);
    }
  };
  handleInput = e => {
    this.setState({
      filterTerm: e.target.value
    });

    this.props.updateKeywordSearch(true);
    this.props.updateDisplayFreezer(false);
  };
  search = () => {
    this.props.updateFilterTerm(this.state.filterTerm);
    this.props.updateKeywordSearch(true);
    this.props.updateDisplayFreezer(false);
  };

  render() {
    const minus = <i class="fas fa-minus" onClick={this.advanceSearch}></i>
    const plus =  <i class="fas fa-plus" onClick={this.advanceSearch}></i>

    return (
      <header className="Header">
        <h2 className="AppName">CELL SHEETS</h2>
        <div className="nav-links">
          <div className="logout">
          <i class="fas fa-user"></i>
            <div>
              Log Out
            </div>
          </div>
          <div className='picklist-div'>
            <i  onClick={this.pickList} className="fas fa-clipboard-list picklist"></i>
            <Picklist_Icon/>
          </div>
          <div className="search">
            <i className="fas fa-search glass" onClick={this.search}></i>
            <input  onChange={this.handleInput} type="text" name="filterValue" placeholder="Search" />
            {this.state.adv_search_icon ? plus : minus}
          </div>
        </div>
      </header>
    );
  }
}
const mapStateToProps = reduxState => {
  const { advancedSearch,keywordSearch,displayPicklist, adv_search_display_state } = reduxState.display;
  const { user_id, samples, authenticated } = reduxState;
  return { adv_search_display_state, user_id, samples, advancedSearch,authenticated,keywordSearch,displayPicklist};
};

const mapDispatchToProps = {
  updateDisplayFreezer,
  updateDisplayCane,
  updateDisplayBoxes,
  updateDisplayBox,
  updateAdvanceSearch,
  updateKeywordSearch,
  updateFilterTerm,
  updateDisplayPicklist,
  adv_search_display
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
