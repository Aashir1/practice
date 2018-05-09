import React from 'react';
import { MapCom } from '../../Component';
import{connect} from 'react-redux';
import {LogoutAction} from '../../store/action/logout';
import './map.css';
class Map extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          isMarkerShown: false,
          latitude:0,
          longitude:0,
          zoom: 5,
        }
    }

    componentDidMount() {
        this.delayedShowMarker();
        this.setState({zoom: 10})
    }
  
    delayedShowMarker = () => {
      setTimeout(() => {
        console.log("set time out chala")
        this.setState({ isMarkerShown: true })
      }, 3000)
    }
  
    handleMarkerClick = () => {
      this.setState({ isMarkerShown: false })
      this.delayedShowMarker()
    }
  
    render() {
        console.log(this)
      return (
          <div className="map-wrapper">
              <MapCom
                isMarkerShown={this.state.isMarkerShown}
                onMarkerClick={this.handleMarkerClick}
                lat = {this.props.latitude}
                lng = {this.props.longitude}
              />
          </div>
      )
    }
}


function mapStateToProps(state) {
    console.log(state)
    return {
        latitude: state.applicationSignInReducer.latitude,
        longitude: state.applicationSignInReducer.longitude
    }
}
function mapDispatchToProps(dispatch) {
    return {
        logout :()=> dispatch(LogoutAction.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);