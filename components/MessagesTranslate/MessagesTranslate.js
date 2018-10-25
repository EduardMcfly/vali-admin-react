import React, { Component } from "react";
import { I18n } from "react-i18next";
import PropTypes from "prop-types";

class MessagesTranslate extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { props } = this;
        return (
            <I18n ns={[props.ns]}>
                {t =>
                    t(props.type, {
                        attribute: props.attribute
                    })
                }
            </I18n>
        );
    }
}

MessagesTranslate.propTypes = {
    ns: PropTypes.string,
    attribute: PropTypes.string,
    type: PropTypes.string.isRequired
};

MessagesTranslate.defaultProps = {
    ns: "validations",
    attribute: ""
};

export default MessagesTranslate;
