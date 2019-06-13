import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateSampleId } from "../../redux/display.reducer";

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

  getSample = async () => {
    let res = await axios.get("/api/sample?id=" + this.props.sampleId);
    this.setState({ sample: res.data });
  };

  render() {
    const { sample } = this.state;
    let allSamples = sample.map((elem, i) => (
      <div>
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
      </div>
    ));
    return (
      <div>
        {" "}
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
  updateSampleId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplaySample);
