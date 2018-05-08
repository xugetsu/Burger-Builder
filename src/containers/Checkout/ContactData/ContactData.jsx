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
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched:false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Tour E-Mail'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            deliveryMethod:{
                elementType: 'select',
                elementConfig: {
                    options:[
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'cheapest',displayValue:'Cheapest'},
                    ]
                },
                value: 'Cheapest',
                valid:true,
                touched:false,
            },
        },
        purchaseLoading:false,
        formTouched:false,
        formInvalid:false
    }

    orderHandler = (event) =>{
        event.preventDefault();
        if(this.state.formIsValid){
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
        axios.post('/burger-builder/orders.json', order)
            .then ( response => {
                    this.props.history.goBack();
                })
            .catch( error    => {this.setState({purchaseLoading: false});});
        }else{
            if(!this.state.formTouched){
                this.setState({formTouched:true});
            }
        }
    }

    checkFormValidity = (orderForm) => {
        for( let inputElementKey in this.state.orderForm){
            const inputElement = this.state.orderForm[inputElementKey];
            if(!inputElement.valid){ 
                return false;
            }
        }
        return true;
    }

    checkValidity = (value, rules) =>{
        let isValid = true;
        if(!rules){
            return true;
        }
        if(rules && rules.required){
            isValid = value.trim() !== '';
        }
        if(isValid && rules && rules.minLength){
            isValid = value.length >= rules.minLength;
        }
        if(isValid && rules && rules.maxLength){
            isValid = value.length <= rules.maxLength;
        }
        return isValid;
    }

    onChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedInput = updatedOrderForm[inputIdentifier];
        const rules = updatedInput.validation;
        const UpdatedValue = event.target.value;
        updatedInput.valid = this.checkValidity(UpdatedValue, rules);
        updatedInput.value= UpdatedValue;
        updatedInput.touched = true;
        const formIsValid = this.checkFormValidity(updatedOrderForm);
        this.setState({orderForm: updatedOrderForm,formIsValid: formIsValid});
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
                                    const inputIsInvalid = Boolean(!inputSetup.valid && ((inputSetup.validation && inputSetup.touchedtouched) || this.state.formTouched)); 
                                    return <Input key={inputSetupKey}
                                                  elementType={inputSetup.elementType} 
                                                  elementConfig={inputSetup.elementConfig}
                                                  value={inputSetup.value}
                                                  invalid= {inputIsInvalid}
                                                  changed={(e) => this.onChangeHandler(e, inputSetupKey)}/>
                            });
            data = (<form onSubmit = {this.orderHandler}>
                        {inputs}  
                        <Button btnType='Success' disabled={!this.state.formIsValid && this.state.formTouched }>ORDER</Button>
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