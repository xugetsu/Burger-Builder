import React, {Component} from 'react';
import A from '../../hoc/Auxx';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        }
    }
    render () {
        return (
            <A>
                <Burger ingredients = {this.state.ingredients} />
                <div>Build Control</div>
            </A>
        );
    }
}

export default BurgerBuilder;