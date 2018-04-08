import React from 'react';
import classes from './Modal.css';
import A from '../../../hoc/Auxx';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends React.Component {
    shouldComponentUpdate(nextProps, nextState){
        return this.props.showModal !== nextProps.showModal || 
               this.props.children !== nextProps.children
    }
    render() {
        return(
        <A>
            <Backdrop show ={this.props.showModal} clicked = {this.props.modalClosed}/>
            <div 
                className = {classes.Modal}
                style = {{
                    transform: this.props.showModal ? 'translateY(0)': 'translateY(-100vh)',
                    opacity: this.props.showModal ? '1' : '0'
                }}>
                {this.props.children}
            </div>
        </A>
        );
    }
}


export default Modal;