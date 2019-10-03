import React, { Component } from "react";
import HeaderDropdownUser from "./HeaderDropdownUser";
import HeaderDropdownNotifications from "./HeaderDropdownNotifications/HeaderDropdownNotifications";

class HeaderDropdown extends Component {
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
        return (
            <React.Fragment>
                <HeaderDropdownNotifications {...this.props} />
                <HeaderDropdownUser {...this.props} />
            </React.Fragment>
        );
    }
}

export default HeaderDropdown;
