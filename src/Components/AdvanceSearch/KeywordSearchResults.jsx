import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { updateSamples, updateFilterTerm } from "../../redux/auth.reducer";
import {
  updateAdvanceSearch,
  updateKeywordSearch,
  updateDisplaySample,
  updateSampleId
} from "../../redux/display.reducer";

class KeywordSearchResults extends Component {
  constructor() {
    super();
    this.state = {
      samples: [],
      filterTerm: "",
      sample_id: null
    };
  }
  async componentDidUpdate() {
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
  updateDisplay = sample_id => {
    this.props.updateSampleId(sample_id);
    this.props.updateKeywordSearch(false);
    this.props.updateDisplaySample(true);
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
      // <div

      // >
      <tr
        className="samples-list"
        onClick={() => this.updateDisplay(elem.sample_id)}
        key={i}
        // onMouseOver={{}}
        // style={{ cursor: "pointer" }}
      >
        {/* <td>{elem.sample_id}</td> */}
        <td>{elem.user_key}</td>
        <td>{elem.sample_name}</td>
        <td>{elem.freezer_id}</td>
        <td>{elem.box_id}</td>
        <td>{elem.description}</td>
        <td>{elem.freeze_date}</td>
        <td>{elem.cell_vial}</td>
        <td>{elem.culture_condition}</td>
      </tr>
      // </div>
    ));
    return (
      <div>
        {" "}
        <table>
          <tbody className="tg">
            <tr>
              <th>User Key</th>
              <th>Name</th>
              <th>Freezer ID</th>
              <th>Box ID</th>
              <th>Description</th>
              <th>Freeze Date</th>
              <th>Cell Vial</th>
              <th>Culture Condition</th>
            </tr>
            {allSamples}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapDispatchToProps = {
  updateAdvanceSearch,
  updateSamples,
  updateSampleId,
  updateFilterTerm,
  updateDisplaySample,
  updateKeywordSearch
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
