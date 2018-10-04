import React, { Component } from "react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Col,
    Container,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row
} from "reactstrap";
import { I18n } from "react-i18next";
import Link from "react-router-dom/Link";
import { Redirect, Route, Switch } from "react-router-dom";
// routes config
import routes from "./routes";
import { Header } from "../../../components";

class Register extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.match.params);
    }
    render() {
        return (
            <div className="app flex-row align-items-center">
                <div className="app-header pr-1">
                    <Header {...this.props} />
                </div>
                <Container>
                    <div
                        className="app-content ml-0"
                        style={{ minHeight: "unset" }}
                    >
                        <Switch>
                            {routes.map((route, idx) => {
                                return route.component ? (
                                    <Route
                                        key={idx}
                                        path={route.path}
                                        exact={route.exact}
                                        name={route.name}
                                        render={props => (
                                            <I18n ns="general">
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
                                                            this.props.farmAuth
                                                        }
                                                        updateAll={
                                                            this.props.updateAll
                                                        }
                                                        updateFarms={() => {
                                                            this.sideBar.getlistFarms();
                                                        }}
                                                        treeview={
                                                            typeof route.treeview !==
                                                            "undefined"
                                                                ? route.treeview
                                                                : 0
                                                        }
                                                        treeviewSet={
                                                            this.treeviewSet
                                                        }
                                                    />
                                                )}
                                            </I18n>
                                        )}
                                    />
                                ) : null;
                            })}
                        </Switch>
                    </div>
                </Container>
            </div>
        );
    }
}

export default Register;
