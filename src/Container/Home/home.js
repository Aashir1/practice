import React from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import logo from '../../Images/logo.png';
import { Email, Password, ErrorAlert } from '../../Component';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import './home.css';
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
    }
});


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
        };
    }

    // componentDidMount() {
    //     console.log('component didmound run')
    //     const location = window.navigator && window.navigator.geolocation
    //     if (location) {
    //         location.getCurrentPosition((position) => {
    //             this.setState({
    //                 latitude: position.coords.latitude,
    //                 longitude: position.coords.longitude,
    //             }, ()=>{
    //                 console.log(this.state);
    //             })
    //         }, (error) => {
    //             this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
    //         })
    //     }
    // }


    render() {

        return (
            <Paper className='paper' elevation={15}>
                <h1>Home js</h1>
            </Paper>
        );
    }
}

function mapStateToProps(state) {
    // console.log(state)
    return {
        //     currentUser: state.applicationSignInReducer.currentUser,
        //     isProgress: state.applicationSignInReducer.isProgress,
        //     isError: state.applicationSignInReducer.isError,
        //     errorText: state.applicationSignInReducer.errorText
    }
}
function mapDispatchToProps(dispatch) {
    return {
        // loginUser: (dataObj) => dispatch(LoginAction.loginUser(dataObj)),
        // dispatchClose: () => dispatch(LoginAction.closeErrorAlert()),
        // socialLogin: (obj)=> dispatch(LoginAction.socialLogin(obj)),
        // closeAlert : () => dispatch(loginErrorAlert())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));