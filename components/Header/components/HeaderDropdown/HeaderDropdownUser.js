import React, { Component } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { I18n } from 'react-i18next';
import { RenderChildren } from '../../../../controllers';
 import axios from "axios";
class HeaderDropdownUser extends Component {
    constructor(props) {
        super(props);
        this.toggleUserDropDown = this.toggleUserDropDown.bind(this);
        this.logoutSession = this.logoutSession.bind(this);
        this.state = {
            userDropdownOpen: false,
        };
    }

    logoutSession() {
        axios({ method: 'post', url: './logout' })
            .then(res => {
                if (typeof res.data.success !== 'undefined') {
                    this.props.userAuthLogout();
                }
            })
            .catch(err => {});
    }
    toggleUserDropDown() {
        this.setState(prevState => ({
            userDropdownOpen: !prevState.userDropdownOpen,
        }));
    }
    render() {
        const authenticatedState = this.props.userAuth.authenticatedState();
        return (
            <Dropdown isOpen={this.state.userDropdownOpen} toggle={this.toggleUserDropDown}>
                <DropdownToggle
                    tag="div"
                    className={'app-navItem c-pointer'}
                    aria-expanded={this.state.userDropdownOpen}
                >
                    <i className="fa fa-user fa-lg" />
                </DropdownToggle>
                <I18n ns="header">
                    {(t, { i18n }) => (
                        <DropdownMenu>
                            <RenderChildren
                                state={authenticatedState}
                                children={
                                    <DropdownItem>
                                        <i className="fa fa-user fa-lg" />
                                        {t('profile')}
                                    </DropdownItem>
                                }
                            />
                            <RenderChildren
                                state={authenticatedState}
                                children={
                                    <DropdownItem>
                                        <i className="fa fa-cog fa-lg" />
                                        {t('config')}
                                    </DropdownItem>
                                }
                            />
                            <DropdownItem onClick={() => i18n.changeLanguage('es')}>
                                <i className="fa fa-language fa-lg" />
                                Español
                            </DropdownItem>
                            <DropdownItem onClick={() => i18n.changeLanguage('en')}>
                                <i className="fa fa-language fa-lg" />
                                English
                            </DropdownItem>
                            <RenderChildren
                                state={authenticatedState}
                                children={
                                    <React.Fragment>
                                        <DropdownItem divider />
                                        <DropdownItem onClick={this.logoutSession}>
                                            <i className="fa fa-sign-out fa-lg" />
                                            {t('exit')}
                                        </DropdownItem>
                                    </React.Fragment>
                                }
                            />
                        </DropdownMenu>
                    )}
                </I18n>
            </Dropdown>
        );
    }
}

export default HeaderDropdownUser;
