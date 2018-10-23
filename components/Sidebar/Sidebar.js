import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { TextCharge } from '..';
import { Badge, NavLink as RsNavLink } from 'reactstrap';
import classNames from 'classnames';
import { AddFarm } from '..';
import { I18n } from 'react-i18next';
import nav from './_nav';
import axios from 'axios';
import { AxiosStore } from '../../app-utilities';


class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            personName: <TextCharge />,
            isMounted: false,
            description: <TextCharge />,
            farmsList: <TextCharge />,
            treeviewTab: 0,
        };
        this.activeRoute = this.activeRoute.bind(this);
        this.getInfoUser = this.getInfoUser.bind(this);
        this.getlistFarms = this.getlistFarms.bind(this);
        this.treeview = this.treeview.bind(this);
        this.farmsListBuild = this.farmsListBuild.bind(this);
    }

    componentDidMount() {
        this.setState({ isMounted: true });
        this.getInfoUser();
        this.getlistFarms();
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    treeview(tab) {
        if (this.state.treeviewTab !== tab) {
            this.setState({ treeviewTab: tab });
        } else {
            this.setState({ treeviewTab: 0 });
        }
    }

    async getInfoUser() {
        axios({
            method: 'post',
            url: './infoUser',
        })
            .then(res => {
                if (!AxiosStore.validate('infoUser')) {
                    var user = AxiosStore.set('infoUser', res.data.user['0']);
                } else {
                    var user = AxiosStore.get('infoUser');
                }
                if (this.state.isMounted) {
                    this.setState({
                        personName: user['0'] + ' ' + user['1'],
                        description: user['2'],
                    });
                }
            })
            .catch(res => {
                setTimeout(() => {
                    this.getInfoUser();
                }, 4000);
            });
    }

    async getlistFarms() {
        axios({ method: 'post', url: './listFarms' })
            .then(res => {
                if (AxiosStore.validate('listFarms')) {
                    var listFarms = AxiosStore.get('listFarms');
                } else {
                    var listFarms = AxiosStore.set('listFarms', res.data[0]);
                }
                if (this.state.isMounted) {
                    this.setState({
                        farmsList: this.buildListFarms(listFarms),
                    });
                }
            })
            .catch(error => {
                setTimeout(() => {
                    this.getlistFarms();
                }, 4000);
            });
    }

    buildListFarms(response) {
        return response.map((farm, i) => this.farmsListBuild(farm, i));
    }

    activeRoute(routeName, props) {
        // return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
        return props.location.pathname.indexOf(routeName) > -1 ? 'treeview is-expanded' : 'treeview';
    }

    farmsListBuild(response, key) {
        return (
            <NavLink key={key} to={'/farm/' + response[0]} activeClassName="active" className={'treeview-item'}>
                <i className={'icon fa fa-circle-o'} />
                {response[1]}
            </NavLink>
        );
    }
    render() {
        const props = this.props;

        // badge addon to NavItem
        const badge = badge => {
            if (badge) {
                const classes = classNames(badge.class);
                return (
                    <Badge className={classes} color={badge.variant}>
                        {badge.text}
                    </Badge>
                );
            }
        };

        // simple wrapper for nav-title item
        const wrapper = item => {
            return item.wrapper && item.wrapper.element
                ? React.createElement(item.wrapper.element, item.wrapper.attributes, item.name)
                : item.name;
        };

        // nav list section title
        const title = (title, key) => {
            const classes = classNames('app-menuItem p-1 pl-2', title.class);
            return (
                <li key={key} className="treeview">
                    <div key={key} className={classes}>
                        <span className="app-menuLabel">{wrapper(title)}</span>
                    </div>
                </li>
            );
        };

        // nav list divider
        const divider = (divider, key) => {
            const classes = classNames('divider', divider.class);
            return <li key={key} className={classes} />;
        };

        // nav label with nav link
        const navLabel = (item, key) => {
            const classes = {
                item: classNames('hidden-cn', item.class),
                link: classNames('nav-label', item.class ? item.class : ''),
                icon: classNames(
                    !item.icon ? 'fa fa-circle' : item.icon,
                    item.label.variant ? `text-${item.label.variant}` : '',
                    item.label.class ? item.label.class : ''
                ),
            };
            return navLink(item, key, classes);
        };

        // nav item with nav link
        const navItem = (item, key) => {
            const classes = {
                item: classNames(item.class),
                link: classNames('treeview-item', item.variant ? `treeview-item-${item.variant}` : ''),
                icon: classNames('app-menuIcon fa ' + item.icon),
            };
            return navLink(item, key, classes);
        };

        // nav link
        const navLink = (item, key, classes) => {
            const url = item.url ? item.url : '';
            return (
                <li key={key}>
                    <I18n ns="sideBar">
                        {(t, { i18n }) => (
                            <React.Fragment>
                                {isExternal(url) ? (
                                    <RsNavLink href={url} className={classes.link}>
                                        <i className={classes.icon} />
                                        {t(item.name)}
                                        {badge(item.badge)}
                                    </RsNavLink>
                                ) : (
                                    <NavLink to={url} activeClassName="active" className={classes.link}>
                                        <i className={classes.icon} />
                                        {t(item.name)}
                                        {badge(item.badge)}
                                    </NavLink>
                                )}
                            </React.Fragment>
                        )}
                    </I18n>
                </li>
            );
        };
        // nav link
        const navLinkOnly = (item, key, classes) => {
            const url = item.url ? item.url : '';
            return (
                <li key={key}>
                    <I18n ns="sideBar">
                        {(t, { i18n }) => (
                            <React.Fragment>
                                {isExternal(url) ? (
                                    <RsNavLink href={url} className={classes.link}>
                                        <i className={classes.icon} />
                                        <span className="app-menuLabel">{t(item.name)}</span>
                                        {badge(item.badge)}
                                    </RsNavLink>
                                ) : (
                                    <NavLink to={url} activeClassName="active" className={classes.link}>
                                        <i className={classes.icon} />
                                        <span className="app-menuLabel">
                                            {t(item.name)}
                                            {badge(item.badge)}
                                        </span>
                                    </NavLink>
                                )}
                            </React.Fragment>
                        )}
                    </I18n>
                </li>
            );
        };

        // nav item Only with nav link
        const navItemOnly = (item, key) => {
            const classes = {
                item: classNames(item.class),
                link: classNames('app-menuItem', item.variant ? `treeview-item-${item.variant}` : ''),
                icon: classNames('app-menuIcon fa ' + item.icon),
            };
            return navLinkOnly(item, key, classes);
        };

        // nav dropdown
        const navDropdown = (item, key) => {
            return (
                <li
                    key={key}
                    className={classNames(
                        {
                            'is-expanded': this.state.treeviewTab === item.treeview,
                        },
                        this.activeRoute(item.url, props)
                    )}
                    onClick={async () => {
                        this.treeview(item.treeview);
                    }}
                >
                    <div className="app-menuItem c-pointer">
                        <i className={classNames('app-menuIcon fa', item.icon)} />
                        <I18n ns="sideBar">{t => <span className="app-menuLabel">{t(item.name)}</span>}</I18n>
                        <i className="treeview-indicator fa fa-angle-right" />
                    </div>
                    <ul className="treeview-menu">{navList(item.children)}</ul>
                </li>
            );
        };

        // nav type
        const navType = (item, idx) =>
            item.title
                ? title(item, idx)
                : item.divider
                    ? divider(item, idx)
                    : item.label
                        ? navLabel(item, idx)
                        : item.children
                            ? navDropdown(item, idx)
                            : item.only
                                ? navItemOnly(item, idx)
                                : navItem(item, idx);

        // nav list
        const navList = items => {
            return items.map((item, index) => navType(item, index));
        };

        const isExternal = url => {
            const link = url ? url.substring(0, 4) : '';
            return link === 'http';
        };

        // sidebar-nav root
        return (
            <aside className="app-sidebar">
                <AddFarm
                    getlistFarms={this.getlistFarms}
                    ref={farm => {
                        this.farmAdd = farm;
                    }}
                />
                <div className="user-info" />
                <div className="app-sidebarUser">
                    <div className="c-pointer">
                        <i
                            className="fa fa-user-circle-o fa-3x mr-2 imgUserNavBar app-sidebarUser-avatar mx-auto"
                            aria-hidden="true"
                        />
                    </div>
                    <div className="c-pointer text-capitalize mx-2 text-truncate container">
                        <div>
                            <div className="app-sidebarUser-name">{this.state.personName}</div>
                        </div>
                        <div
                            className="app-sidebarUser-designation"
                            style={{ textDecorationLine: 'overline', fontStyle: 'italic' }}
                        >
                            {this.state.description}
                        </div>
                    </div>
                </div>

                <ul className="app-menu">
                    <li
                        className={'treeview scroll is-expanded'}
                        style={{ borderBottom: '3px solid rgb(0, 125, 113)' }}
                    >
                        <div
                            className="app-menuItem"
                            data-toggle="treeview"
                            style={{ borderLeftColor: 'transparent', background: 'rgba(0, 0, 0, 0.25)' }}
                        >
                            <i className="app-menuIcon fa fa-dashboard" />

                            <Link to="/farm" className="app-menuLabel" style={{ color: '#FFF' }}>
                                <span>
                                    <I18n ns="sideBar">
                                        {(t, { i18n }) => <React.Fragment>{t('farmsTreeview')}</React.Fragment>}
                                    </I18n>
                                </span>
                            </Link>
                            <div className="ml-4">
                                <i
                                    className="icon fa fa-refresh text-light fa-1x c-pointer"
                                    onClick={this.getlistFarms}
                                />
                            </div>
                        </div>
                        <ul className="treeview-menu" style={{ maxHeight: '30vh', overflowY: 'scroll' }}>
                            <li>
                                <div
                                    className="treeview-item c-pointer"
                                    onClick={() => {
                                        this.farmAdd.showAddFarm();
                                    }}
                                >
                                    <i className="icon fa fa-pencil-square" />
                                    <I18n ns="sideBar">
                                        {t => <React.Fragment>{t('farmsRegister')}</React.Fragment>}
                                    </I18n>
                                </div>
                            </li>
                            {this.state.farmsList}
                        </ul>
                    </li>
                    {navList(nav.items)}
                </ul>
            </aside>
        );
    }
}

export default Sidebar;
