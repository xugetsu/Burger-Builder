import React, {Component} from 'react';
import Aux from '../../hoc/Auxx';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state = {
        open: false
    }
    closeSideDrawerHandler = () => {
        this.setState({open: false});
    }
    openSideDrawerHandler = () => {
        this.setState({open: true});
    }
    render(){
        return (
            <Aux>
                <Toolbar opneSideDrawer={this.openSideDrawerHandler} />
                <SideDrawer open={this.state.open} closeSideDrawer={this.closeSideDrawerHandler}/>
                <main className = {classes.Content} >
                    {this.props.children}
                </main>
            </Aux>
        );
    };
}

export default Layout;