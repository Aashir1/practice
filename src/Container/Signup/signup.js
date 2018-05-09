import React from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import logo from '../../Images/logo.png';
import { Email, Password, ErrorAlert } from '../../Component';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import SignupAction from '../../store/action/signup';
import { CircularProgress } from 'material-ui/Progress';
import { PropagateLoader } from 'react-spinners';
import './signup.css';

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
    emailWrapper: {
        height: "55px"
    },
    button: {
        borderRadius: "3px"
    }
});


class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            name: "",
            email: "",
            password: "",
            socialError: false,
            socialErrorText: "",
        };
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };
    update = (ev, state) => {
        let obj = {};
        obj[state] = ev.target.value;
        this.setState(obj);
        console.log(state, ev.target.value);
    };

    signup = () => {
        const obj = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };
        console.log('from container', obj);
        console.log(this.state);
        this.props.signupUser(obj);
    }

    /* *************************************************** facebook function ************************************/

    facebookLogin = () => {
        const me = this;
        firebase.auth().signInWithPopup(this.provider).then(function (result) {
            let token = result.credential.accessToken;
            let user = result.user;
            me.setState({ isUser: true, userCredential: user.providerData[0] });
        }).catch(function (error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            me.setState({ socialError: true, socialErrorText: errorMessage });
            console.log(`errorMessage: ${errorMessage}`);
            let email = error.email;
            let credential = error.credential;
        });

    }

    render() {
        const { classes } = this.props;
        console.log(this.props);
        return (
            <Paper className="paper" elevation={15}>
                <div className={classes.imgWrapper}>
                    <img src={logo} alt="logo" className={classes.logo} />
                </div>
                <div>
                    <Email id="name" LabelText="Name" placholderText="Name" divStyle={{ height: "55px" }} type="text" onChange={(e) => this.update(e, 'name')} style={{ height: "55px" }} />
                    <Email id="email" LabelText="Email" placholderText="Email" type="email" className={classes.emailWrapper} onChange={(e) => this.update(e, 'email')} />
                    <Password onChange={(e) => this.update(e, 'password')} />
                    <div className={classes.btnWrapper}>
                        <p style={{ fontSize: "13px", cursor: 'pointer', color: "#3f51b5" }} onClick={() => this.props.history.push('/login')}>
                            Already have an account?
                        </p>
                        <Button letiant="raised" color="primary" className={classes.button} onClick={this.signup}>
                            Signup
                        </Button>
                    </div>
                </div>
                {/* <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <button className="loginBtn loginBtn--facebook">
                        Login with Facebook
                    </button>
                    <br />
                    <button className="loginBtn loginBtn--google">
                        Login with Google
                    </button>

                </div> */}
                <div>
                    {
                            this.props.isProgress ? (
                                <div style={{ width: '100%', height: "38px", display: 'flex', justifyContent: "center", marginTop: "10px" }}>
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
                    {/* ********************************* Social Login Error **************************** */}
                    {/* <ErrorAlert toggle={this.state.socialError} errorText={this.state.socialErrorText} closeHandler={()=>this.setState({socialError: false})} /> */}
                </div>
            </Paper>
        );
    }
}
function mapStateToProps(state) {
    return {
        currentUser: state.applicationReducers.currentUser,
        isProgress: state.applicationReducers.isProgress,
        isError: state.applicationReducers.isError,
        errorText: state.applicationReducers.errorText

    }
}
function mapDispatchToProps(dispatch) {
    return {
        signupUser: (dataObj) => dispatch(SignupAction.signupUser(dataObj)),
        dispatchClose: () => dispatch(SignupAction.closeErrorAlert()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Signup));
