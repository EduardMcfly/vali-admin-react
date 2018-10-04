import React, { Component } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { I18n } from 'react-i18next';
import { AutenticateRender } from '../../../../controllers';
import { ElemntsNotificationsDropDown } from './components';

class HeaderDropdownNotifications extends Component {
    constructor(props) {
        super(props);
        this.toggleNotificationsDropDown = this.toggleNotificationsDropDown.bind(this);
        this.notificationsGet = this.notificationsGet.bind(this);
        this.state = {
            notificationsDropdownOpen: false,
            elementsNotifications: false,
        };
    }
    toggleNotificationsDropDown() {
        this.setState(prevState => ({
            notificationsDropdownOpen: !prevState.notificationsDropdownOpen,
        }));
    }

    componentDidMount() {
        this.notificationsGet();
    }

    notificationsGet() {
        var andres = [
            {
                message: 'Hola',
                time: 234343,
            },
            {
                message: 'Yiejfdn jnsd',
                time: 332,
            },
            {
                message: 'dsgrsdsd',
                time: 323,
            },
            {
                message: 'Hola',
                time: 233,
            },
            {
                message: 'Hola',
                time: 2432,
            },
        ];
        var eduard = andres.map((obj, key) => {
            return <ElemntsNotificationsDropDown key={key} message={obj.message} time={obj.time} />;
        });
        this.setState({
            elementsNotifications: eduard,
        });
    }
    render() {
        const authenticatedState = this.props.userAuth.authenticatedState();
        return (
            <AutenticateRender
                authenticatedState={true}
                children={
                    <Dropdown isOpen={this.state.notificationsDropdownOpen} toggle={this.toggleNotificationsDropDown}>
                        <li className="dropdown" />
                        <DropdownToggle
                            tag="div"
                            className={'app-navItem c-pointer'}
                            aria-expanded={this.state.notificationsDropdownOpen}
                            aria-label="Show notifications"
                        >
                            <i className="fa fa-bell-o fa-lg" />
                        </DropdownToggle>
                        <I18n ns="header">
                            {(t, { i18n }) => (
                                <DropdownMenu tag={'ul'} className="app-notification dropdown-menu dropdown-menu-right">
                                    <li className="app-notificationTitle">You have 4 new notifications.</li>
                                    <div className="app-notificationContent">
                                        {this.state.elementsNotifications}
                                        <li>
                                            <a className="app-notificationItem" href="javascript:;">
                                                <span className="app-notificationIcon">
                                                    <span className="fa-stack fa-lg">
                                                        <i className="fa fa-circle fa-stack-2x text-primary" />
                                                        <i className="fa fa-envelope fa-stack-1x fa-inverse" />
                                                    </span>
                                                </span>
                                                <div>
                                                    <p className="app-notificationMessage">Lisa sent you a mail</p>
                                                    <p className="app-notificationMeta">2 min ago</p>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="app-notificationItem" href="javascript:;">
                                                <span className="app-notificationIcon">
                                                    <span className="fa-stack fa-lg">
                                                        <i className="fa fa-circle fa-stack-2x text-danger" />
                                                        <i className="fa fa-hdd-o fa-stack-1x fa-inverse" />
                                                    </span>
                                                </span>
                                                <div>
                                                    <p className="app-notificationMessage">Mail server not working</p>
                                                    <p className="app-notificationMeta">5 min ago</p>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="app-notificationItem" href="javascript:;">
                                                <span className="app-notificationIcon">
                                                    <span className="fa-stack fa-lg">
                                                        <i className="fa fa-circle fa-stack-2x text-success" />
                                                        <i className="fa fa-money fa-stack-1x fa-inverse" />
                                                    </span>
                                                </span>
                                                <div>
                                                    <p className="app-notificationMessage">Transaction complete</p>
                                                    <p className="app-notificationMeta">2 days ago</p>
                                                </div>
                                            </a>
                                        </li>
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
