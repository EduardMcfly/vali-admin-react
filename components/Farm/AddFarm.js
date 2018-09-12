import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { I18n } from "react-i18next";
import update from "immutability-helper";

class Addfarm extends Component {
    constructor(props) {
        super(props);
        this.loginSubmit = this.loginSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            farm: "",
            modalAddFarm: false
        };
        this.hideAddFarm = this.hideAddFarm.bind(this);
        this.showAddFarm = this.showAddFarm.bind(this);
        this.saveFarm = this.saveFarm.bind(this);
    }

    loginSubmit() {
        return axios({
            method: "post",
            url: "./login",
            data: { email: this.state.email, password: this.state.password }
        })
            .then(res => {
                if (
                    typeof res.data.success !== "undefined" ||
                    typeof res.data.auth !== "undefined"
                ) {
                    this.props.userAuth.login();
                }
                if (typeof res.data.errors !== "undefined") {
                    var errors = res.data.errors;
                    this.setState({
                        errors: {
                            inputs: { email: false, password: false },
                            messages: { email: "", password: "" }
                        }
                    });
                    if (typeof errors.email !== "undefined") {
                        this.errorsChange("email", errors.email);
                    }
                    if (typeof errors.password !== "undefined") {
                        this.errorsChange("password", errors.password);
                    }
                }
            })
            .catch(res => {
                if (typeof res.data.errors !== "undefined") {
                    var errors = res.data.errors;
                    this.setState({
                        errors: {
                            inputs: { email: false, password: false },
                            messages: { email: "", password: "" }
                        }
                    });
                    if (typeof errors.email !== "undefined") {
                        this.errorsChange("email", errors.email);
                    }
                    if (typeof errors.password !== "undefined") {
                        this.errorsChange("password", errors.password);
                    }
                }
            });
    }

    errorsChange(position, message) {
        this.setState({
            errors: update(this.state.errors, {
                inputs: { $merge: { [position]: true } },
                messages: { $merge: { [position]: message } }
            })
        });
    }

    handleInputChange(event) {
        var re = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
        var OK = re.exec(event.target.value);
        console.log(OK);
        const name = event.target.name;
        const value = OK;
        this.setState({ [name]: event.target.value });
    }

    hideAddFarm() {
        this.setState({
            modalAddFarm: false
        });
    }
    showAddFarm() {
        this.setState({
            modalAddFarm: true
        });
    }
    saveFarm() {
        axios({
            method: "post",
            url: "./login",
            data: {
                email: this.state.email,
                password: this.state.password
            }
        });
        console.log(this);
    }
    render() {
        return (
            <I18n ns="farm">
                {(t, { i18n }) => (
                    <React.Fragment>
                        <Modal
                            isOpen={this.state.modalAddFarm}
                            toggle={this.hideAddFarm}
                            className={
                                (this.props.className, "modal-dialog-centered")
                            }
                        >
                            <ModalHeader toggle={this.hideAddFarm}>
                                {t("registerFarm.title")}
                            </ModalHeader>
                            <ModalBody>
                                <label>{t("registerFarm.name")}</label>
                                <input
                                    type="text"
                                    placeholder={t("registerFarm.input") + "."}
                                    value={this.state.farm}
                                    className="form-control input-sm"
                                    name="farm"
                                    onChange={this.handleInputChange}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.saveFarm}>
                                    Guardar Cambios
                                </Button>
                                <Button
                                    color="secondary"
                                    onClick={this.hideAddFarm}
                                >
                                    Cerrar
                                </Button>
                            </ModalFooter>
                        </Modal>
                    </React.Fragment>
                )}
            </I18n>
        );
    }
}

export default Addfarm;
