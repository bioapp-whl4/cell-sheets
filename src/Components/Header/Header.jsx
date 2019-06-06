import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updateFilterTerm } from "../../redux/auth.reducer";
import { Link } from "react-router-dom";
class Header extends Component {
  constructor() {
    super();
    this.state = {
      filterValue: ""
    };
  }
  handleInput = event => {
    let { name, value } = event.target;
    this.setState({
      [name]: value
    });
    this.props.updateFilterTerm(value);
  };

  render() {
    return (
      <div className="Header">
        <div className="BlueBar" />
        <h4 className="logout">LOG OUT</h4>
        <div className="fas fa-search search">
          <div className="lists-sample-header">
            <span>Search Samples:</span>
            <input
              onChange={this.handleInput}
              type="text"
              name="filterValue"
              placeholder="Search"
            />
          </div>
        </div>
        <h3 className="AppName">CELL SHEETS</h3>
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  const { user_id, samples, authenticated } = reduxState;
  return { user_id, samples, authenticated };
};

const mapDispatchToProps = {
  updateFilterTerm
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header));
