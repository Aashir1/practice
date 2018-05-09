import React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from 'material-ui/Switch';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Menu, { MenuItem } from 'material-ui/Menu';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import InboxIcon from '@material-ui/icons/MyLocation';
import DraftsIcon from '@material-ui/icons/Lock';
import logo from '../../Images/logo.png';
import './navbar.css';
import {LogoutAction} from '../../store/action/logout'
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Titan One', 'cursive']
  }
});

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Navbar extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <img src ={logo} alt="image" width="50px"/>
            <Typography variant="title" color="inherit" className={classes.flex}>
                <span style={{fontSize: "30px", fontFamily: 'Titan One', color:"#384246"}}>
                    Fixs
                </span>
            </Typography>
              <div>
                {/* right container */}
              </div>
          </Toolbar>
        </AppBar>
        <div className="slider-wrapper">
          <div className='slider'>
            <Divider />
              <List component="nav">
              <ListItem button>
                <ListItemIcon >
                  <InboxIcon style={{color: '#e4e4e4de'}} />
                </ListItemIcon>
                <ListItemText disableTypography primary={<Typography type="body2" style={{ color: '#e4e4e4de' }}>Map</Typography>} />
              </ListItem>
              <ListItem button onClick={()=> this.props.logout()}>
                <ListItemIcon>
                  <DraftsIcon style={{color: '#e4e4e4de'}}/>
                </ListItemIcon>
                <ListItemText disableTypography primary={<Typography type="body2" style={{ color: '#e4e4e4de' }}>logout</Typography>} />
              </ListItem>
            </List>
            {/* <List component="nav">
              <ListItem button>
                <ListItemText primary="Trash" />
              </ListItem>
              <ListItem button component="a" href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItem>
            </List> */}
          </div>
          <div style={{width: '100vw'}}> 
            {this.props.children}
          </div>
        </div>
      </div>
    );
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


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navbar));