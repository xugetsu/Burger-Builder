import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
class ContactData extends Component {
    state = {
        orderForm: {                   // the price need to be calculated in the server !!
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Tour E-Mail'
                },
                value: ''
            },
            deliveryMethod:{
                elementType: 'select',
                elementConfig: {
                    options:[
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'cheapest',displayValue:'Cheapest'},
                    ]
                },
                value: 'Cheapest'
            },
        },
        purchaseLoading:false,
    }
    orderHandler = (event) =>{
        event.preventDefault();
        this.setState({purchaseLoading: true});
        const formData = {};
        for( let orderFormIdentifier in this.state.orderForm){
            formData[orderFormIdentifier]= this.state.orderForm[orderFormIdentifier].value;
        }
        const order = {
            orderData: formData,
            ingredients: this.props.ingredients,
            price: this.props.totalPrice // this is not the setup that will be use it in a real app
        };       
        axios.post('/orders.json', order)
            .then ( response => {
                    this.props.history.goBack();
                })
            .catch( error    => {this.setState({purchaseLoading: false});});

    }
    onChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        updatedOrderForm[inputIdentifier].value= event.target.value;
        this.setState({orderForm:updatedOrderForm});
    }
    render(){

        let data = null;
        if(this.state.purchaseLoading){
            data = <Spinner/>
        }else{
            const orderForm = this.state.orderForm;
            const inputs = Object.keys(orderForm)
                           .map( inputSetupKey => {
                                    const inputSetup = orderForm[inputSetupKey];
                                    return <Input   key={inputSetupKey}
                                                    elementType={inputSetup.elementType} 
                                                    elementConfig={inputSetup.elementConfig}
                                                    value={inputSetup.value}
                                                    changed={(e) => this.onChangeHandler(e, inputSetupKey)}/>
                            });
            data = (<form onSubmit = {this.orderHandler}>
                        {inputs}
                        <Button btnType='Success'>ORDER</Button>
                    </form>);
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