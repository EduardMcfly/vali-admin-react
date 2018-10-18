import React, { Component } from "react";
import {
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    FormFeedback,
    Button,
    Modal,
    ModalFooter,
    ModalBody,
    ModalHeader
} from "reactstrap";
import { I18n } from "react-i18next";

class AddFarmWorkers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalAddFarmWorkers: true,
            modalAddFarmWorkersTitle: "",
            sendLogin: false,
            email: "",
            password: "",
            errors: {
                inputs: { email: false, password: false },
                messages: { email: "", password: "" }
            }
        };
        this.toggleAddFarmWorkers = this.toggleAddFarmWorkers.bind(this);
        this.loginSubmit = this.loginSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    toggleAddFarmWorkers() {
        this.setState({
            modalAddFarmWorkers: !this.state.modalAddFarmWorkers
        });
    }

    loginSubmit() {
        this.setState({ sendLogin: true });
        return axios({
            method: "post",
            url: "./login",
            data: { email: this.state.email }
        })
            .then(res => {
                if (typeof res.data.success !== "undefined") {
                    this.props.userAuth.login();
                } else if (typeof res.data.errors !== "undefined") {
                    this.setState({ sendLogin: false });
                    var errors = res.data.errors;
                    this.setState({
                        errors: {
                            inputs: { email: false, password: false },
                            messages: { email: "", password: "" }
                        }
                    });
                    this.errorInput(errors.email, "email");
                    this.errorInput(errors.password, "password");
                }
            })
            .catch(res => {
                this.setState({ sendLogin: false });
                if (typeof res.data.errors !== "undefined") {
                    var errors = res.data.errors;
                    this.setState({
                        errors: {
                            inputs: { email: false, password: false },
                            messages: { email: "", password: "" }
                        }
                    });

                    var a = [{ error: errors.email, input: "email" }];
                    console.log(a);
                    this.errorInput(errors.email, "email");
                    this.errorInput(errors.password, "password");
                }
            });
    }

    errorInput(error, input) {
        if (typeof error !== "undefined") {
            this.errorsChange(input, error);
        }
    }

    errorsChange(position, message) {
        this.setState({
            errors: {
                inputs: { [position]: true },
                messages: { [position]: message }
            }
        });
    }

    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <I18n ns="farm">
                {t => (
                    <React.Fragment>
                        <Modal
                            isOpen={this.state.modalAddFarmWorkers}
                            toggle={this.toggleAddFarmWorkers}
                            className={
                                (this.props.className,
                                "modal-dialog-centered modal-lg")
                            }
                        >
                            <ModalHeader
                                toggle={this.toggleAddFarmWorkers}
                                className="text-uppercase"
                            >
                                {t("addUser")}
                            </ModalHeader>
                            <ModalBody>
                                <InputGroup className="mb-3">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="fa fa-user" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        className={
                                            this.state.errors.inputs.email
                                                ? "is-invalid"
                                                : ""
                                        }
                                        type="text"
                                        placeholder={t("addEmailUser")}
                                        autoComplete="email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleInputChange}
                                    />
                                    <FormFeedback>
                                        {this.state.errors.messages.email}
                                    </FormFeedback>
                                </InputGroup>
                            </ModalBody>
                            <I18n ns="general">
                                {t => (
                                    <ModalFooter>
                                        <Button
                                            color="primary"
                                            onClick={this.loginSubmit}
                                        >
                                            {t("save")}
                                        </Button>
                                        <Button
                                            color="secondary"
                                            onClick={this.toggleAddFarmWorkers}
                                        >
                                            {t("cancel")}
                                        </Button>
                                    </ModalFooter>
                                )}
                            </I18n>
                        </Modal>
                    </React.Fragment>
                )}
            </I18n>
        );
    }
}

export default AddFarmWorkers;
