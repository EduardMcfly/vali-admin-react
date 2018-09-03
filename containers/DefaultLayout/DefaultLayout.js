import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

// sidebar nav config
import navigation from "../../_nav";
// routes config
import routes from "../../routes";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import classNames from "classnames";
import {
    Breadcrumb,
    LoginComponent,
    Footer,
    Header,
    Aside
} from "../../components";
import {
    AppSidebarNav
} from "@coreui/react";
class DefaultLayout extends Component {
    constructor(props) {
        super(props);
        this.toggleLarge = this.toggleLarge.bind(this);
        this.toggleAsideNav = this.toggleAsideNav.bind(this);
        console.log(this.props);
        this.state = { asideNavToggle: true };
    }

    toggleLarge() {
        this.setState({
            large: !this.state.large
        });
    }

    toggleAsideNav() {
        this.setState({ asideNavToggle: !this.state.asideNavToggle });
    }
    render() {
        return <div className={"app sidebar-mini rtl " + classNames({
                        "sidenav-toggled":
                            this.state.asideNavToggle === true
                    })}>
                <div className="app-header">
                    <Header toggleAsideNav={this.toggleAsideNav} />
                </div>
                <Aside />

                <AppSidebarNav navConfig={navigation} {...this.props} />
                <main className="app-content">
                    <Breadcrumb appRoutes={routes} />
                    <Container fluid>
                        <Switch>
                            {routes.map((route, idx) => {
                                return route.component ? <Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => <route.component {...props} />} /> : null;
                            })}
                            <Redirect from="/" to="/home" />
                        </Switch>
                    </Container>
                </main>
                <Modal isOpen={this.props.modalToggle} className={"modal-lg "}>
                    <ModalHeader>Inicia seccion por favor</ModalHeader>
                    <ModalBody>{this.props.modal}</ModalBody>
                    <ModalFooter>
                        <Button color="primary">Do Something</Button> <Button color="secondary">
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>;
    }
}

export default DefaultLayout;
