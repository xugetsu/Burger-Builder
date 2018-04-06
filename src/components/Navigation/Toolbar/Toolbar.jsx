import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';

const toolbar = (props) => (
    <header className={classes.Toolbar} >
       <div>Menu</div>
       <Logo height='80%'/>
       <nav> 
          <NavigationItems />
       </nav> 
    </header>);

export default toolbar;