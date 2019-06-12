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
        <h2 className="AppName">CELL SHEETS</h2>
        <div className="nav-links">
          <div className="logout">
            <i class="fas fa-user"></i>
            <div>Log Out</div>
          </div>
          <div>
            <div className="search">
              <input onChange={this.handleInput} type="text" name="filterValue" placeholder="Search" />
              <button onClick={this.search}>Search</button>
            </div>
            <div>
              <input type="checkbox" onClick={this.navigate} defaultUnChecked/>
              <label>Advanced Search</label>
            </div>
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
