import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { addBoxId } from "../../redux/display.reducer";

class AddSamples extends Component {
  constructor() {
    super();
    this.state = {
      specimens: [],
      locations: [],
      availableLocations: [],
      box_position: []
    };
  }

  async componentDidMount() {
    const response = await axios.get(
      `/api/boxgrid/samples?id=${this.props.boxId}`
    );
    try {
      const { data } = response;
      this.setState({
        specimens: data
      });
    } catch (err) {
      console.log(err);
    }

    let samples = this.state.specimens.map(sample => sample.location);
    const { x, y } = this.props;
    let tempArr = [];
    const totalSpaces = x * y;
    await this.setState({
      locations: samples
    });
    for (let i = 0; i < totalSpaces; i++) {
      let tempX = i % x;
      let tempY = Math.floor(i / x);
      var occupied = false;
      for (let j = 0; j < this.state.locations.length; j++) {
        if (
          tempX === this.state.locations[j][0] &&
          tempY === this.state.locations[j][1]
        ) {
          occupied = true;
        }
      }
      if (!occupied) {
        tempArr.push([tempX, tempY]);
      }
    }
    this.setState({
      availableLocations: tempArr
    });
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.box_id !== this.props.box_id) {
      const { box_id } = this.props;
      const response = await axios.get(`/api/boxgrid/samples?id=${box_id}`);
      try {
        const { data } = response;
        this.setState({
          specimens: data
        });
      } catch (err) {
        console.log(err);
      }

      let samples = this.state.specimens.map(sample => sample.location);
      const { x, y } = this.props;
      let tempArr = [];
      const totalSpaces = x * y;
      await this.setState({
        locations: samples
      });
      for (let i = 0; i < totalSpaces; i++) {
        let tempX = i % x;
        let tempY = Math.floor(i / x);
        var occupied = false;
        for (let j = 0; j < this.state.locations.length; j++) {
          if (
            tempX === this.state.locations[j][0] &&
            tempY === this.state.locations[j][1]
          ) {
            occupied = true;
          }
        }
        if (!occupied) {
          tempArr.push([tempX, tempY]);
        }
      }
      this.setState({
        availableLocations: tempArr
      });
    }
  }

  handleInput = async e => {
    var { value } = e.target;
    if (e.target.name === "box_position" && value === "null") {
      this.setState({
        box_position: null
      });

      return;
    }
    if (e.target.name === "box_position") {
      let tempValue = value.split(",").map(Number);
      this.setState({
        box_position: tempValue
      });
      this.props.updateBoxPostion(tempValue);
      return;
    }
  };

  render() {
    let samples = JSON.parse(JSON.stringify(this.state.availableLocations));

    samples.forEach(sample => {
      sample[1] += 1;
      switch (sample[0]) {
        case 0:
          sample[0] = "A";
          break;
        case 1:
          sample[0] = "B";
          break;
        case 2:
          sample[0] = "C";
          break;
        case 3:
          sample[0] = "D";
          break;
        case 4:
          sample[0] = "E";
          break;
        case 5:
          sample[0] = "F";
          break;
        case 6:
          sample[0] = "G";
          break;
        case 7:
          sample[0] = "H";
          break;
        case 8:
          sample[0] = "I";
          break;
        default:
          break;
      }
    });

    const compare = (a, b) => {
      if (a[0] > b[0]) return 1;
      if (a[0] < b[0]) return -1;
      if (a[0] === b[0]) {
        if (a[1] < b[1]) return -1;
        if (a[1] > b[1]) return 1;
      }
      return 0;
    };

    this.state.availableLocations.sort(compare);
    samples.sort(compare);

    const options = samples.map((sample, i) => {
      return (
        <option key={i} value={this.state.availableLocations[i]}>{`${
          sample[0]
        }${sample[1]}`}</option>
      );
    });

    return (
      <>
        <select name="box_position" onChange={this.handleInput}>
          <option value="null">Position</option>
          {options}
        </select>
      </>
    );
  }
}
const mapDispatchToProps = {
  addBoxId
};

function mapStateToProps(reduxState) {
  const { boxId } = reduxState.display;
  return { boxId };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSamples);
