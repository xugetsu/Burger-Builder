import React from 'react';
import Aux from '../../hoc/Auxx';
import classes from './Layout.css';

const layout = (props) => (
    <Aux>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main class = {classes.Content} >
            {props.children}
        </main>
    </Aux>
);

export default layout;