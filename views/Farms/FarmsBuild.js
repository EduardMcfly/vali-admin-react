import React, { Component } from "react";
import { Row, Container, Col } from "reactstrap";
import Link from "react-router-dom/Link";
import { I18n } from "react-i18next";

class FarmsBuild extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-md-6 col-lg-6" data-aos="flip-right">
                <div className="widget-small primary coloured-icon align-items-center">
                    <Link to={"/farm/" + this.props.obj[0]}>
                        <i
                            className="icon fa  fa-eye fa-3x"
                            style={{ backgroundColor: this.props.colorRand }}
                        />
                    </Link>
                    <Container>
                        <Row style={{ wordBreak: "break-word" }}>
                            <Col
                                sm="12"
                                md="12"
                                className={"px-2 info"}
                                data-aos="fade-up"
                                data-aos-duration="500"
                            >
                                <h4>
                                    <Link to={"/farm/" + this.props.obj[0]}>
                                        {this.props.obj[1]}
                                    </Link>
                                </h4>
                                <I18n ns="farm">
                                    {(t, { i18n }) => (
                                        <p>
                                            <b>{t("seeFarm")}.</b>
                                        </p>
                                    )}
                                </I18n>
                            </Col>
                            <Col
                                xs="auto"
                                className={
                                    "p-0 p-sm-2 p-lg-3 d-flex align-items-center"
                                }
                            >
                                <i
                                    className="fa fa-cogs fa-2x btn-link c-pointer"
                                    aria-hidden="true"
                                    onClick={() =>
                                        this.props.modalData(
                                            this.props.obj[0],
                                            this.props.obj[1]
                                        )
                                    }
                                />
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

export default FarmsBuild;
