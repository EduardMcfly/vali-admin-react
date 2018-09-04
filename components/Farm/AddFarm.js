import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import { I18n, Trans } from 'react-i18next';
import update from 'immutability-helper';

class Addfarm extends Component {
    constructor(props) {
        super(props);
        this.loginSubmit = this.loginSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            email: '',
            password: '',
            errors: {
                inputs: { email: false, password: false },
                messages: { email: '', password: '' },
            },
            modalAddFarm:false
        };
        this.toggleAddFarm = this.toggleAddFarm.bind(this);
    }

    loginSubmit() {
        return axios({
            method: 'post',
            url: './login',
            data: { email: this.state.email, password: this.state.password },
        })
            .then(res => {
                if (typeof res.data.success !== 'undefined' || typeof res.data.auth !== 'undefined') {
                    this.props.userAuth.login();
                }
                if (typeof res.data.errors !== 'undefined') {
                    var errors = res.data.errors;
                    this.setState({
                        errors: {
                            inputs: { email: false, password: false },
                            messages: { email: '', password: '' },
                        },
                    });
                    if (typeof errors.email !== 'undefined') {
                        this.errorsChange('email', errors.email);
                    }
                    if (typeof errors.password !== 'undefined') {
                        this.errorsChange('password', errors.password);
                    }
                }
            })
            .catch(res => {
                if (typeof res.data.errors !== 'undefined') {
                    var errors = res.data.errors;
                    this.setState({
                        errors: {
                            inputs: { email: false, password: false },
                            messages: { email: '', password: '' },
                        },
                    });
                    if (typeof errors.email !== 'undefined') {
                        this.errorsChange('email', errors.email);
                    }
                    if (typeof errors.password !== 'undefined') {
                        this.errorsChange('password', errors.password);
                    }
                }
            });
    }

    errorsChange(position, message) {
        this.setState({
            errors: update(this.state.errors, {
                inputs: { $merge: { [position]: true } },
                messages: { $merge: { [position]: message } },
            }),
        });
    }

    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            modalAddFarm: false,
        });
        this.toggleAddFarm = this.toggleAddFarm.bind(this);
    }

    toggleAddFarm() {
        this.setState({
            modalAddFarm: !this.state.modalAddFarm,
        });
    }
    render() {
        return (
            <I18n ns="login">
                {(t, { i18n }) => (
                    <React.Fragment>
                        <Modal
                            isOpen={this.state.modalAddFarm}
                            toggle={this.toggleAddFarm}
                            className={(this.props.className, 'modal-dialog-centered')}
                        >
                            <ModalHeader toggle={this.toggleAddFarm}>Registro de finca</ModalHeader>
                            <ModalBody>
                                <label>Nombre de la finca</label>
                                <input
                                    type="text"
                                    name=""
                                    id="nombreFinca"
                                    placeholder="Ingresa el nombre de tu finca."
                                    className="form-control input-sm"
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.toggleAddFarm}>
                                    Guardar Cambios
                                </Button>
                                <Button color="secondary">Cerrar</Button>
                            </ModalFooter>
                        </Modal>
                    </React.Fragment>
                )}
            </I18n>
        );
    }
}

export default Addfarm;
