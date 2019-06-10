import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updateSamples, updateFilterTerm } from "../../redux/auth.reducer";
import { Link } from "react-router-dom";
import axios from "axios";
class HeaderSearch extends Component {
  constructor() {
    super();
    this.state = {
      samples: [],
      filterValue: ""
    };
  }
  async componentDidMount() {
    this.setState({ filterValue: this.props.filterTerm });
    await this.getSamples();
  }
  getSamples = async () => {
    let res = await axios.get("/api/samples");
    this.setState({ samples: res.data });
    this.props.updateSamples(res.data);
  };

  //
  render() {
    let samples;
    if (this.props.filterTerm !== "") {
      samples = this.state.samples.filter(sample => {
        let searchFor = this.props.filterTerm.toLowerCase();
        let searchIn = sample.description
          ? sample.description.toLowerCase()
          : "";
        searchIn += sample.sample_name ? sample.sample_name.toLowerCase() : "";
        searchIn += sample.sample_id ? sample.sample_id : "";
        searchIn += sample.experiment_id ? sample.experiment_id : "";
        return searchIn.includes(searchFor);
      });
    } else {
      samples = this.state.samples;
    }
    let allSamples = samples.map((elem, i) => (
      <Link to={`/api/test/${elem.sample_id}`}>
        <div key={i}>
          <h4>Sample{elem.sample_name}</h4>
          <h4>Experiment id{elem.experiment_id}</h4>
          <h4>Sample id{elem.sample_id}</h4>
        </div>
      </Link>
    ));
    return (
      <div>
        {" "}
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
        <ul className="list_samples">
          <h4>Samples</h4>
          {allSamples}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  const { user_id, samples, authenticated, filterTerm } = reduxState;
  return { filterTerm, user_id, samples, authenticated };
};
const mapDispatchToProps = {
  updateSamples,
  updateFilterTerm
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HeaderSearch));
