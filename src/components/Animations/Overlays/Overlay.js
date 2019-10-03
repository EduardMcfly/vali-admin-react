import React, { Component } from "react";
import {
    Input,
    FormFeedback,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from "reactstrap";
import PropTypes from "prop-types";
import CircleAnimation from "../Circles/CircleAnimation";
import classNames from "classnames";

class Overlay extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { props } = this;
        return (
            <div
                className={classNames(
                    {
                        "d-none": props.state === false
                    },
                    "overlay"
                )}
            >
                <CircleAnimation width={props.width} />
            </div>
        );
    }
}

Overlay.defaultProps = {
    state: false,
    width: "70px"
};

export default Overlay;
