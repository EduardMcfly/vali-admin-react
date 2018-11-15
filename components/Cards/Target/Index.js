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
        const { props } = this;
        const {
            title,
            onClick,
            icon,
            iconSize,
            iconType,
            iconNode,
            iconPosition,
            ns,
            sizeText,
            fontWeight,
            cPointer,
            ...rest
        } = props;
        return (
            <div
                className={classNames("tile", cPointer ? "c-pointer" : "")}
                onClick={() => onClick()}
            >
                <div className={classNames("text-truncate", sizeText)}>
                    {icon ? (
                        !iconNode ? (
                            <i
                                className={classNames(
                                    "fa",
                                    iconSize,
                                    iconType,
                                    iconPosition
                                )}
                                aria-hidden="true"
                            />
                        ) : (
                            iconNode
                        )
                    ) : null}
                </div>
                <div
                    className={classNames(
                        "tile-body text-truncate",
                        sizeText,
                        fontWeight
                    )}
                >
                    <span>
                        <MessagesTranslate type={title} ns={ns} />
                    </span>
                </div>
            </div>
        );
    }
}

Target.propTypes = {
    title: PropTypes.string.isRequired,
    iconNode: PropTypes.node
};

Target.defaultProps = {
    onClick: () => {},
    icon: true,
    sizeText: "h4",
    fontWeight: "font-weight-light",
    cPointer: true,
    iconNode: false,
    iconSize: "fa-3x",
    iconType: "fa-inbox",
    iconPosition: "d-block",
    ns: "general"
};
export default Target;
