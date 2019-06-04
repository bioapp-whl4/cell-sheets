import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { connect } from "react-redux";
//import { withRouter } from "react-router-dom";
import { updateUserId, updateFirstname } from "../redux/auth.reducer";

class Register extends Component {
  state = {
    user_id: null,
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm_password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    // check that passwords match. if not, notify user and clear password fields
    if (this.state.password !== this.state.confirm_password) {
      Swal.fire({
        type: "error",
        title: "Oops...",
        text: "Your passwords do not match"
      });
      this.setState({
        password: "",
        confirm_password: ""
      });
    } else {
      console.log("mystate", this.state);
      const { firstname, lastname, email, password } = this.state;
      const res = await axios.post("/auth/register", {
        firstname,
        lastname,
        email,
        password
      });
      this.setState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirm_password: ""
      });
      console.log("my user_id", res.data.user_id);
      this.props.updateFirstname(firstname);
      this.props.updateUserId(res.data.user_id);
      console.log("Submitted Successfully");
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          onChange={this.handleChange}
          type="text"
          name="firstname"
          placeholder="First Name"
          value={this.state.firstname}
        />
        <input
          onChange={this.handleChange}
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={this.state.lastname}
        />
        <input
          onChange={this.handleChange}
          type="text"
          name="email"
          placeholder="Email"
          value={this.state.email}
        />
        <input
          onChange={this.handleChange}
          type="password"
          name="password"
          placeholder="Password"
          value={this.state.password}
        />
        <input
          onChange={this.handleChange}
          type="password"
          name="confirm_password"
          placeholder="Confirm Password"
          value={this.state.confirm_password}
        />
        <button onClick={this.handleSubmit}>Register</button>
        <Link to="/">
          <button>Back</button>
        </Link>
      </form>
    );
  }
}
const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = {
  updateFirstname,
  updateUserId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
