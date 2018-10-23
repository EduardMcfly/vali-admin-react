import React, { Component } from "react";
import {
    Input,
    FormFeedback,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
} from "reactstrap";
import { I18n } from "react-i18next";
import classNames from "classnames";

class EmailInput extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <I18n ns="register">
                {(t, { i18n }) => (
                    <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fa fa-user" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input
                            className={classNames({
                                "is-invalid": this.props.emailError
                            })}
                            type="text"
                            placeholder={t("emailTitle")}
                            autoComplete="email"
                            name="email"
                            value={this.props.value}
                            onChange={(e) => {
                                this.props.setInputs(e)
                                if (this.props.emailError) {
                                    this.props.resetErrosInputs()
                                }
                            }}
                        />
                        <FormFeedback>
                            {this.props.emailError}
                        </FormFeedback>
                    </InputGroup>
                )}
            </I18n>
        );
    }
}
export default EmailInput;
