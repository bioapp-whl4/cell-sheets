import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  updateDisplaySample,
  updateKeywordSearch,
  updateDisplayBox,
  updateFreezerId,
  updateCaneId,
  updateBoxId,
  updateSampleId
} from "../../redux/display.reducer";

class DisplaySample extends Component {
  constructor() {
    super();
    this.state = {
      sampleId: null,
      sample: []
    };
  }
  async componentDidMount() {
    await this.getSample();
  }
  displayBox = (freezer_id, cane_id, box_id) => {
    this.props.updateFreezerId(freezer_id);
    this.props.updateCaneId(cane_id);
    this.props.updateBoxId(box_id);
    this.props.updateKeywordSearch(false);
    this.props.updateDisplayBox(true);
    this.updateDisplay();
  };
  updateDisplay = sample_id => {
    this.props.updateSampleId(sample_id);
    this.props.updateDisplayBox(true);
    this.props.updateDisplaySample(false);
  };
  getSample = async () => {
    let res = await axios.get("/api/sample?id=" + this.props.sampleId);
    this.setState({ sample: res.data });
  };

  render() {
    const { sample } = this.state;
    let allSamples = sample.map((elem, i) => (
      <div
        onClick={() =>
          this.displayBox(elem.freezer_id, elem.cane_id, elem.box_id)
        }
        key={i}
      >
        <tr>
          <tr>
            <td>Sample ID:</td>
            <td>{elem.user_key}</td>
          </tr>
          <tr>
            <td>Description:</td>
            <td>{elem.description}</td>
          </tr>
          <tr>
            <td>Experiment ID:</td>
            <td>{elem.experiment_id}</td>
          </tr>
          <tr>
            <td>Freeze Date:</td>
            <td>{elem.freeze_date}</td>
          </tr>
          <tr>
            <td>Location in Box</td>
            <td>{elem.box_position}</td>
          </tr>
          <tr>
            <td>Sample Name:</td>
            <td>{elem.sample_name}</td>
          </tr>
          <tr>
            <td>Freezer ID:</td>
            <td>{elem.freezer_id}</td>
          </tr>
          <tr>
            <td>Cane ID:</td>
            <td>{elem.cane_id}</td>
          </tr>

          <tr>
            <td>Box ID:</td>
            <td>{elem.box_id}</td>
          </tr>
        </tr>
        {/* <button
          className="goToBox"
          onClick={this.displayBox(elem.freezer_id, elem.cane_id, elem.box_id)}
        >
          Go to Box
        </button> */}
      </div>
    ));
    return (
      <div>
        {" "}
        <div>Click on Table to go to Box</div>
        <table>
          <tbody className="tg">
            <tr />

            {allSamples}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log(state);
  return {
    sampleId: state.display.sample_id
  };
}

const mapDispatchToProps = {
  updateDisplaySample,
  updateKeywordSearch,
  updateSampleId,
  updateDisplayBox,
  updateFreezerId,
  updateCaneId,
  updateBoxId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplaySample);
