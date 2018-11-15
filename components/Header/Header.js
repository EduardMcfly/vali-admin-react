import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "react-router-dom/Link";
import { HeaderSearch, HeaderDropdown } from "./components";
import { RenderChildren } from "../../controllers";

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
                <RenderChildren
                    state={this.props.userAuth.authenticatedState()}
                    children={
                            <div 
                                className="app-navItem c-pointer" 
                                onClick={this.props.toggleSidebarNav}
                            >
                                <i 
                                    className="fa fa-lg fa-reorder"
                                    data-toggle="sidebar"
                                    aria-label="Hide Sidebar"
                                />
                            </div>
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
                    <RenderChildren
                        state={this.props.userAuth.authenticatedState()}
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
