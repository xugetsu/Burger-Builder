import React from 'react';
import classes from './Modal.css';
import A from '../../../hoc/Auxx';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {

    return (
        <A>
            <Backdrop show ={props.showModal} clicked = {props.modalClosed}/>
            <div 
                className = {classes.Modal}
                style = {{
                    transform: props.showModal ? 'translateY(0)': 'translateY(-100vh)',
                    opacity: props.showModal ? '1' : '0'
                }}>
                {props.children}
            </div>
        </A>
    );
}


export default modal;