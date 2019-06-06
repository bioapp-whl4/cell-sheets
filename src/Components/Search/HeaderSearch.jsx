import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updateSamples } from "../../redux/auth.reducer";
import { Link } from "react-router-dom";
import axios from "axios";
class HeaderSearch extends Component {
  constructor() {
    super();
    this.state = {
      filterValue: "",
      samples: []
    };
  }
  async componentDidMount() {
    await this.getSamples();
  }
  getSamples = async () => {
    let res = await axios.get("/api/samples");
    this.setState({ samples: res.data });
    this.props.updateSamples(res.data);
  };
  handleInput = event => {
    let { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    let samples;
    if (this.state.filterValue !== "") {
      samples = this.state.samples.filter(sample => {
        let searchFor = this.state.filterValue.toLowerCase();
        let searchIn = sample.description
          ? sample.description.toLowerCase()
          : "";
        searchIn += sample.sample_name ? sample.sample_name.toLowerCase() : "";
        return searchIn.includes(searchFor);
      });
    } else {
      samples = this.state.samples;
    }
    let allSamples = samples.map((elem, i) => (
      <Link to={`/api/test/${elem.sample_id}`}>
        <div key={i}>
          <h4>Sample{elem.sample_name}</h4>
          <i class="fas fa-layer-group cane" />
        </div>
      </Link>
    ));
    return (
      <div>
        <div className="lists-sample-header">
          <span> Search Samples:</span>
          <input
            onChange={this.handleInput}
            type="text"
            name="filterValue"
            placeholder="Search"
          />
        </div>
        <ul className="list_samples">
          <h4>Samples</h4>
          {allSamples}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  const { user_id, samples, authenticated } = reduxState;
  return { user_id, samples, authenticated };
};

const mapDispatchToProps = {
  updateSamples
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HeaderSearch));
