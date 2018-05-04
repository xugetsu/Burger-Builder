import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
class Orders extends Component {
    state = {
        orders:[],
        loading:true,
    }
    componentWillMount(){
        axios.get('/orders.json')
            .then( res => {
                const ordersObject = res.data;
                const ordersArray = Object.keys(ordersObject)
                        .map( orderkey => {return {id:orderkey,...ordersObject[orderkey]}});
                this.setState({orders:ordersArray, loading:false});
             })
             .catch( err => {
                this.setState({loading:false});
             });
    }
    render(){
        let spinner = null;
        if(this.state.loading){
            spinner = <Spinner />;
        }
        const orders = this.state.orders.map( order => <Order  key ={order.id} 
                                                           price={+order.price} 
                                                           ingredients={order.ingredients}/>);
        return(
             <div>
                {spinner}
                {orders}
             </div>
        );
    }
}

export default withErrorHandler(Orders, axios);