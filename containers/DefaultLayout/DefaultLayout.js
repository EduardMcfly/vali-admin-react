import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { Container } from "reactstrap";
import classNames from "classnames";
import { I18n } from "react-i18next";

/**
 * Routes
 * @return Array
 */
import { routes } from "../../routes/index";
import { Breadcrumb, Header, Sidebar, SwitchWithSlide } from "../../components";

class DefaultLayout extends Component {
    constructor(props) {
        super(props);
        this.toggleLarge = this.toggleLarge.bind(this);
        this.toggleSidebarNav = this.toggleSidebarNav.bind(this);
        this.hideSidebarNav = this.hideSidebarNav.bind(this);
        this.state = { asideNavToggle: false };
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
                className={classNames(
                    {
                        "sidenav-toggled": this.state.asideNavToggle
                    },
                    "app sidebar-mini rtl"
                )}
            >
                <div className="app-header pr-1">
                    <Header
                        toggleSidebarNav={this.toggleSidebarNav}
                        userAuthLogout={this.props.userAuth.logout}
                        {...this.props}
                    />
                </div>
                <div
                    className="app-sidebarOverlay"
                    onClick={this.hideSidebarNav}
                    data-toggle="sidebar"
                />
                <Sidebar
                    {...this.props}
                    ref={sideBar => {
                        this.sideBar = sideBar;
                    }}
                />
                <main className="app-content">
                    <Breadcrumb appRoutes={routes} />
                    <Container fluid>
                        <SwitchWithSlide>
                            {routes.map((route, id) => {
                                return route.component ? (
                                    <Route
                                        key={id}
                                        path={route.path}
                                        exact={route.exact}
                                        name={route.name}
                                        render={props => (
                                            <I18n ns="general">
                                                {t => {
                                                    document.title = t(
                                                        "routes." + route.name
                                                    );
                                                    return (
                                                        <route.component
                                                            {...props}
                                                            farmAuth={async () =>
                                                                this.props
                                                                    .farmAuth
                                                            }
                                                            updateAll={async () =>
                                                                this.props
                                                                    .updateAll
                                                            }
                                                            updateFarms={async () => {
                                                                this.sideBar.getlistFarms();
                                                            }}
                                                        />
                                                    );
                                                }}
                                            </I18n>
                                        )}
                                    />
                                ) : null;
                            })}
                            <Redirect from="/" to="/home" />
                        </SwitchWithSlide>
                    </Container>
                </main>
            </div>
        );
    }
}

export default DefaultLayout;
