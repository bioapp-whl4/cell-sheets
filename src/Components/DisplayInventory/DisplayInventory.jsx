import React, { Component } from "react";
import { connect } from "react-redux";
import DisplayFreezers from "./Sub_components/DisplayFreezers/DisplayFreezers";
import FreezerBox from "./Sub_components/FreezerBox/FreezerBox";
import FreezerCane from "./Sub_components/FreezerCane/FreezerCane";
import Box from "../GridContextProvider";
import Picklist from '../Picklist';
import AddNew from '../AddSpecimen/AddSpecimen'
//Advance Search Display
import AdvanceSearchDisplay from "../AdvanceSearch/AdvanceSearchResults";
import KeywordSearchDisplay from "../AdvanceSearch/KeywordSearchResults";
import DisplaySample from "../DisplaySample/DisplaySample";
import {
  updateDisplayAddNew,
  updateAdvanceSearch,
  updateKeywordSearch,
  updateFreezerId,
  updateCaneId,
  updateBoxId,
  updateDisplayFreezer,
  updateDisplayCane,
  updateDisplayBoxes,
  updateDisplayBox,
  updateDisplaySample,
  updateDisplayPicklist
} from "../../redux/display.reducer";

class DisplayInventory extends Component {
  backToFreezer = async () => {
    this.props.updateDisplayAddNew(false);
    this.props.updateDisplayPicklist(false);
    this.props.updateKeywordSearch(false)
    this.props.updateAdvanceSearch(false)
    this.props.updateDisplayCane(false);
    this.props.updateDisplayFreezer(true);
    this.props.updateDisplayBoxes(false);
    this.props.updateDisplayBox(false);
    this.props.updateDisplaySample(false);
    this.props.updateFreezerId(null);
    this.props.updateCaneId(null);
    this.props.updateBoxId(null);
  };
  backToCane = () => {
    this.props.updateDisplayBoxes(false);
    this.props.updateDisplayCane(true);
    this.props.updateCaneId(null);
  };
  backToBox = () => {
    this.props.updateDisplayBox(false);
    this.props.updateDisplayBoxes(true);
    this.props.updateBoxId(null);
  };
  render() {
    return (
      <div className="displayInventory">
        {this.props.advancedSearch && (
          <div>
            <h3>Advance Search Results</h3>
            <AdvanceSearchDisplay />
            <button className="BackToInventory" onClick={this.backToFreezer}>
              Back to Inventory
            </button>
          </div>
        )}
        {this.props.picklist && <div>
            <h3>Pick List</h3>
            <Picklist/>
            <button className="BackToInventory" onClick={this.backToFreezer}>
              Back to Inventory
            </button>
          </div>}
        {this.props.keywordSearch && (
          <div>
            <h3>Keyword Search Results</h3>
            <KeywordSearchDisplay />
            <button className="BackToInventory" onClick={this.backToFreezer}>
              Back to Inventory
            </button>
          </div>
        )}
        {this.props.sample && (
          <div>
            <h3>Sample </h3>
            <DisplaySample />
          </div>
        )}
        {this.props.freezer && (
          <div className="freezers">
            <DisplayFreezers />
          </div>
        )}
        {this.props.cane && (
          <div>
            <FreezerCane />{" "}
            <button className="NavigateBack" onClick={this.backToFreezer}>
              Back to Freezers
            </button>
          </div>
        )}
        {this.props.boxes && (
          <div>
            <FreezerBox />
            <button className="NavigateBack" onClick={this.backToCane}>
              Back to Canes
            </button>{" "}
            <button className="BackToInventory" onClick={this.backToFreezer}>
              Back to Inventory
            </button>
          </div>
        )}
        {this.props.addNew && <div>
          <AddNew back={this.backToFreezer}/>
        </div>}
        {this.props.box && (
          <div>
            <Box />
            <button className="NavigateBack" onClick={this.backToBox}>
              Back to Boxes
            </button>{" "}
            <button className="BackToInventory" onClick={this.backToFreezer}>
              Back to Inventory
            </button>
          </div>
        )}
      </div>
    );
  }
}
const mapDispatchToProps = {
  //update ids
  updateFreezerId,
  updateCaneId,
  updateBoxId,
  // updateDisplays
  updateDisplayFreezer,
  updateDisplayCane,
  updateDisplayBoxes,
  updateDisplayBox,
  updateDisplaySample,
  updateKeywordSearch,
  updateAdvanceSearch,
  updateDisplayPicklist,
  updateDisplayAddNew
};
function mapStateToProps(state) {
  return {
    // Display Booleans
    freezer: state.display.freezer,
    cane: state.display.cane,
    boxes: state.display.boxes,
    box: state.display.box,
    sample: state.display.sample,
    // IDs to Search by
    freezer_id: state.display.freezer_id,
    cane_id: state.display.caneid,
    box_id: state.display.box_id,
    // Advance Search Results
    advancedSearch: state.display.advancedSearch,
    keywordSearch: state.display.keywordSearch,
    //Picklist
    picklist: state.display.displayPicklist,
    addNew: state.display.addNew
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayInventory);
