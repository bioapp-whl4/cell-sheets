import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { updateFilterTerm } from "../../redux/auth.reducer";
import {
  updateAdvanceSearch,
  updateDisplayFreezer,
  updateKeywordSearch,
  updateDisplayCane,
  updateDisplayBoxes,
  updateDisplayBox
} from "../../redux/display.reducer";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      filterTerm: ""
    };
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
    return (
      <header className="Header">
        <h3 className="AppName">CELL SHEETS</h3>
        <div className="nav-links">
          <h4 className="logout">LOG OUT</h4>
          <div className="search">
            <span>
              {" "}
              Search Samples:
              <input
                onChange={this.handleInput}
                type="text"
                name="filterValue"
                placeholder="Search"
              />
              <button onClick={this.search}>Search</button>
            </span>
          </div>

          <div className="advance" onClick={this.navigate}>
            Advanced Search
          </div>
        </div>
      </header>
    );
  }
}
const mapStateToProps = reduxState => {
  const { keywordSearch } = reduxState.display;
  const { user_id, samples, authenticated } = reduxState;
  return { user_id, samples, authenticated, keywordSearch };
};

const mapDispatchToProps = {
  updateDisplayFreezer,
  updateDisplayCane,
  updateDisplayBoxes,
  updateDisplayBox,
  updateAdvanceSearch,
  updateKeywordSearch,
  updateFilterTerm
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
