import * as React from "react";
import { UserContext } from "./context";
import { accessTokenGet, accessTokenSet, accessTokenDelete } from "../../core/accessToken";
import { homeUrl, baseUrl } from "../App/routes";
import { history, fbdb } from "../..";

export default class UserProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      update: this.handleUpdate,
      login: this.login,
      logout: this.logout,
      settings: false,
      updateSettings: this.updateSettings,
      token: accessTokenGet() ? !0 : !1
    };
  }
  componentDidMount() {
    fbdb.collection("settings")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        if (data[0]) {
          this.setState({
            settings: data[0].settings
          })
        }
      });
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
  updateSettings = () => {
    const data = {
      settings: !this.state.settings,
      uid: 1568276657003
    };

    // adding data here
    fbdb.collection("settings")
      .doc(data.uid.toString())
      .set(data)
      .then(() => {
        console.log("done")
      })
      .catch(error => {
        console.log(error.message, "Add Device failed")
        this.setState({ isSubmitting: false });
      });
    this.setState(prevState => ({
      settings: !prevState.settings
    }));
  }
  logout = () => {
    this.setState({
      token: null
    });

    accessTokenDelete()
    history.push(baseUrl);
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
