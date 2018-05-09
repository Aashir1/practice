import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import {Navbar} from './Component';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Routes from './Routes'
import store from './store';
// import DrawerUndockedExample from './Component/Navbar/Navbar';
ReactDOM.render(
    <Provider store={store}>
       
            {/* <DrawerUndockedExample/> */}
            <Routes />
        
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
