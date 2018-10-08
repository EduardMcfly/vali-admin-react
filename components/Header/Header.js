import React, { Component } from "react";
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle
} from "reactstrap";
import PropTypes from "prop-types";
import { I18n } from "react-i18next";
import Link from "react-router-dom/Link";
import { HeaderSearch, HeaderDropdown } from "./components";
import { AutenticateRender } from "../../controllers";

const propTypes = {
    children: PropTypes.node
};

const defaultProps = {};

class DefaultHeader extends Component {
    constructor(props) {
        super(props);
        this.toggleUserDropDown = this.toggleUserDropDown.bind(this);
        this.state = {
            userDropdownOpen: false
        };
    }

    toggleUserDropDown() {
        this.setState(prevState => ({
            userDropdownOpen: !prevState.userDropdownOpen
        }));
    }

    render() {
        const { children, ...attributes } = this.props;

        return (
            <React.Fragment>
                <Link
                    className="app-headerLogo"
                    to={
                        this.props.userAuth.authenticatedState()
                            ? "/farm"
                            : "/home"
                    }
                >
                    Cosva
                </Link>
                <AutenticateRender
                    authenticatedState={this.props.userAuth.authenticatedState()}
                    children={
                        <React.Fragment>
                            <div
                                className="app-sidebarToggle jqvmap-region"
                                data-toggle="sidebar"
                                aria-label="Hide Sidebar"
                                onClick={this.props.toggleSidebarNav}
                            />
                        </React.Fragment>
                    }
                />
                <AutenticateRender
                    authenticatedState={this.props.userAuth.authenticatedState()}
                    children={
                        <React.Fragment>
                            <HeaderSearch {...this.props} />
                        </React.Fragment>
                    }
                />
                <HeaderDropdown {...this.props} />
            </React.Fragment>
        );
    }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
