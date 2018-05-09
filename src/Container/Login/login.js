import React from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import Paper from 'material-ui/Paper';
// import { Button } from 'reactstrap';
import {Button} from 'material-ui';
import Grid from 'material-ui/Grid';
import logo from '../../Images/logo.png';
import History from '../../History';
import { PropagateLoader } from 'react-spinners';
import { Email, Password, ErrorAlert } from '../../Component';
// import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import './login.css';
import LoginAction from '../../store/action/login';
import { CircularProgress } from 'material-ui/Progress';

const styles = theme => ({
    root: {
        flexGrow: 1,
        textAlign: "center"
    },
    logo: {
        width: "200px",
        // marginTop: "30px"
    },
    imgWrapper: {
        textAlign: "center",
    },
    btnWrapper: {
        display: "flex",
        justifyContent: 'space-between',
        marginTop: "40px"
    },
    button: {
        borderRadius: "3px"
    },
    paper: {
        width: '400px',
        height: '500px',
        margin: '30px auto',
        // padding: '30px'
    },
    input: {
        width: '100%',
        color: "#787575",
        borderStyle: 'none',
        borderBottom: '1px solid #787575',
        outline: 'none',
        paddingBottom: '5px',
        fontSize: '16px',
        marginTop: '30px'
    }
});

const style = {
    email: {
        width: '100%',
        color: "#787575",
        borderStyle: 'none',
        borderBottom: '1px solid #787575',
        outline: 'none',
        paddingBottom: '5px',
        fontSize: '16px',
        // marginTop: '30px'
    },
    password: {
        width: '100%',
        color: "#787575",
        borderStyle: 'none',
        borderBottom: '1px solid #787575',
        outline: 'none',
        paddingBottom: '5px',
        fontSize: '16px',
        marginTop: '30px'
    }
}


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            email: "",
            password: "",
            socialError: false,
            socialErrorText: ""
        };
        this.facebookProvider = new firebase.auth.FacebookAuthProvider();
        this.googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                History.replace('/map');
            }
        })

        // load longitude and latitude
        const location = window.navigator && window.navigator.geolocation
        if (location) {
            location.getCurrentPosition((position) => {
                const obj = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                }
                this.props.loadLocation(obj);
            }, (error) => {
                console.log(error);
            })
        }
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };
    update = (ev, state) => {
        let obj = {};
        obj[state] = ev.target.value;
        this.setState(obj);
        console.log(state, ev.target.value);
    }

    login = () => {
        const obj = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(obj);
        this.setState({ email: "", password: "" });
    }

    /**************************************************** facebook function ************************************/

    facebookLogin = () => {
        const me = this;
        firebase.auth().signInWithPopup(this.facebookProvider).then(function (result) {
            let token = result.credential.accessToken;
            let user = result.user;
            me.setState({ isUser: true, userCredential: user.providerData[0] }, function () {
                this.props.socialLogin(this.state.userCredential);
            });
        }).catch(function (error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            me.setState({ socialError: true, socialErrorText: errorMessage });
            console.log(`errorMessage: ${errorMessage}`);
            let email = error.email;
            let credential = error.credential;
        });

    }

    /* *************************************************** google function ************************************/


    googleLogin = () => {
        const me = this;
        firebase.auth().signInWithPopup(this.googleProvider).then(function (result) {
            let token = result.credential.accessToken;
            let user = result.user;
            console.log(user);
            me.setState({ isUser: true, userCredential: user.providerData[0] }, function () {
                this.props.socialLogin(this.state.userCredential);
            });

        }).catch(function (error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            me.setState({ socialError: true, socialErrorText: errorMessage });
            let email = error.email;
            let credential = error.credential;
        });
    }


    render() {
        const { classes } = this.props;
        console.log(this.props);
        return (

            <Paper className='paper' elevation={15}>

                <div>
                    <div className={classes.imgWrapper}>
                        <img src={logo} alt="logo" className={classes.logo} />
                    </div>
                    <div>
                        <Email userInput={this.state.email} type="email" LabelText="Email" placholderText="Email" onChange={(e) => this.update(e, 'email')} /> 
                         <Password password={this.state.password} onChange={(e) => this.update(e, 'password')} />
                        {/* <input className="input" label="Email" style={style.email} placeholder="Email" type="email" value={this.state.email} onChange={(e) => this.update(e, 'email')} />
                        <br />
                        <input className="input" label="Password" style={style.password} placeholder="Password" type="password" value={this.state.password} onChange={(e) => this.update(e, 'password')} /> */}
                        <div className={classes.btnWrapper}>
                            <p style={{ fontSize: "13px", cursor: 'pointer', color: "#3f51b5" }} onClick={() => this.props.history.push("/signup")}>
                                Don't have an account?
                        </p>
                            {/* <Button color="primary" className="btn" onClick={this.login}>Login</Button> */}
                            <Button letiant="raised" color="primary" className={classes.button} onClick={this.login}>
                                Login
                        </Button>
                        </div>
                    </div>
                    <div style={{ textAlign: "center", marginTop: "30px" }}>
                        <button className="loginBtn loginBtn--facebook" onClick={this.facebookLogin}>
                            Login with Facebook
                        </button>
                        <br />
                        <button className="loginBtn loginBtn--google" onClick={this.googleLogin}>
                            Login with Google
                        </button>

                    </div>
                </div>
                <div>
                    {
                        this.props.isProgress ? (
                            <div style={{width:'100%',height:"38px", display:'flex', justifyContent:"center", marginTop:"10px"}}>
                                <PropagateLoader
                                    color={'#123abc'}
                                    loading={this.props.isProgress}
                                />
                            </div>
                        ) :
                            null
                    }
                    {
                        this.props.isError ? (
                            <ErrorAlert toggle={this.props.isError} errorText={this.props.errorText} closeHandler={this.props.dispatchClose} />
                        ) :
                            null
                    }
                    {/* // ********************************* Social Login Error **************************** * */}
                    <ErrorAlert toggle={this.state.socialError} errorText={this.state.socialErrorText} closeHandler={() => this.setState({ socialError: false })} />
                </div>
            </Paper>
        );
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        currentUser: state.applicationSignInReducer.currentUser,
        isProgress: state.applicationSignInReducer.isProgress,
        isError: state.applicationSignInReducer.isError,
        errorText: state.applicationSignInReducer.errorText
    }
}
function mapDispatchToProps(dispatch) {
    return {
        loginUser: (dataObj) => dispatch(LoginAction.loginUser(dataObj)),
        dispatchClose: () => dispatch(LoginAction.closeErrorAlert()),
        socialLogin: (obj) => dispatch(LoginAction.socialLogin(obj)),
        loadLocation: (obj) => dispatch(LoginAction.loadLocation(obj)),
        // closeAlert : () => dispatch(loginErrorAlert())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));