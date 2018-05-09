import React from 'react';
import {Navbar} from './Component';
import {Map} from './Container'


const MapWithNav = (props) =>{
    return(
        <Navbar>
            <Map/>
        </Navbar>
    )
}

export{
    MapWithNav
}