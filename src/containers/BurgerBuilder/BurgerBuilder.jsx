import React, {Component} from 'react';
import A from '../../hoc/Auxx';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    render () {
        return (
            <A>
                <Burger />
                <div>Build Control</div>
            </A>
        );
    }
}

export default BurgerBuilder;