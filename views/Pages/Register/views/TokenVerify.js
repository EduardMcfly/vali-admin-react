import React, { Component } from "react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Col,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    FormFeedback,
    Row
} from "reactstrap";
import { I18n } from "react-i18next";
import Link from "react-router-dom/Link";
import { RenderChildren } from '../../../../controllers';
import { use } from "i18next/dist/commonjs";

class TokenVerify extends Component {
    constructor(props) {
        super(props);
        this.tokenSubmit = this.tokenSubmit.bind(this)
    }

    tokenSubmit(t) {
        console.log(t);
        
        setTimeout(() => {
            this.props.history.push('/register/token/32233')
        }, 1000);
    }

    render() {
        return (
            <I18n ns="register">
                {(t, { i18n }) => (
                    <Row className="justify-content-center">
                        <Col sm={"12"} md={"9"} lg={"6"} xl={"6"}>
                            <Card className="mx-4">
                                <CardFooter>
                                    <h3>{t("verifyTokenTitle")}</h3>
                                    <span className="text-muted">
                                        {t("verifyTokenSubtitle")}
                                    </span>
                                </CardFooter>
                                <CardBody className="p-4">
                                    <Form>
                                        <RenderChildren state={!this.props.verifyEmail()}>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText className={'d-flex justify-content-center'} style={{ width: '40px' }}>
                                                        <i className="fa fa-user" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    type="text"
                                                    placeholder={t(
                                                        "labelEmailRecived"
                                                    )}
                                                    autoComplete="email"
                                                    name="email"
                                                />
                                                <FormFeedback />
                                            </InputGroup>
                                        </RenderChildren>
                                        <label className="text-muted" />
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText className={'d-flex justify-content-center'} style={{ width: '40px' }}>
                                                    <i className="fa fa-slack" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="number"
                                                placeholder={t(
                                                    "labelCodeRecived"
                                                )}
                                                autoComplete="false"
                                            />
                                        </InputGroup>
                                        <Button onClick={() => this.tokenSubmit(t)} color="info" block>
                                            {t('confirm')}
                                        </Button>
                                    </Form>
                                </CardBody>
                                <CardFooter className="p-4">
                                    <Row>
                                        <Col
                                            xs="6"
                                            sm="6"
                                            className={"mx-auto"}
                                        >
                                            <Link to={"/register"}>
                                                <Button
                                                    color={"success"}
                                                    block
                                                    size={"sm"}
                                                >
                                                    {t('back')}
                                                </Button>
                                            </Link>
                                        </Col>
                                    </Row>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                )}
            </I18n>
        );
    }
}
export default TokenVerify;
