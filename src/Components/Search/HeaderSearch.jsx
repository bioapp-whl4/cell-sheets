import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updateSamples } from "../../redux/auth.reducer";
import { Link } from "react-router-dom";
import axios from "axios";
class HeaderSearch extends Component {
  constructor() {
    super();
    this.state = {
      filterValue: "",
      samples: []
    };
  }
  async componentDidMount() {
    await this.getSamples();
  }
  getSamples = async () => {
    let res = await axios.get("/api/samples");
    this.setState({ samples: res.data });
    this.props.updateSamples(res.data);
  };
  // track user inputs via local state
  handleInput = event => {
    let { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    let displaySamples = this.state.samples.map((elem, i) => {
      return (
        <Link to={`/api/sample/results${elem.freezer_id}`}>
          <div key={i}>
            <h3>{elem.freezer_name}</h3>
            <i class="fas fa-temperature-low" />
            <h4>{elem.temperature}</h4>
            <h4>{elem.freezer_type}</h4>
          </div>
        </Link>
      );
    });
    return (
      <div className="display">
        <div className="contents">
          <h1 className="CellInventory">Cell Inventory</h1>
          <h3 className="category">Samples</h3>
          <i class="fas fa-snowflake cold" />
          <div className="displayContents">{displaySamples}</div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  const { user_id, samples, authenticated } = reduxState;
  return { user_id, samples, authenticated };
};

const mapDispatchToProps = {
  updateSamples
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HeaderSearch));
