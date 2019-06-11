import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { updateSamples, updateFilterTerm } from "../../redux/auth.reducer";
import {
  updateAdvanceSearch,
  updateKeywordSearch
} from "../../redux/display.reducer";

class KeywordSearchResults extends Component {
  constructor() {
    super();
    this.state = {
      samples: [],
      filterTerm: ""
    };
  }
  async componentDidUpdate(previousState, previousProps) {
    await this.getSamples();
    // if (previousProps.filterTerm !== props.filterTerm) {
    //   console.log("component did update");
    // }
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
  displayBox = (freezer_id, cane_id, box_id) => {
    this.props.updateFreezerId(freezer_id);
    this.props.updateCaneId(cane_id);
    this.props.updateBoxId(box_id);
    this.props.updateAdvanceSearch(false);
    this.props.updateDisplayBox(true);
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
      // <Link to={`/api/test/${elem.sample_id}`}>
      <div key={i}>
        <h4>Sample{elem.sample_name}</h4>
        <h4>Experiment id{elem.experiment_id}</h4>
        <h4>Sample id{elem.sample_id}</h4>
      </div>
      // </Link>
    ));
    return (
      <div>
        {" "}
        <div className="fas fa-search search">
          <div className="lists-sample-header" />
        </div>
        <ul className="list_samples">
          <h4>Samples</h4>
          {allSamples}
        </ul>
      </div>
    );
  }
}

const mapDispatchToProps = {
  updateAdvanceSearch,
  updateSamples,
  updateFilterTerm
};

function mapStateToProps(state) {
  return {
    filterResults: state.reducer.filter_results,
    filterTerm: state.reducer.filterTerm
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeywordSearchResults);
