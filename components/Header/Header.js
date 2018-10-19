import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "react-router-dom/Link";
import { HeaderSearch, HeaderDropdown } from "./components";
import { AutenticateRender } from "../../controllers";

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
                <Link
                    className="app-headerLogo"
                    to={
                        this.props.userAuth.authenticatedState()
                            ? "/farms"
                            : "/home"
                    }
                >
                    Cosva
                </Link>
                <ul className="app-nav">
                    <AutenticateRender
                        authenticatedState={this.props.userAuth.authenticatedState()}
                        children={
                            <React.Fragment>
                                <HeaderSearch {...this.props} />
                            </React.Fragment>
                        }
                    />
                    <HeaderDropdown {...this.props} />
                </ul>
            </React.Fragment>
        );
    }
}

DefaultHeader.propTypes = {
    children: PropTypes.node
};
DefaultHeader.defaultProps = {};

export default DefaultHeader;
