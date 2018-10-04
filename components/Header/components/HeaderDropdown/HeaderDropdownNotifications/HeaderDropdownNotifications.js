import React, { Component } from "react";
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle
} from "reactstrap";
import { I18n } from "react-i18next";
import { AutenticateRender } from "../../../../../controllers";
import { ElemntsNotificationsDropDown } from "./components";

class HeaderDropdownNotifications extends Component {
    constructor(props) {
        super(props);
        this.toggleNotificationsDropDown = this.toggleNotificationsDropDown.bind(
            this
        );
        this.notificationsGet = this.notificationsGet.bind(this);
        this.state = {
            notificationsDropdownOpen: false,
            elementsNotifications: false
        };
    }
    toggleNotificationsDropDown() {
        this.setState(prevState => ({
            notificationsDropdownOpen: !prevState.notificationsDropdownOpen
        }));
    }

    componentDidMount() {
        this.notificationsGet();
    }

    notificationsGet() {
        var andres = [
            { message: "Tienes un mensaje de andres", time: 234343 },
            {
                message: "Yiejfdn jnsd",
                time: 332,
                icon: "fa-hdd-o",
                color: "text-danger"
            },
            { message: "dsgrsdsd", time: 323, color: "text-warning" },
            { message: "Hola", time: 59 },
            { message: "Hola", time: 2432 }
        ];
        var notifications = andres.map((obj, key) => {
            return (
                <ElemntsNotificationsDropDown
                    key={key}
                    message={obj.message}
                    time={obj.time}
                    icon={obj.icon}
                    color={obj.color}
                />
            );
        });
        this.setState({
            elementsNotifications: notifications
        });
    }
    render() {
        const authenticatedState = this.props.userAuth.authenticatedState();
        return (
            <AutenticateRender
                authenticatedState={authenticatedState}
                children={
                    <Dropdown
                        isOpen={this.state.notificationsDropdownOpen}
                        toggle={this.toggleNotificationsDropDown}
                    >
                        <li className="dropdown" />
                        <DropdownToggle
                            tag="div"
                            className={"app-navItem c-pointer"}
                            aria-expanded={this.state.notificationsDropdownOpen}
                            aria-label="Show notifications"
                        >
                            <i className="fa fa-bell-o fa-lg" />
                        </DropdownToggle>
                        <I18n ns="header">
                            {(t, { i18n }) => (
                                <DropdownMenu
                                    tag={"ul"}
                                    className="app-notification dropdown-menu dropdown-menu-right"
                                >
                                    <li className="app-notificationTitle">
                                        You have 4 new notifications.
                                    </li>
                                    <div className="app-notificationContent">
                                        {this.state.elementsNotifications}
                                    </div>
                                    <li className="app-notificationFooter">
                                        <a href="#">See all notifications.</a>
                                    </li>
                                </DropdownMenu>
                            )}
                        </I18n>
                    </Dropdown>
                }
            />
        );
    }
}

export default HeaderDropdownNotifications;
