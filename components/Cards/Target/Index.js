import React from "react";
import PropTypes from "prop-types";
import { I18n } from "react-i18next";
import { Col } from "reactstrap";
import classNames from "classnames";
import { MessagesTranslate } from "../../";
class Target extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            title,
            onClick,
            icon,
            iconSize,
            iconType,
            iconPosition,
            ns,
            sizeText,
            fontWeight,
            cPointer,
            ...rest
        } = this.props;
        return (
            <div
                className={classNames("tile", cPointer ? "c-pointer" : "")}
                onClick={() => onClick()}
            >
                <div
                    className={classNames(
                        "tile-body text-truncate",
                        sizeText,
                        fontWeight
                    )}
                >
                    {icon ? (
                        <i
                            className={classNames(
                                "fa",
                                iconSize,
                                iconType,
                                iconPosition
                            )}
                            aria-hidden="true"
                        />
                    ) : null}
                    <span>
                        <MessagesTranslate type={title} ns={ns} />
                    </span>
                </div>
            </div>
        );
    }
}

Target.propTypes = {
    title: PropTypes.string.isRequired
};

Target.defaultProps = {
    onClick: () => {},
    icon: true,
    sizeText: "h4",
    fontWeight: "font-weight-light",
    cPointer: true,
    iconSize: "fa-3x",
    iconType: "fa-inbox",
    iconPosition: "d-block",
    ns: "general"
};
export default Target;
