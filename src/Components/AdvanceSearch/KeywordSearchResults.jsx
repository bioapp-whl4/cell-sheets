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

    var gridNotationSamples = JSON.parse(JSON.stringify(this.state.samples))
    gridNotationSamples.forEach((sample) => {
      sample.box_position[1] += 1
      switch(sample.box_position[0]){
          case 0:
              sample.box_position[0] = 'A'
              break
          case 1:
              sample.box_position[0] = 'B'
              break
          case 2:
              sample.box_position[0] = 'C'
              break
          case 3:
              sample.box_position[0] = 'D'
              break
          case 4:
              sample.box_position[0] = 'E'
              break
          case 5:
              sample.box_position[0] = 'F'
              break
          case 6:
              sample.box_position[0] = 'G'
              break
          case 7:
              sample.box_position[0] = 'H'
              break
          case 8:
              sample.box_position[0] = 'I'
              break
          default:
              break
      }
    })

    let allSamples = samples.map((elem, i) => (
      <tr
        className="samples-list"
        onClick={() => this.updateDisplay(elem.sample_id)}
        key={i}
      >
        <td>{elem.user_key}</td>
        <td>{elem.description}</td>
        <td>{elem.experiment_id}</td>
        <td>{elem.freeze_date}</td>
        <td>{gridNotationSamples[i].box_position}</td>
        <td>{elem.freezer_id}</td>
        <td>{elem.cane_id}</td>
        <td>{elem.box_id}</td>
      </tr>
    ));
    return (
      <div>
        {" "}
        <table>
          <tbody className="tg">
            <th>Sample ID</th>
            <th>Description</th>
            <th>Experiment ID</th>
            <th>Freeze Date</th>
            <th>Location in Box</th>
            <th>Freezer ID</th>
            <th>Cane ID</th>
            <th>Box ID</th>

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
