import React, { Component } from "react";

import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle
} from "reactstrap";
import PropTypes from "prop-types";
import { I18n } from "react-i18next";

class HeaderDropdown extends Component {
    constructor(props) {
        super(props);
        console.log(this.props, 332132113);
        this.toggleUserDropDown = this.toggleUserDropDown.bind(this);
        this.logoutSession = this.logoutSession.bind(this);
        this.dropAccnt = this.dropAccnt.bind(this);
        this.items = this.items.bind(this);
        this.state = {
            userDropdownOpen: false
        };
    }

    logoutSession() {
        axios({ method: "get", url: "./logout" })
            .then(result => {
                if (!AxiosStore.validate()) {
                    this.props.userAuthLogout();
                }
            })
            .catch(err => {});
    }
    toggleUserDropDown() {
        this.setState(prevState => ({
            userDropdownOpen: !prevState.userDropdownOpen
        }));
    }
    items(t) {
        if (this.props.userAuth.authenticatedState()) {
            return (
                <DropdownItem>
                    <i className="fa fa-user fa-lg" />
                    {t("profile")}
                </DropdownItem>
            );
        }
    }

    dropAccnt() {
        return (
            <Dropdown
                isOpen={this.state.userDropdownOpen}
                toggle={this.toggleUserDropDown}
            >
                <DropdownToggle
                    tag="div"
                    className={"app-navItem c-pointer"}
                    aria-expanded={this.state.userDropdownOpen}
                >
                    <i className="fa fa-user fa-lg" />
                </DropdownToggle>
                <I18n ns="header">
                    {(t, { i18n }) => (
                        <DropdownMenu>
                            {this.items(t)}
                            <DropdownItem>
                                <i className="fa fa-user fa-lg" />
                                {t("profile")}
                            </DropdownItem>
                            <DropdownItem>
                                <i className="fa fa-cog fa-lg" />
                                {t("config")}
                            </DropdownItem>
                            <DropdownItem
                                onClick={() => i18n.changeLanguage("es")}
                            >
                                <i className="fa fa-language fa-lg" />
                                Español
                            </DropdownItem>
                            <DropdownItem
                                onClick={() => i18n.changeLanguage("en")}
                            >
                                <i className="fa fa-language fa-lg" />
                                English
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={this.logoutSession}>
                                <i className="fa fa-sign-out fa-lg" />
                                {t("exit")}
                            </DropdownItem>
                        </DropdownMenu>
                    )}
                </I18n>
            </Dropdown>
        );
    }

    render() {
        return this.dropAccnt();
    }
}

export default HeaderDropdown;
