import React, {Component} from 'react';
import A from '../../hoc/Auxx';

class BurgerBuilder extends Component {
    render () {
        return (
            <A>
                <div>Burger</div>
                <div>Build Control</div>
            </A>
        );
    }
}

export default BurgerBuilder;