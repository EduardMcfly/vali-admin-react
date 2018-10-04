import React, { Component } from 'react';

import { Button } from 'reactstrap';
import HeaderDropdownUser from './HeaderDropdownUser';
import HeaderDropdownNotifications from './HeaderDropdownNotifications/HeaderDropdownNotifications';

class HeaderDropdown extends Component {
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
        return (
            <ul className="app-nav">
                <li className="app-search">
                    <input className="app-searchInput" type="search" placeholder="Search"/>
                    <Button className="app-searchButton" aria-label="Search Button">
                        <i className="fa fa-search" />
                    </Button>
                </li>
                <HeaderDropdownNotifications {...this.props} />
                <HeaderDropdownUser {...this.props} />
            </ul>
        );
    }
}

export default HeaderDropdown;
