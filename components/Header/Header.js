import React, { Component } from "react";
import {
    Badge,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    NavItem,
    NavLink
} from "reactstrap";
import PropTypes from "prop-types";
import { I18n, Trans } from "react-i18next";

const propTypes = {
    children: PropTypes.node
};

const defaultProps = {};

class DefaultHeader extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { children, ...attributes } = this.props;

        return (
            <React.Fragment>
                <div
                    className="app-sidebar__toggle jqvmap-region"
                    data-toggle="sidebar"
                    aria-label="Hide Sidebar"
                    onClick={this.props.toggleAsideNav}
                />
                <a className="app-header__logo" href="#farms">
                    Cosva
                </a>
                <ul className="app-nav">
                    <li className="app-search">
                        <input
                            className="app-search__input"
                            type="search"
                            placeholder="Search"
                        />
                        <button className="app-search__button">
                            <i className="fa fa-search" />
                        </button>
                    </li>
                    <li className="dropdown">
                        <a
                            className="app-nav__item"
                            href="#"
                            data-toggle="dropdown"
                            aria-label="Show notifications"
                        >
                            <i className="fa fa-bell-o fa-lg" />
                        </a>
                        <ul className="app-notification dropdown-menu dropdown-menu-right">
                            <li className="app-notification__title">
                                You have 4 new notifications.
                            </li>
                            <div className="app-notification__content">
                                <li>
                                    <a
                                        className="app-notification__item"
                                        href="javascript:;"
                                    >
                                        <span className="app-notification__icon">
                                            <span className="fa-stack fa-lg">
                                                <i className="fa fa-circle fa-stack-2x text-primary" />
                                                <i className="fa fa-envelope fa-stack-1x fa-inverse" />
                                            </span>
                                        </span>
                                        <div>
                                            <p className="app-notification__message">
                                                Lisa sent you a mail
                                            </p>
                                            <p className="app-notification__meta">
                                                2 min ago
                                            </p>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="app-notification__item"
                                        href="javascript:;"
                                    >
                                        <span className="app-notification__icon">
                                            <span className="fa-stack fa-lg">
                                                <i className="fa fa-circle fa-stack-2x text-danger" />
                                                <i className="fa fa-hdd-o fa-stack-1x fa-inverse" />
                                            </span>
                                        </span>
                                        <div>
                                            <p className="app-notification__message">
                                                Mail server not working
                                            </p>
                                            <p className="app-notification__meta">
                                                5 min ago
                                            </p>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="app-notification__item"
                                        href="javascript:;"
                                    >
                                        <span className="app-notification__icon">
                                            <span className="fa-stack fa-lg">
                                                <i className="fa fa-circle fa-stack-2x text-success" />
                                                <i className="fa fa-money fa-stack-1x fa-inverse" />
                                            </span>
                                        </span>
                                        <div>
                                            <p className="app-notification__message">
                                                Transaction complete
                                            </p>
                                            <p className="app-notification__meta">
                                                2 days ago
                                            </p>
                                        </div>
                                    </a>
                                </li>
                                <div className="app-notification__content">
                                    <li>
                                        <a
                                            className="app-notification__item"
                                            href="javascript:;"
                                        >
                                            <span className="app-notification__icon">
                                                <span className="fa-stack fa-lg">
                                                    <i className="fa fa-circle fa-stack-2x text-primary" />
                                                    <i className="fa fa-envelope fa-stack-1x fa-inverse" />
                                                </span>
                                            </span>
                                            <div>
                                                <p className="app-notification__message">
                                                    Lisa sent you a mail
                                                </p>
                                                <p className="app-notification__meta">
                                                    2 min ago
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="app-notification__item"
                                            href="javascript:;"
                                        >
                                            <span className="app-notification__icon">
                                                <span className="fa-stack fa-lg">
                                                    <i className="fa fa-circle fa-stack-2x text-danger" />
                                                    <i className="fa fa-hdd-o fa-stack-1x fa-inverse" />
                                                </span>
                                            </span>
                                            <div>
                                                <p className="app-notification__message">
                                                    Mail server not working
                                                </p>
                                                <p className="app-notification__meta">
                                                    5 min ago
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="app-notification__item"
                                            href="javascript:;"
                                        >
                                            <span className="app-notification__icon">
                                                <span className="fa-stack fa-lg">
                                                    <i className="fa fa-circle fa-stack-2x text-success" />
                                                    <i className="fa fa-money fa-stack-1x fa-inverse" />
                                                </span>
                                            </span>
                                            <div>
                                                <p className="app-notification__message">
                                                    Transaction complete
                                                </p>
                                                <p className="app-notification__meta">
                                                    2 days ago
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                </div>
                            </div>
                            <li className="app-notification__footer">
                                <a href="#">See all notifications.</a>
                            </li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <a
                            className="app-nav__item"
                            href="#"
                            data-toggle="dropdown"
                            aria-label="Open Profile Menu"
                        >
                            <i className="fa fa-user fa-lg" />
                        </a>
                        <I18n ns="header">
                            {(t, { i18n }) => (
                                <ul className="dropdown-menu settings-menu dropdown-menu-right">
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            href="{{ route('login') }}"
                                        >
                                            <i className="fa fa-cog fa-lg" />
                                            {t("config")}
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            href="{{ route('login') }}"
                                        >
                                            <i className="fa fa-user fa-lg" />
                                            {t("profile")}
                                        </a>
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            onClick={() =>
                                                i18n.changeLanguage("es")
                                            }
                                        >
                                            <i className="fa fa-language fa-lg" />
                                            Español
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            onClick={() =>
                                                i18n.changeLanguage("en")
                                            }
                                        >
                                            <i className="fa fa-language fa-lg" />
                                            English
                                        </button>
                                    </li>
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            href="{{ route('logout') }}"
                                        >
                                            <i className="fa fa-sign-out fa-lg" />
                                            {t("exit")}
                                        </a>
                                    </li>
                                </ul>
                            )}
                        </I18n>
                    </li>
                </ul>
            </React.Fragment>
        );
    }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
