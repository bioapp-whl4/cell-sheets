import React, { Component } from "react";
import axios from "axios";
import {
  updateFreezerId,
  updateDisplayFreezer,
  updateDisplayCane
} from "../../../../redux/display.reducer";
import { connect } from "react-redux";

class DisplayFreezers extends Component {
  constructor() {
    super();
    this.state = {
      freezers: [],
      freezer1Temp: 0
    };
  }
  async componentDidMount() {
    await this.getFreezers();
    this.getFreezerTemperatureInitial();
    this.getFreezerTemperatureInterval();
  }

  getFreezerTemperatureInitial = async () => {
    let response = await axios.get("http://192.168.2.142:3333");
    let tempArr = this.state.freezers;
    tempArr[1].temperature = response.data.temperature;
    this.setState({
      freezer1Temp: response.data.temperature,
      freezers: tempArr
    });
  };

  getFreezerTemperatureInterval = async () => {
    setInterval(async () => {
      let response = await axios.get("http://192.168.2.142:3333");
      let tempArr = this.state.freezers;
      tempArr[1].temperature = response.data.temperature;
      this.setState({
        freezer1Temp: response.data.temperature,
        freezers: tempArr
      });
    }, 10000);
  };

  getFreezers = async () => {
    await axios.get("/api/freezers").then(res => {
      this.setState({ freezers: res.data });
    });
  };
  updateDisplay = id => {
    this.props.updateFreezerId(id);
    this.props.updateDisplayFreezer(false);
    this.props.updateDisplayCane(true);
  };

  render() {
    let displayFreezers = this.state.freezers.map((elem, i) => {
      return (
        <div
          className="freezersList"
          onClick={() => this.updateDisplay(elem.freezer_id)}
          key={i}
        >
          <div className="row">
            <div className="column">
              <i className="fas fa-temperature-low icon" />
            </div>
            <div className="column">
              <h3>Freezer: {elem.freezer_name}</h3>
            </div>

            <h4>Temperature: {elem.temperature} C</h4>
            <h4>Type: {elem.freezer_type}</h4>
          </div>
        </div>
      );
    });
    return (
      <div className="app">
        <div className="contents">
          <h1 className="CellInventory">Cell Inventory</h1>
          <div className="firstDiv">
            <i className="fas fa-snowflake cold" />
          </div>
          <div className="secondDiv">
            <h3 className="category">Freezers</h3>
          </div>
          <div className="displayContents">{displayFreezers}</div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  updateFreezerId,
  updateDisplayFreezer,
  updateDisplayCane
};

export default connect(
  null,
  mapDispatchToProps
)(DisplayFreezers);
