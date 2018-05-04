import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        purchaseLoading:false,
        name: '',
        email: '',
        address:{
            street:'',
            postalCode: ''
        }
    }
    orderHandler = (event) =>{
        event.preventDefault();
       // this.setState({purchaseLoading:true});
       // console.log(this.props.ingredients);
        this.setState({purchaseLoading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice, // this is not the setup that will be use it in a real app
            cutomer: {                     // the price need to be calculated in the server !!
                 name: 'Ali othmani',
                 address: {
                     street: 'TestStreet1',
                     zipCode: '16846815',
                     country: 'LolliWorld'
                 },
            },
            email: 'test@test.com',
            deliveryMethode: 'Fastest' 
        };       
        axios.post('/orders.json', order)
            .then ( response => {
                  //  this.setState({purchaseLoading: false});
                    this.props.history.goBack();
                })
            .catch( error    => {this.setState({purchaseLoading: false});});

    }
    
    render(){
        //console.log('[ContactData]',this.props);
        let data = (<form>
                        <input type='text' name='name' placeholder='Your Name' />
                        <input type='email' name='email' placeholder='Your Mail' />
                        <input type='text' name='street' placeholder='Street' />
                        <input type='text' name='postal' placeholder='Postal Code' />
                        <Button btnType='Success' clicked = {this.orderHandler} >ORDER</Button>
                    </form>);
        if(this.state.purchaseLoading){
            data = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>{this.state.purchaseLoading?"Sending the Order...":"Enter Your Contact Data"}</h4>
                {data}
            </div>
        );
    }
}

export default ContactData; 