import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { TextCharge } from "..";
import { Badge, Nav, NavItem, NavLink as RsNavLink } from "reactstrap";
import classNames from "classnames";
import { AddFarm } from "..";
import { I18n, Trans } from "react-i18next";
import nav from "./_nav";

class Sidebar extends Component {
    constructor(props) {
        super(props);
        console.log(this);
        this.state = {
            personName: <TextCharge />,
            description: <TextCharge />,
            farmsList: <TextCharge />,
            treeviewTab: 0
        };
        this.activeRoute = this.activeRoute.bind(this);
        this.hideMobile = this.hideMobile.bind(this);
        this.AddFarmModal = this.AddFarmModal.bind(this);
        this.sendInfoUser = this.sendInfoUser.bind(this);
        this.treeview = this.treeview.bind(this);
        this.farmsListBuild = this.farmsListBuild.bind(this);
        this.sendInfoUser();
    }

    treeview(tab) {
        if (this.state.treeviewTab !== tab) {
            this.setState({ treeviewTab: tab });
        } else {
            this.setState({ treeviewTab: 0 });
        }
    }

    AddFarmModal() {
        this.farmAdd.showAddFarm();
    }

    sendInfoUser() {
        return axios({
            method: "post",
            url: "./infoUser"
        })
            .then(res => {
                let user = res.data.user["0"];
                let farms = res.data.farms;
                this.setState({
                    personName: user["0"] + " " + user["1"],
                    description: user["2"],
                    farmsList: this.buildListFarms(farms)
                });
            })
            .catch(error => {
                if (typeof error.data.errors !== "undefined") {
                    setTimeout(() => {
                        if (typeof error.data.errors.expired === "undefined") {
                            this.sendInfoUser();
                        }
                    }, 5000);
                }
            });
    }

    buildListFarms(response) {
        return response.map((farm, i) => this.farmsListBuild(farm, i));
    }

    activeRoute(routeName, props) {
        // return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
        return props.location.pathname.indexOf(routeName) > -1 ? "treeview is-expanded" : "treeview";
    }

    farmsListBuild(response, key) {
        return (
            <NavLink
                key={key}
                to={"/farm/" + response[0]}
                activeClassName="active"
                className={"treeview-item"}
            >
                <i className={"icon fa fa-circle-o"} />
                {response[1]}
            </NavLink>
        );
    }

    hideMobile() {
        if (document.body.classList.contains("sidebar-mobile-show")) {
            document.body.classList.toggle("sidebar-mobile-show");
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
                ? React.createElement(
                      item.wrapper.element,
                      item.wrapper.attributes,
                      item.name
                  )
                : item.name;
        };

        // nav list section title
        const title = (title, key) => {
            const classes = classNames("app-menuItem p-1 pl-2", title.class);
            return (
                <li key={key} className="treeview">
                    <div key={key} className={classes}>
                        <span class="app-menuLabel">{wrapper(title)}</span>
                    </div>
                </li>
            );
        };

        // nav list divider
        const divider = (divider, key) => {
            const classes = classNames("divider", divider.class);
            return <li key={key} className={classes} />;
        };

        // nav label with nav link
        const navLabel = (item, key) => {
            const classes = {
                item: classNames("hidden-cn", item.class),
                link: classNames("nav-label", item.class ? item.class : ""),
                icon: classNames(
                    !item.icon ? "fa fa-circle" : item.icon,
                    item.label.variant ? `text-${item.label.variant}` : "",
                    item.label.class ? item.label.class : ""
                )
            };
            return navLink(item, key, classes);
        };

        // nav item with nav link
        const navItem = (item, key) => {
            const classes = {
                item: classNames(item.class),
                link: classNames(
                    "treeview-item",
                    item.variant ? `treeview-item-${item.variant}` : ""
                ),
                icon: classNames("app-menuIcon fa " + item.icon)
            };
            return navLink(item, key, classes);
        };

        // nav link
        const navLink = (item, key, classes) => {
            const url = item.url ? item.url : "";
            return (
                <li key={key}>
                    <I18n ns="sideBar">
                        {(t, { i18n }) => (
                            <React.Fragment>
                                {isExternal(url) ? (
                                    <RsNavLink
                                        href={url}
                                        className={classes.link}
                                    >
                                        <i className={classes.icon} />
                                        {t(item.name)}
                                        {badge(item.badge)}
                                    </RsNavLink>
                                ) : (
                                    <NavLink
                                        to={url}
                                        activeClassName="active"
                                        className={classes.link}
                                        onClick={this.hideMobile}
                                    >
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
            const url = item.url ? item.url : "";
            return (
                <li key={key}>
                    <I18n ns="sideBar">
                        {(t, { i18n }) => (
                            <React.Fragment>
                                {isExternal(url) ? (
                                    <RsNavLink
                                        href={url}
                                        className={classes.link}
                                    >
                                        <i className={classes.icon} />
                                        <span className="app-menuLabel">
                                            {t(item.name)}
                                        </span>
                                        {badge(item.badge)}
                                    </RsNavLink>
                                ) : (
                                    <NavLink
                                        to={url}
                                        activeClassName="active"
                                        className={classes.link}
                                        onClick={this.hideMobile}
                                    >
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
                link: classNames(
                    "app-menuItem",
                    item.variant ? `treeview-item-${item.variant}` : ""
                ),
                icon: classNames("app-menuIcon fa " + item.icon)
            };
            return navLinkOnly(item, key, classes);
        };

        // nav dropdown
        const navDropdown = (item, key) => {
            return (
                <li
                    key={key}
                    className={
                        this.activeRoute(item.url, props) +
                        classNames({
                            " is-expanded":
                                this.state.treeviewTab === item.treeview
                        })
                    }
                    onClick={() => {
                        this.treeview(item.treeview);
                    }}
                >
                    <div className="app-menuItem c-pointer">
                        <i className={"app-menuIcon fa " + item.icon} />

                        <I18n ns="sideBar">
                            {(t, { i18n }) => (
                                <span className="app-menuLabel">
                                    {t(item.name)}
                                </span>
                            )}
                        </I18n>
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
            const link = url ? url.substring(0, 4) : "";
            return link === "http";
        };

        // sidebar-nav root
        return (
            <aside className="app-sidebar">
                <AddFarm
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
                            <div className="app-sidebarUser-name">
                                {this.state.personName}
                            </div>
                        </div>
                        <div
                            className="app-sidebarUser-designation"
                            style={{
                                textDecorationLine: "overline",
                                fontStyle: "italic"
                            }}
                        >
                            {this.state.description}
                        </div>
                    </div>
                </div>

                <ul className="app-menu">
                    <li
                        className={"treeview is-expanded"}
                        style={{ borderBottom: "3px solid rgb(0, 125, 113)" }}
                    >
                        <a
                            href={"#/farms"}
                            className="app-menuItem c-pointer"
                            data-toggle="treeview"
                            style={{
                                borderLeftColor: "transparent",
                                background: "rgba(0, 0, 0, 0.25)"
                            }}
                        >
                            <i className="app-menuIcon fa fa-dashboard" />
                            <span className="app-menuLabel">
                                <I18n ns="sideBar">
                                    {(t, { i18n }) => (
                                        <React.Fragment>
                                            {t("farmsTreeview")}
                                        </React.Fragment>
                                    )}
                                </I18n>
                            </span>
                        </a>
                        <ul className="treeview-menu">
                            {this.state.farmsList}
                            <li>
                                <div
                                    className="treeview-item c-pointer"
                                    onClick={this.AddFarmModal}
                                >
                                    <i className="icon fa fa-pencil-square" />
                                    <I18n ns="sideBar">
                                        {(t, { i18n }) => (
                                            <React.Fragment>
                                                {t("farmsRegister")}
                                            </React.Fragment>
                                        )}
                                    </I18n>
                                </div>
                            </li>
                        </ul>
                    </li>
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
                            </ul>
                        )}
                    </I18n>
                </aside>
            </React.Fragment>
        );
    } */
}

export default Sidebar;
