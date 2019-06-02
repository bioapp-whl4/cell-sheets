import React, { Component } from "react";
import Swal from "sweetalert2";
import { updateUserId, updateUsername } from "../../redux/auth.reducer";

class Register extends Component {
  state = {
    first_name: "",
    last_name: "",
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
    // check that passwords match. if not, notify user and clear  password fields
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
      this.props.updateUsername(username);
      this.props.updateUserId(res.data.user_id);
      return;
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          onChange={this.handleChange}
          type="text"
          name="first_name"
          placeholder="First Name"
        />
        <input
          onChange={this.handleChange}
          type="text"
          name="last_name"
          placeholder="Last Name"
        />
        <input
          onChange={this.handleChange}
          type="text"
          name="email"
          placeholder="Email"
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
        <button>Register</button>
      </form>
    );
  }
}
const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = {
  updateUsername,
  updateUserId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
