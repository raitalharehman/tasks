import * as React from "react";
import { UserContext } from "./context";
import { accessTokenGet, accessTokenSet } from "../../core/accessToken";
import { homeUrl } from "../App/routes";
import { history } from "../..";


export default class UserProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      update: this.handleUpdate,
      login: this.login,
      logout: this.logout,
      token: accessTokenGet() ? !0 : !1
    };
  }
  handleUpdate = (key, value) => {
    this.setState({
      [key]: value
    });
  }
  login = (token) => {
    this.setState({
      token: token
    });

    accessTokenSet("temp")
    history.push(homeUrl);
  }
  logout = () => {
    this.setState({
      token: null
    });
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
