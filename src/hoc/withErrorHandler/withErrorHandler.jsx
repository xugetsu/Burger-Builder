import React, {Component}  from 'react';
import Modal from '../../components/UI/Modal/Modal';
import A from '../Auxx';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error : null,
        }
        componentWillMount(){
            axios.interceptors.request.use(req =>{
                this.setState({error: null});
                return req;
            });
            axios.interceptors.response.use(res => res, error =>{
                this.setState({error: error});
            });
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});            
        }
        render() {
            return (
                <A>
                    <Modal 
                        showModal ={this.state.error}
                        modalClosed = {this.errorConfirmedHandler} >
                        <p>something went wrong!</p>
                        {this.state.error? this.state.error.message : null  }
                    </Modal>
                    <WrappedComponent {...this.props} />
                </A>
            );
        }
    }
}

export default withErrorHandler;