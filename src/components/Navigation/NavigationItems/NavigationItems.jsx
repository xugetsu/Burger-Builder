import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/burger-builder' exact={true}>Burger Builder</NavigationItem>
        <NavigationItem link='/burger-builder/orders'>Orders</NavigationItem>
    </ul>
);

export default navigationItems;