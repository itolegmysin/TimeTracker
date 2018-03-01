import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import * as routes from "../../../constants/routes";
import * as auth from "../../../config/auth";

const SignUpPage = ({ history }) => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm history={history} />
    <SignUpLink />
  </div>
);

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
);

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      username: "",
      email: "",
      passwordOne: "",
      passwordTwo: "",
      error: null
    };
  }

  onSubmit(event) {
    event.preventDefault();

    const { username, email, passwordOne } = this.state;

    const { history } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne).then(authUser => {
        this.setState(() => ({
          username: "",
          email: "",
          passwordOne: "",
          passwordTwo: "",
          error: null
        }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });
  }

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={username}
          onChange={event =>
            this.setState(byPropKey("username", event.target.value))
          }
          type="text"
          placeholder="Full Name"
        />
        <input
          value={email}
          onChange={event =>
            this.setState(byPropKey("email", event.target.value))
          }
          type="text"
          placeholder="Email Address"
        />
        <input
          value={passwordOne}
          onChange={event =>
            this.setState(byPropKey("passwordOne", event.target.value))
          }
          type="password"
          placeholder="Password"
        />
        <input
          value={passwordTwo}
          onChange={event =>
            this.setState(byPropKey("passwordTwo", event.target.value))
          }
          type="password"
          placeholder="Confirm Password"
        />
        <button type="submit">Sign Up</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withRouter(SignUpPage);

export { SignUpForm, SignUpLink };