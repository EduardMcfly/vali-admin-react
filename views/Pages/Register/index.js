import React, { Component } from 'react';
import {
    Container
} from 'reactstrap';
import routes from './routes';
import { I18n } from 'react-i18next';
import { Redirect, Route, Switch } from 'react-router-dom';
// routes config
import { Header } from '../../../components';

class Register extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="app flex-row align-items-center">
                <div className="app-header pr-1">
                <Header {...this.props} />
                </div>
                <Container>
                    <div className="app-content ml-0" style={{ minHeight: 'unset' }}>
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
                                                {t => {
                                                    document.title = t('routes.' + route.name)
                                                    return (
                                                        <route.component
                                                            {...props}
                                                        />
                                                    );
                                                }}
                                            </I18n>
                                        )}
                                    />
                                ) : null;
                            })}
                            <Redirect from="/" to="/home" />
                        </Switch>
                    </div>
                </Container>
            </div>
        );
    }
}

export default Register;
