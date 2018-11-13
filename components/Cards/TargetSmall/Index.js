import React from "react";
import PropTypes from "prop-types";
import { I18n } from "react-i18next";
import { Col, Container } from "reactstrap";
import classNames from "classnames";
import { MessagesTranslate } from "../../";
class TargetSmall extends React.Component {
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
            cPointer
        } = this.props;
        return (
            <div
                className={"widget-small primary coloured-icon mb-0 c-pointer "}
                style={{
                    borderRadius: 1 + "em"
                }}
                onClick={onClick}
            >
                {icon ? (
                    <a className={"my-auto"}>
                        <i
                            className={classNames(
                                "icon fa p-1",
                                iconType,
                                iconSize,
                                iconPosition
                            )}
                            style={{
                                backgroundColor: "#ffd404",
                                textTransform: "unset",
                                minWidth: "unset",
                                borderRadius: 0.8 + "rem"
                            }}
                        />
                    </a>
                ) : null}
                <Container
                    className={"d-flex align-items-center text-truncate"}
                >
                    <div
                        className={classNames(
                            "info text-center p-0",
                            sizeText,
                            fontWeight
                        )}
                    >
                        <MessagesTranslate type={title} ns={ns} />
                    </div>
                </Container>
            </div>
        );
    }
}

TargetSmall.propTypes = {
    title: PropTypes.string.isRequired
};

TargetSmall.defaultProps = {
    onClick: () => {},
    icon: true,
    sizeText: "h4",
    fontWeight: "font-weight-light",
    cPointer: true,
    iconSize: "fa-2x",
    iconType: "fa-pencil-square",
    iconPosition: "d-block",
    ns: "general"
};
export default TargetSmall;
