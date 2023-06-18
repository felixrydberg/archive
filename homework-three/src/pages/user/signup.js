import { Component } from "react";
import Modal from "../../components/signup/modal";

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      pwd: "",
      content: {},
    };
  }

  setUsers = (newValue) => {
    const arr = JSON.parse(localStorage.getItem("users"));
    arr.push(newValue);
    localStorage.setItem("users", JSON.stringify(arr));
  };

  isUserValid = (event) => {
    event.preventDefault();
    const users = JSON.parse(localStorage.getItem("users"));
    if (users.find((user) => user.email === this.state.email)) {
      this.setState({
        content: { display: true, message: "Mail already in use" },
      });
      return;
    }
    this.setState({
      content: { display: true, message: "Signup successfull, please proceed to login page" },
    });
    this.setUsers({
      email: this.state.email,
      pwd: this.state.pwd,
    });
  };
  render() {
    return (
      <div className="sign-up-container form-container">
        <form onSubmit={this.isUserValid}>
          <input
            onChange={this.emailOnchange}
            type="email"
            placeholder="Email"
          ></input>
          <input
            onChange={this.pwdOnchange}
            type="password"
            placeholder="Password"
          ></input>
          <button type="submit">Register</button>
        </form>
        <Modal
          content={this.state.content}
          closeModal={this.closeModal}
        ></Modal>
      </div>
    );
  }

  closeModal = () => {
    this.setState({ content: { display: false } });
  };

  emailOnchange = (event) => {
    this.setState({ email: event.target.value });
  };

  pwdOnchange = (event) => {
    this.setState({ pwd: event.target.value });
  };
}
