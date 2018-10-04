import React, { Component } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import PropTypes from 'prop-types';
import { I18n } from 'react-i18next';
import HeaderDropdown from './HeaderComponents/HeaderDropdown';

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
    constructor(props) {
        super(props);
        this.toggleUserDropDown = this.toggleUserDropDown.bind(this);
        this.state = {
            userDropdownOpen: false,
        };
    }

    toggleUserDropDown() {
        this.setState(prevState => ({
            userDropdownOpen: !prevState.userDropdownOpen,
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
                <HeaderDropdown {...this.props} />
            </React.Fragment>
        );
    }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
