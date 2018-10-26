import React, { Component } from "react";
import {
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    FormFeedback
} from "reactstrap";
import classNames from "classnames";
import PropTypes from "prop-types";
/* import { RenderRoute } from "../../../../controllers"; */

class ResgisterUser extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { props } = this;
        return (
            <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                    <InputGroupText
                        className={"d-flex justify-content-center"}
                        style={{ width: "40px" }}
                    >
                        <i className={props.icon} />
                    </InputGroupText>
                </InputGroupAddon>
                <Input
                    type={props.type}
                    className={classNames(
                        {
                            "is-invalid": props.classError
                        },
                        props.className
                    )}
                    placeholder={props.placeholder}
                    autoComplete={props.autoComplete}
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange}
                />
                <FormFeedback>{props.errorMessage}</FormFeedback>
            </InputGroup>
        );
    }
}

ResgisterUser.propTypes = {
    type: PropTypes.string,
    icon: PropTypes.string,
    classError: PropTypes.bool,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    autoComplete: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
};

ResgisterUser.defaultProps = {
    type: "text",
    icon: "",
    classError: false,
    className: "",
    placeholder: "",
    autoComplete: "",
    errorMessage: ""
};

export default ResgisterUser;
