import React, { Component } from 'react';
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
    Row,
} from 'reactstrap';
import { I18n } from 'react-i18next';
import Link from 'react-router-dom/Link';
import { Redirect, Route, Switch } from 'react-router-dom';
// routes config
import routes from '../../../../routes';
import { Header } from '../../../../components';

class Register extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <I18n ns="register">
                {(t, { i18n }) => (
                    <Row className="justify-content-center">
                        <Col md="9">
                            <Card>
                                <CardBody className="p-4">
                                    <div>
                                        <h1>{t('registerTitle')}</h1>
                                        <p className="text-muted">{t('registerSubtitle')}</p>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText><i class="fa fa-user"></i></InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text" placeholder="Email" autoComplete="email" />
                                        </InputGroup>
                                        <Button color="success" block>
                                            {t('confirmEmail')}
                                        </Button>
                                    </div>
                                    <Row className={'my-2'}>
                                        <Col xs="12" sm="6">
                                            <Button className={''} block>
                                                <span>facebook</span>
                                            </Button>
                                        </Col>
                                        <Col xs="12" sm="6">
                                            <Button className={''} block>
                                                <span>twitter</span>
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Link to={'/login'}>
                                        <Button color="link" block>
                                            {t('haveLogin')}
                                        </Button>
                                    </Link>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                )}
            </I18n>
        );
    }
}

export default Register;
