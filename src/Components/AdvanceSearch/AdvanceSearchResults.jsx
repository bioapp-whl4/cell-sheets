import React, { Component } from "react";
import { connect } from "react-redux";
import {
  updateAdvanceSearch,
  updateDisplaySample,
  updateDisplayBox,
  updateFreezerId,
  updateCaneId,
  updateBoxId,
  updateSampleId
} from "../../redux/display.reducer";

class AdvanceSearchResults extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.filterResults !== prevProps.filterResults) {
    }
  }
  //   displayBox = (freezer_id, cane_id, box_id) => {
  //     this.props.updateFreezerId(freezer_id);
  //     this.props.updateCaneId(cane_id);
  //     this.props.updateBoxId(box_id);
  //     this.props.updateAdvanceSearch(false);
  //     this.props.updateDisplayBox(true);
  //   };
  updateDisplay = sample_id => {
    this.props.updateSampleId(sample_id);
    this.props.updateAdvanceSearch(false);
    this.props.updateDisplaySample(true);
  };
  render() {
    let results_display = this.props.filterResults.map((sample, i) => (
      // return (
      //     <div onClick={()=>this.displayBox(sample.freezer_id,sample.cane_id,sample.box_id)} key={i}>
      //         <h6>{sample.sample_name}</h6>
      //         <ul>
      //             <li>Description: {sample.description}</li>
      //             <li>Freeze Date: {sample.freeze_date}</li>
      //             <li>Experiment ID: {sample.experiment_name}</li>
      //         </ul>

      //     </div>
      // )

      <tr
        className="samples-list"
        onClick={() => this.updateDisplay(sample.sample_id)}
        key={i}
      >
        <td>{sample.user_key}</td>
        <td>{sample.description}</td>
        <td>{sample.experiment_id}</td>
        <td>{sample.freeze_date}</td>
        <td>{sample.box_position}</td>
        <td>{sample.freezer_id}</td>
        <td>{sample.cane_id}</td>
        <td>{sample.box_id}</td>
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

            {results_display}
          </tbody>
        </table>
      </div>
    );
    //return <div>{results_display}</div>;
  }
}

const mapDispatchToProps = {
  updateFreezerId,
  updateCaneId,
  updateBoxId,
  updateAdvanceSearch,
  updateDisplaySample,
  updateDisplayBox,
  updateSampleId
};

function mapStateToProps(state) {
  return {
    filterResults: state.reducer.filter_results
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvanceSearchResults);
