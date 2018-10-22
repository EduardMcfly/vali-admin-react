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
import AccessAlarmIcon from "@material-ui/icons/Person";

class Token extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <I18n ns="register">
                {(t, { i18n }) => (
                    <Row className="justify-content-center">
                        <Col md="9">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <Form>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <AccessAlarmIcon />
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
                                        <label className="text-muted" />
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    @
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="number"
                                                placeholder={t(
                                                    "labelCodeRecived"
                                                )}
                                                autoComplete="email"
                                            />
                                        </InputGroup>
                                        <Button color="primary" block>
                                            Create Account
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
                                                    Register
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
export default Token;
