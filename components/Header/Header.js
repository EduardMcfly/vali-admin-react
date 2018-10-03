import React, { Component } from "react";
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle
} from "reactstrap";
import PropTypes from "prop-types";
import { I18n } from "react-i18next";
import HeaderDropdown from "./HeaderDropdown";

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
                <div
                    className="app-sidebarToggle jqvmap-region"
                    data-toggle="sidebar"
                    aria-label="Hide Sidebar"
                    onClick={this.props.toggleSidebarNav}
                />
                <a className="app-headerLogo" href="#farms">
                    Cosva
                </a>
                <ul className="app-nav">
                    <li className="app-search">
                        <input
                            className="app-searchInput"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button type="button" className="app-searchButton">
                            <i className="fa fa-search" />
                        </button>
                    </li>
                    <li className="dropdown">
                        <a
                            className="app-navItem"
                            href="#"
                            data-toggle="dropdown"
                            aria-label="Show notifications"
                        >
                            <i className="fa fa-bell-o fa-lg" />
                        </a>
                        <ul className="app-notification dropdown-menu dropdown-menu-right">
                            <li className="app-notificationTitle">
                                You have 4 new notifications.
                            </li>
                            <div className="app-notificationContent">
                                <li>
                                    <a
                                        className="app-notificationItem"
                                        href="javascript:;"
                                    >
                                        <span className="app-notificationIcon">
                                            <span className="fa-stack fa-lg">
                                                <i className="fa fa-circle fa-stack-2x text-primary" />
                                                <i className="fa fa-envelope fa-stack-1x fa-inverse" />
                                            </span>
                                        </span>
                                        <div>
                                            <p className="app-notificationMessage">
                                                Lisa sent you a mail
                                            </p>
                                            <p className="app-notificationMeta">
                                                2 min ago
                                            </p>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="app-notificationItem"
                                        href="javascript:;"
                                    >
                                        <span className="app-notificationIcon">
                                            <span className="fa-stack fa-lg">
                                                <i className="fa fa-circle fa-stack-2x text-danger" />
                                                <i className="fa fa-hdd-o fa-stack-1x fa-inverse" />
                                            </span>
                                        </span>
                                        <div>
                                            <p className="app-notificationMessage">
                                                Mail server not working
                                            </p>
                                            <p className="app-notificationMeta">
                                                5 min ago
                                            </p>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="app-notificationItem"
                                        href="javascript:;"
                                    >
                                        <span className="app-notificationIcon">
                                            <span className="fa-stack fa-lg">
                                                <i className="fa fa-circle fa-stack-2x text-success" />
                                                <i className="fa fa-money fa-stack-1x fa-inverse" />
                                            </span>
                                        </span>
                                        <div>
                                            <p className="app-notificationMessage">
                                                Transaction complete
                                            </p>
                                            <p className="app-notificationMeta">
                                                2 days ago
                                            </p>
                                        </div>
                                    </a>
                                </li>
                                <div className="app-notificationContent">
                                    <li>
                                        <a
                                            className="app-notificationItem"
                                            href="javascript:;"
                                        >
                                            <span className="app-notificationIcon">
                                                <span className="fa-stack fa-lg">
                                                    <i className="fa fa-circle fa-stack-2x text-primary" />
                                                    <i className="fa fa-envelope fa-stack-1x fa-inverse" />
                                                </span>
                                            </span>
                                            <div>
                                                <p className="app-notificationMessage">
                                                    Lisa sent you a mail
                                                </p>
                                                <p className="app-notificationMeta">
                                                    2 min ago
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="app-notificationItem"
                                            href="javascript:;"
                                        >
                                            <span className="app-notificationIcon">
                                                <span className="fa-stack fa-lg">
                                                    <i className="fa fa-circle fa-stack-2x text-danger" />
                                                    <i className="fa fa-hdd-o fa-stack-1x fa-inverse" />
                                                </span>
                                            </span>
                                            <div>
                                                <p className="app-notificationMessage">
                                                    Mail server not working
                                                </p>
                                                <p className="app-notificationMeta">
                                                    5 min ago
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="app-notificationItem"
                                            href="javascript:;"
                                        >
                                            <span className="app-notificationIcon">
                                                <span className="fa-stack fa-lg">
                                                    <i className="fa fa-circle fa-stack-2x text-success" />
                                                    <i className="fa fa-money fa-stack-1x fa-inverse" />
                                                </span>
                                            </span>
                                            <div>
                                                <p className="app-notificationMessage">
                                                    Transaction complete
                                                </p>
                                                <p className="app-notificationMeta">
                                                    2 days ago
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                </div>
                            </div>
                            <li className="app-notificationFooter">
                                <a href="#">See all notifications.</a>
                            </li>
                        </ul>
                    </li>
                    <HeaderDropdown {...this.props}/>
                </ul>
            </React.Fragment>
        );
    }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
