import * as React from "react";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import "./scss/index.scss";
import { UserContext } from "../../components/ContextProvider/context";
// import getExample from "../../core/apiCalls/getExample";

class LoginPage extends React.Component {
    static contextType = UserContext;
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
        this.context.login("temp")
    }
    onSuccessByGoogle(response) {
        console.log(response);
        // this.context.login("temp")
    }
    render() {
        const responseGoogle = (response) => {
            this.onSuccessByGoogle(response)
        }
        return <div className="loin-root">
            <div className="container">
                <div className="row">
                    <div className="col-md-5">
                        <div className="wrapper">
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
                    </div>
                </div>
            </div>
        </div>
    }
}

export default LoginPage;
