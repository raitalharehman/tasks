import * as React from "react";
import { Link } from "react-router-dom";
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
            username: "admin",
            password: "",
            updateStore: false
        }
        this.handleUpdate = this.handleUpdate.bind(this);
    }
    componentDidMount() {
        // getExample(this, '1')
        let key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        this.setState({
            pass: key
        })
        console.log(key)
    }

    handleUpdate(key, value) {
        this.setState({
            [key]: value
        })
    }
    updatePass = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    updateName = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault()
        if (this.state.username === 'admin' && this.state.password === this.state.pass) {
            this.context.login("temp")
        } else {
            this.setState({
                validation: "User or Password incorrect"
            })
        }
    }
    render() {
        return <div className="loin-root">
            <div className="container">
                <div className="row">
                    <div className="col-md-5">
                        <div className="wrapper">
                            <form className="login-form" onSubmit={this.onSubmit}>
                                <h5 className="heading">Login</h5>
                                <div className="heading-tagline">Always a Step Ahead</div>
                                <h5 className="red-text">{this.state.validation}</h5>
                                <input type="text" onChange={this.updateName} value={this.state.username} placeholder="Username" required />
                                <input type="password" onChange={this.updatePass} value={this.state.password} placeholder="Password" required />
                                <button className="login-submit" type="submit">Sign in</button>
                                <Link className="forgotpassword" to="">Forgot Password</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default LoginPage;
