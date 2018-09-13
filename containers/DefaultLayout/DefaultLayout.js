import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

// routes config
import routes from "../../routes";
import classNames from "classnames";
import { Breadcrumb, Header, Sidebar } from "../../components";
import { I18n } from "react-i18next";

class DefaultLayout extends Component {
    constructor(props) {
        super(props);
        this.toggleLarge = this.toggleLarge.bind(this);
        this.toggleSidebarNav = this.toggleSidebarNav.bind(this);
        this.hideSidebarNav = this.hideSidebarNav.bind(this);
        this.state = { asideNavToggle: false };
        this.sendRequest = this.sendRequest.bind(this);
        this.sendRequest();

    }

    sendRequest() {
        return axios({
            method: "post",
            url: "./verifyAuth"
        });
    }

    toggleLarge() {
        this.setState({
            large: !this.state.large
        });
    }

    toggleSidebarNav() {
        this.setState({ asideNavToggle: !this.state.asideNavToggle });
    }

    hideSidebarNav() {
        if (this.state.asideNavToggle) {
            this.setState({ asideNavToggle: false });
        }
    }
    render() {
        return (
            <div
                className={
                    "app sidebar-mini rtl " +
                    classNames({
                        "sidenav-toggled": this.state.asideNavToggle === true
                    })
                }
            >
                <div className="app-header pr-1">
                    <Header toggleSidebarNav={this.toggleSidebarNav} userAuthLogout={this.props.userAuth.logout} />
                </div>
                <div
                    className="app-sidebarOverlay"
                    onClick={this.hideSidebarNav}
                    data-toggle="sidebar"
                />
                <Sidebar {...this.props} ref={(sideBar) => { this.sideBar = sideBar; }}/>
                {console.log(this)}
                <main className="app-content" style={{ overflow:"hidden" }}>
                    <Breadcrumb appRoutes={routes} />
                    <Container fluid>
                        <Switch>
                            {routes.map((route, idx) => {
                                return route.component ? <Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => <I18n ns="general">
                                                {t => (
                                                    <route.component
                                                        {...props}
                                                        Headtitle={
                                                            (document.title = t(
                                                                "routes." +
                                                                    route.name
                                                            ))
                                                        }
                                                        farmAuth={
                                                            this
                                                                .props
                                                                .farmAuth
                                                        }
                                                        updateAll={
                                                            this
                                                                .props
                                                                .updateAll
                                                        }
                                                        updateFarms={
                                                            this.sideBar.getlistFarms
                                                        }
                                                        treeview={
                                                            typeof route.treeview !==
                                                            "undefined"
                                                                ? route.treeview
                                                                : 0
                                                        }
                                                        treeviewSet={
                                                            this
                                                                .treeviewSet
                                                        }
                                                    />
                                                )}
                                            </I18n>} /> : null;
                            })}
                            <Redirect from="/" to="/home" />
                        </Switch>
                    </Container>
                </main>
            </div>
        );
    }
}

export default DefaultLayout;
