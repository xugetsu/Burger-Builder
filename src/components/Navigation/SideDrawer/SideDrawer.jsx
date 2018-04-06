import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import A from '../../../hoc/Auxx';

const sideDrawer = (props) => {
    const styles = [classes.SideDrawer, (props.open? classes.Open : classes.Close)].join(' ');
    return (
        <A>
            <Backdrop show={props.open} clicked={props.closeSideDrawer}/>
            <div 
                className={styles}>
                <Logo height='11%'/>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </A>
    );
};

export default sideDrawer;