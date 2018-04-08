import React from 'react';
import classes from './Spinner.css';

const spinner = () => (
    <div className={classes.Load}>
    <div className={classes.Loader}></div>
    <p>Loading...</p>
    </div>
);

export default spinner;