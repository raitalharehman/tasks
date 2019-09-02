import * as React from "react";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import "./scss/index.scss";
import { accessTokenSet } from "../../core/accessToken";
import { homeUrl } from "../../components/App/routes";
import { history } from "../..";
import { UserContext } from "../../components/ContextProvider/context";
// import getExample from "../../core/apiCalls/getExample";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            res: null,
            updateStore: false
        }
        this.handleUpdate = this.handleUpdate.bind(this);
    }
    componentDidMount() {
        // getExample(this, '1')
    }

    handleUpdate(key, value) {
        this.setState({
            [key]: value
        })
    }
    onSubmit = (e) => {
        e.preventDefault()
        this.setState({
            updateStore: true
        })
    }
    onSuccessByGoogle(response) {
        console.log(response);
        accessTokenSet("temp")
        history.push(homeUrl)
    }
    render() {
        const responseGoogle = (response) => {
            this.onSuccessByGoogle(response)
        }
        return <div className="loin-root">
            <div className="container">
                <div className="row">
                    <div className="col-md-5">
                        <UserContext.Consumer>
                            {({ login }) => (
                                <div className="wrapper">
                                    {this.state.updateStore ?
                                        <>
                                            <div onLoad={login("temp")}></div>
                                            <div onLoad={this.handleUpdate('updateStore', false)}></div>
                                        </>
                                        : null
                                    }
                                    <form className="login-form" onSubmit={this.onSubmit}>
                                        <h5 className="red-text">{this.state.validation}</h5>
                                        <h5 className="heading">ECRM</h5>
                                        <div className="heading-tagline">Always a Step Ahead</div>
                                        <input type="text" ref={(input) => this.username = input} placeholder="Username" required />
                                        <input type="password" ref={(input) => this.password = input} placeholder="Password" required />
                                        <button className="login-submit" type="submit" value="Submit">Sign in</button>
                                        <Link className="forgotpassword" to="">Forgot Password</Link>
                                    </form>
                                    <hr className="hr-line m-0"></hr>
                                    <div className="ip-root">
                                        <span className="hr-span">OR</span>
                                        <div>
                                            <GoogleLogin
                                                clientId="573429702643-jf2cps37asrgkr1og3d7668soearop9r.apps.googleusercontent.com"
                                                buttonText="Login with"
                                                className="google-login"
                                                onSuccess={responseGoogle}
                                                onFailure={responseGoogle}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </UserContext.Consumer>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default LoginPage;
