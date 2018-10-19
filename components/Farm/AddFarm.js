import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormFeedback
} from "reactstrap";
import { I18n } from "react-i18next";

class Addfarm extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            farm: "",
            modalAddFarm: false,
            errors: {
                inputs: { farmName: false },
                messages: { farmName: "" }
            }
        };
        this.hideAddFarm = this.hideAddFarm.bind(this);
        this.showAddFarm = this.showAddFarm.bind(this);
        this.saveFarm = this.saveFarm.bind(this);
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
        var re = /^[0-9-a-zA-Z\u00C0-\u017F^\s]+(?:(?:)+)*$/g;
        if (true || event.target.value.length < 1) {
            const name = event.target.name;
            const value = event.target.value;
            this.setState({ [name]: value });
        }
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
            url: "./addFarm",
            data: {
                name: this.state.farm
            }
        })
            .then(res => {
                if (typeof res.data.success !== "undefined") {
                    this.props.getlistFarms();
                    this.hideAddFarm();
                }
            })
            .catch(error => {
                if (typeof error.data.errors !== "undefined") {
                    if (typeof error.data.errors.name !== "undefined") {
                        this.errorsChange("farmName", error.data.errors.name);
                    }
                }
            });
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
                                    className={
                                        "form-control input-sm " +
                                        (this.state.errors.inputs.farmName
                                            ? "is-invalid"
                                            : "")
                                    }
                                    name="farm"
                                    onChange={this.handleInputChange}
                                />
                                <FormFeedback>
                                    {this.state.errors.messages.farmName}
                                </FormFeedback>
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
