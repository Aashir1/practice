import React from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import logo from '../../Images/logo.png';
import { Cube } from 'react-preloaders';
import History from '../../History';
import './index.css';

class Preloader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {
        console.log(this)
        let time = setTimeout(() => {
            History.replace('/login');
            clearTimeout(time);
        }, 5000);
    }

    render() {

        return (

            <React.Fragment>
                <Cube
                    color={"#f7f7f7"} //Default #2D2D2D
                    bgColor={"#222"} //Default #F7F7F7
                    time={5000} //Default #1300
                >
                    <img src={logo} alt="loader" />
                </Cube>

            </React.Fragment>

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
export default connect(mapStateToProps, mapDispatchToProps)(Preloader);