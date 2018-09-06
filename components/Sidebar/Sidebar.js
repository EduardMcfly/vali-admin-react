import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { TextCharge } from '..';
import { Badge, Nav, NavItem, NavLink as RsNavLink } from 'reactstrap';
import classNames from 'classnames';
import nav from './_nav';

const FarmsListBuild = response => (
    <li>
        <a href={'#/farm/' + response.obj[0]} className={'treeview-item '} rel="noopener">
            <i className="icon fa fa-circle-o" />
            {response.obj[1]}
        </a>
    </li>
);
class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            personName: <TextCharge />,
            description: <TextCharge />,
            farmsList: <TextCharge />,
            treeviewTab: 0,
        };
        this.handleClick = this.handleClick.bind(this);
        this.activeRoute = this.activeRoute.bind(this);
        this.hideMobile = this.hideMobile.bind(this);
        this.AddFarmModal = this.AddFarmModal.bind(this);
        this.sendInfoUser = this.sendInfoUser.bind(this);
        this.sendInfoUser();
    }

    AddFarmModal() {
        this.farmAdd.toggleAddFarm();
    }

    sendInfoUser() {
        return axios({
            method: 'post',
            url: './infoUser',
        })
            .then(res => {
                let user = res.data.user['0'];
                let farms = res.data.farms;
                this.setState({
                    personName: user['0'] + ' ' + user['1'],
                    description: user['2'],
                    farmsList: this.buildListFarms(farms),
                });
            })
            .catch(error => {
                if (typeof error.data.errors !== 'undefined') {
                    setTimeout(() => {
                        if (typeof error.data.errors.expired === 'undefined') {
                            this.sendInfoUser();
                        }
                    }, 5000);
                }
            });
    }

    buildListFarms(response) {
        return response.map((farm, i) => <FarmsListBuild obj={farm} key={i} treeviewTab={this.state.treeviewTab} />);
    }
    handleClick(e) {
        e.preventDefault();
        e.target.parentElement.classList.toggle('is-expanded');
    }

    activeRoute(routeName, props) {
        // return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
        return props.location.pathname.indexOf(routeName) > -1 ? 'treview is-expanded' : 'treview';
    }

    hideMobile() {
        if (document.body.classList.contains('sidebar-mobile-show')) {
            document.body.classList.toggle('sidebar-mobile-show');
        }
    }

    // todo Sidebar nav secondLevel
    // secondLevelActive(routeName) {
    //   return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
    // }

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
            const classes = classNames('treview', title.class);
            return (
                <li key={key} className={classes}>
                    {wrapper(title)}{' '}
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
                link: classNames('app-menuItem', item.variant ? `app-menuItem-${item.variant}` : ''),
                icon: classNames(item.icon),
            };
            return navLink(item, key, classes);
        };

        // nav link
        const navLink = (item, key, classes) => {
            const url = item.url ? item.url : '';
            return (
                <li key={key}>
                    {isExternal(url) ? (
                        <RsNavLink href={url} className={'classes.link'} active>
                            <i className={classes.icon} />
                            {item.name}
                            {badge(item.badge)}
                        </RsNavLink>
                    ) : (
                        <NavLink to={url} className={classes.link} activeClassName="active" onClick={this.hideMobile}>
                            <i className={classes.icon} />
                            {item.name}
                            {badge(item.badge)}
                        </NavLink>
                    )}
                </li>
            );
        };

        // nav dropdown
        const navDropdown = (item, key) => {
            return (
                <li key={key} className={this.activeRoute(item.url, props)}>
                    <a className="app-menuItem nav-dropdown-toggle" href="#" onClick={this.handleClick}>
                        <i className={item.icon} />
                        {item.name}
                    </a>
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
                        <div className="app-sidebarUser-designation">{this.state.description}</div>
                    </div>
                </div>

                <ul className="app-menu">
                    {navList(nav.items)}
                </ul>
            </aside>
        );
    }
    /* render() {
        return (
            <React.Fragment>
                <AddFarm
                    ref={farm => {
                        this.farmAdd = farm;
                    }}
                />
                <aside className="app-sidebar">
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
                            <div className="app-sidebarUser-designation">{this.state.description}</div>
                        </div>
                    </div>
                    <I18n ns="aside">
                        {(t, { i18n }) => (
                            <ul className="app-menu">
                                <li
                                    onClick={() => {
                                        this.treeview(1);
                                    }}
                                    className={
                                        'treeview ' +
                                        classNames({
                                            'is-expanded': this.state.treeviewTab === 1,
                                        })
                                    }
                                >
                                    <div className="app-menuItem c-pointer" data-toggle="treeview">
                                        <i className="app-menuIcon fa fa-laptop" />
                                        <span className="app-menuLabel">{t('regitersCowsTreeview')}</span>
                                        <i className="treeview-indicator fa fa-angle-right" />
                                    </div>
                                    <ul className="treeview-menu">
                                        <li>
                                            <a className="treeview-item" href="listaVacas/index.php?fincaId=1">
                                                <i className="icon fa fa-circle-o" />
                                                {t('cows')}
                                            </a>
                                        </li>
                                        <li>
                                            <a className="treeview-item" href="registroProductivo/index.php?fincaId=1">
                                                <i className="icon fa fa-keyboard-o" />
                                                {t('registerProductive')}
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="treeview-item"
                                                href="listaVacas/index.php?cv=add&amp;fincaId=1"
                                            >
                                                <i className="icon fa fa-pencil-square" />
                                                {t('registerProductive')}
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li
                                    onClick={() => {
                                        this.treeview(2);
                                    }}
                                    className={
                                        'treeview ' +
                                        classNames({
                                            'is-expanded': this.state.treeviewTab === 2,
                                        })
                                    }
                                >
                                    <div className="app-menuItem c-pointer" data-toggle="treeview">
                                        <i className="app-menuIcon fa  fa-th" />
                                        <span className="app-menuLabel">{t('suppliesrecordsTreeview')}</span>
                                        <i className="treeview-indicator fa fa-angle-right" />
                                    </div>
                                    <ul className="treeview-menu">
                                        <li>
                                            <a
                                                className="treeview-item"
                                                href="provedoresInsumos/index.php?fincaId=1&amp;insumos"
                                                rel="noopener"
                                            >
                                                <i className="icon fa fa-th" /> {t('supplies')}
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="treeview-item"
                                                href="provedoresInsumos/index.php?fincaId=1&amp;insumos"
                                                rel="noopener"
                                            >
                                                <i className="icon fa fa-th" /> {t('registerSupplies')}
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li
                                    onClick={() => {
                                        this.treeview(3);
                                    }}
                                    className={
                                        'treeview ' +
                                        classNames({
                                            'is-expanded': this.state.treeviewTab === 3,
                                        })
                                    }
                                >
                                    <div className="app-menuItem c-pointer" data-toggle="treeview">
                                        <i className="app-menuIcon fa fa-dashboard" />
                                        <span className="app-menuLabel">{t('farmsTreeview')}</span>
                                        <i className="treeview-indicator fa fa-angle-right" />
                                    </div>
                                    <ul className="treeview-menu">
                                        {this.state.farmsList}
                                        <li>
                                            <div className="treeview-item" onClick={this.AddFarmModal}>
                                                <i className="icon fa fa-pencil-square" />
                                                {t('farmsRegister')}
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        )}
                    </I18n>
                </aside>
            </React.Fragment>
        );
    } */
}

export default Sidebar;
