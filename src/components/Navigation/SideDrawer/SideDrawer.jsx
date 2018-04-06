import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';

const sideDrawer = (props) => {
    const styles = [classes.SideDrawer, (props.open? classes.Open : classes.Close)].join(' ');
    return (
        <div 
            className={styles}>
            <Logo height='11%'/>
            <nav>
                <NavigationItems />
            </nav>
        </div>
    );
};

export default sideDrawer;