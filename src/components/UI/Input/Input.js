import React from 'react';
import classes from './Input.css'

const input = (props) => {
        const inputClasses = [classes.InputElement];
        if(props.invalid){ 
            inputClasses.push(classes.Invalid);
        }
        let inputElement = null;
        switch (props.elementType) {
            case 'input':    
                 inputElement = <input className={inputClasses.join(" ")} 
                                       {...props.elementConfig}
                                       value={props.value}
                                       onChange={props.changed}/>;     
                break;
            case 'textarea':  
                inputElement = <textarea className={inputClasses.join(" ")} 
                                         {...props.elementConfig}
                                         value={props.value}
                                         onChange={props.changed}/>; 
                break;
            case 'select':  
                inputElement =  <select className={inputClasses.join(" ")} 
                                        value={props.value}
                                        onChange={props.changed}>
                                        {props.elementConfig.options.map( option =>(
                                            <option key={option.value}
                                                    value={option.value}>
                                                    {option.displayValue}
                                            </option>
                                        ))}
                                </select>; 
                break;
            default:          
                inputElement = <input   className={inputClasses.join(" ")} 
                                        {...props.elementConfig}
                                        value={props.value}/>;   
                 break;
        }
        return(
             <div className={classes.Input}>
                <label className={classes.Label} >{props.label}</label>
                {inputElement}
             </div>
        );
}

export default input;