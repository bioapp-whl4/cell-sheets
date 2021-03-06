import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  updateFilterTerm,
  updateUserId,
  updateUserDetails,
  updateEverything,
  updateSamples,
  updateFirstname
} from "../../redux/auth.reducer";
import Picklist_Icon from "../Picklist_Icon";
import {
  updateDisplayAddNew,
  updateAdvanceSearch,
  updateDisplayFreezer,
  updateKeywordSearch,
  updateDisplayCane,
  updateDisplayBoxes,
  updateDisplayBox,
  updateDisplayPicklist,
  adv_search_display
} from "../../redux/display.reducer";
import Axios from "axios";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      filterTerm: "",
      adv_search_icon: true
    };
  }

  toggle_adv = () => {
    this.props.adv_search_display(this.state.adv_search_icon);
    this.setState({
      adv_search_icon: !this.state.adv_search_icon
    });
  };

  advanceSearch = () => {
    this.toggle_adv();
    if (this.state.adv_search_icon) {
      this.props.updateDisplayAddNew(false);
      this.props.updateDisplayFreezer(false);
      this.props.updateDisplayCane(false);
      this.props.updateDisplayBoxes(false);
      this.props.updateDisplayBox(false);
      this.props.updateAdvanceSearch(true);
      this.props.updateKeywordSearch(false);
    }
    // } else {
    //   this.props.updateDisplayAddNew(false);
    //   this.props.updateAdvanceSearch(false);
    //   this.props.updateDisplayFreezer(true);
    //   this.props.updateDisplayCane(false);
    //   this.props.updateDisplayBoxes(false);
    //   this.props.updateDisplayBox(false);
    //   this.props.updateAdvanceSearch(false);
    //   this.props.updateKeywordSearch(false);
    // }
  };

  addNew = () => {
    if (!this.props.addNew) {
      this.props.updateDisplayAddNew(true);
      this.props.updateDisplayPicklist(false);
      this.props.updateDisplayFreezer(false);
      this.props.updateDisplayCane(false);
      this.props.updateDisplayBoxes(false);
      this.props.updateDisplayBox(false);
      this.props.updateAdvanceSearch(false);
      this.props.updateKeywordSearch(false);
    } else {
      this.props.updateDisplayAddNew(false);
      this.props.updateDisplayPicklist(false);
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
      this.props.updateDisplayAddNew(false);
      this.props.updateDisplayPicklist(true);
      this.props.updateDisplayFreezer(false);
      this.props.updateDisplayCane(false);
      this.props.updateDisplayBoxes(false);
      this.props.updateDisplayBox(false);
      this.props.updateAdvanceSearch(false);
      this.props.updateKeywordSearch(false);
    } else {
      this.props.updateDisplayAddNew(false);
      this.props.updateDisplayPicklist(false);
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
    if (!this.props.keywordSearch) {
      this.props.updateDisplayAddNew(false);
      this.props.updateDisplayFreezer(false);
      this.props.updateDisplayCane(false);
      this.props.updateDisplayBoxes(false);
      this.props.updateDisplayBox(false);
      this.props.updateAdvanceSearch(false);
      this.props.updateKeywordSearch(true);
    }
  };
  logout = async () => {
    await Axios.get("/auth/logout");
    this.props.updateUserId(null);
    this.props.updateUserDetails({});
    this.props.updateEverything([]);
    this.props.updateSamples([]);
    this.props.updateFirstname("");
  };

  render() {
    const minus = <i className="fas fa-minus" onClick={this.advanceSearch} />;
    const plus = <i className="fas fa-plus" onClick={this.advanceSearch} />;

    return (
      <header className="Header">
        <h2 className="AppName">CELL SHEETS</h2>
        <div className="nav-links">
          <div className="logout">
            <i className="fas fa-user" onClick={this.logout} />
            <div>
              <Link to="/" className="newLogout">
                Logout
              </Link>
            </div>
          </div>
          <i
            onClick={this.addNew}
            className="fas fa-folder-plus topAddSample"
          />
          <div className="picklist-div" onClick={this.pickList}>
            <i className="fas fa-clipboard-list picklist" />
            <Picklist_Icon />
          </div>
          <div className="search">
            <i className="fas fa-search glass" onClick={this.search} />
            <input
              className="keyword-search-input"
              onChange={this.handleInput}
              type="text"
              name="filterValue"
              placeholder="Search"
            />
            <div className="adv-search-toggle" onClick={this.advanceSearch}>
              {this.state.adv_search_icon ? plus : minus}
            </div>
          </div>
        </div>
      </header>
    );
  }
}
const mapStateToProps = reduxState => {
  const {
    advancedSearch,
    keywordSearch,
    displayPicklist,
    adv_search_display_state,
    addNew
  } = reduxState.display;
  const { user_id, samples, authenticated } = reduxState;
  return {
    adv_search_display_state,
    user_id,
    samples,
    advancedSearch,
    authenticated,
    keywordSearch,
    addNew,
    displayPicklist
  };
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
  adv_search_display,
  updateDisplayAddNew,
  //auth logout
  updateUserId,
  updateUserDetails,
  updateEverything,
  updateSamples,
  updateFirstname
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
