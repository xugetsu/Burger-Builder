import React, {Component} from 'react';
import A from '../../hoc/Auxx';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad:1,
            bacon:1,
            cheese:2,
            meat:2
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