import React, { Component } from "react";
import Grid from "./Grid";
// import AddSpecimens from './AddSpecimens'
import SampleList from "./SampleList";
import AddSamples from "../AddSamples";
import axios from "axios";

export default class GridContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specimens: [],
      originIndex: null,
      showData: null,
      addSample: false
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.moveItem = this.moveItem.bind(this);
    this.getSpecimens = this.getSpecimens.bind(this);
    this.updateSamples = this.updateSamples.bind(this);
  }

  async componentDidMount() {
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
  }

  componentDidUpdate(prevProps) {
    if (prevProps.box_id !== this.props.box_id) {
      this.getData();
    }
  }

  hideAdd = () => {
    this.setState({
      addSample: false
    })
  }

  getData = async () => {
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
  };

  async getSpecimens(specimens) {
    await this.setState({
      specimens
    });
  }

  addSample = () => {
    this.setState({
      addSample: !this.state.addSample
    });
  };

  async updateSamples() {
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
  }

  showData = specimen => {
    if (!specimen) return;
    this.setState({
      showData: specimen
    });
  };

  hideData = () => {
    this.setState({
      showData: null
    });
  };

  getIndex = index => {
    this.setState({
      originIndex: index
    });
  };

  async moveItem(x, y, index) {
    let targetIndex = -1;
    for (let i = 0; i < this.state.specimens.length; i++) {
      if (
        this.state.specimens[i].location[0] === x &&
        this.state.specimens[i].location[1] === y
      ) {
        targetIndex = i;
      }
    }
    let tempArr = this.state.specimens;
    if (targetIndex !== -1) {
      const target = this.state.specimens[targetIndex];
      const origin = this.state.specimens[this.state.originIndex];
      tempArr[this.state.originIndex] = target;
      tempArr[index] = origin;
    } else {
      tempArr[this.state.originIndex].location = [x, y];
    }

    await this.setState({
      specimens: tempArr,
      originIndex: null
    });

    for (let i = 0; i < this.state.specimens.length; i++) {
      const box_position = this.state.specimens[i].location;
      const sample_id = this.state.specimens[i].specimen_id;
      await axios.put("/api/boxgrid/samples", { box_position, sample_id });
    }
  }

  render() {
    return (
      <div style={{display: 'flex'}}>
        <Grid
          move={this.moveItem}
          get={this.getIndex}
          showData={this.showData}
          hideData={this.hideData}
          specimens={this.state.specimens}
          x={9}
          y={9}
        />
        <div style={{height: '690px', overflowY: 'scroll'}}>
          <SampleList style={{}} specimens={this.state.specimens} />
        </div>
        
        <button onClick={this.addSample}>Add a sample</button>
        {this.state.addSample && (
          <div >
            <AddSamples
              specimens={this.state.specimens}
              x={9}
              y={9}
              box_id={this.props.box_id}
              cane_id={this.props.cane_id}
              freezer_id={this.props.freezer_id}
              updateSamples={this.updateSamples}
              hideAdd={this.hideAdd}
            />
          </div>
          
        )}
      </div>
    );
  }
}
