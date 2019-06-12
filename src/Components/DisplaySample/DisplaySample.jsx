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
      // <div

      // >
      <tr
        className="samples-list"
        onClick={() => this.updateDisplay(elem.sample_id)}
        // onClick={() =>
        //   this.displayBox(sample.freezer_id, sample.cane_id, sample.box_id)
        // }
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
