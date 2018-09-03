import React, { Component } from "react";
import {
    Container,
    Row,
    Col,
    CardGroup,
    Card,
    CardBody,
    Button,
    Input,
    InputGroup,
    InputGroupAddon,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap";
import { I18n, Trans } from "react-i18next";
import ReactCSSTransitionGroup from "react-addons-css-transition-group"; // ES6

const FarmsBuild = response => (
    <div className="col-md-6 col-lg-6" data-aos="flip-right">
        <div
            className="widget-small primary coloured-icon"
            style={{ alignItems: "center" }}
        >
            <a href="">
                <i
                    className="icon fa  fa-eye fa-3x"
                    style={{ backgroundColor: response.colorRand }}
                />
            </a>
            <div className="row container" style={{ wordBreak: "break-word" }}>
                <div
                    className="info col-sm-9 col-md-9"
                    data-aos="fade-up"
                    data-aos-duration="500"
                >
                    <h4>
                        <a href={"./farm/" + response.obj[0]}>
                            {response.obj[1]}
                        </a>
                    </h4>
                    <I18n ns="farm">
                        {(t, { i18n }) => (
                            <p>
                                <b>{t("seeFarm")}.</b>
                            </p>
                        )}
                    </I18n>
                </div>
                <div className="col-sm-3 col-md-3">
                    <a
                        href="#"
                        onClick={() => response.modalData(response.obj[0])}
                        data-toggle="modal"
                        data-target="#modalConfigFinca"
                        style={{
                            display: "grid",
                            alignContent: "center",
                            justifyContent: "flex-end"
                        }}
                    >
                        <i className="fa fa-cogs fa-2x" aria-hidden="true" />
                    </a>
                </div>
            </div>
        </div>
    </div>
);

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalCharge: true,
            nestedModal: false,
            closeAll: false
        };
        this.toggleModalAnimation = this.toggleModalAnimation.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggleNested = this.toggleNested.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
        this.modalData = this.modalData.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
        this.sendRequest();
    }

    toggle(data) {
        this.setState({
            modal: !this.state.modal
        });
    }
    toggleModalAnimation(data) {
        this.setState({ modalCharge: this.animationModal() });
    }
    animationModal() {
        return (
            <div className="modal-body align-items-center d-flex">
                <div className="overlay container position-absolute justify-content-center d-flex">
                    <div className="row text-center">
                        <div className="col-12">
                            <div
                                className="m-loader mr-2 mx-auto"
                                style={{ width: "50%" }}
                            >
                                <svg
                                    className="m-circular"
                                    viewBox="25 25 50 50"
                                >
                                    <circle
                                        className="path"
                                        cx="50"
                                        cy="50"
                                        r="20"
                                        fill="none"
                                        strokeWidth="4"
                                        strokeMiterlimit="10"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="col-12">
                            <h3 className="l-text">
                                <I18n ns="general">
                                    {(t, { i18n }) => t("charging")}
                                </I18n>
                                .
                            </h3>
                        </div>
                    </div>
                </div>
                <Container>
                    <Row className="text-truncate" style={{ height: "100%" }}>
                        <Col sm="12 g-height-20 gray mb-1" />
                        <Col sm="6 col-6 g-height-90 gray" />
                        <Col sm="6 col-6">
                            <Row className="ml-1">
                                <Col sm="12 g-height-20 gray" />
                                <Col sm="12 p-1" />
                                <Col sm="12 g-height-20 gray" />
                                <Col sm="12 p-1" />
                                <Col sm="12 g-height-20 gray" />
                                <Col sm="12 p-1" />
                                <Col sm="12 g-height-20 gray" />
                                <Col sm="12 p-1" />
                            </Row>
                        </Col>
                        <Col sm="4 col-6">
                            <Row>
                                <Col sm="12 col-12 g-height-20 gray" />
                                <Col sm="12 col-12 p-1" />
                                <Col sm="12 col-12 g-height-20 gray" />
                                <Col sm="12 col-12 p-1" />
                                <Col sm="12 col-12 g-height-20 gray" />
                                <Col sm="12 col-12 p-1" />
                                <Col sm="3 col-3 g-height-20 gray" />
                                <Col sm="1 col-1 p-1" />
                                <Col sm="1 col-1 g-height-20 gray" />
                                <Col sm="1 col-1 p-1" />
                                <Col sm="4 col-4 g-height-20 gray" />
                            </Row>
                        </Col>
                        <Col sm="8 col-6">
                            <Row className="ml-1">
                                <Col sm="6 col-6 g-height-20 gray" />
                                <Col sm="1 col-1 p-1" />
                                <Col sm="5 col-5 g-height-20 gray" />
                                <Col sm="12 col-12 p-1" />
                                <Col sm="3 col-3 g-height-20 gray" />
                                <Col sm="1 col-1 p-1" />
                                <Col sm="1 col-1 g-height-20 gray" />
                                <Col sm="1 col-1 p-1" />
                                <Col sm="5 col-5 g-height-20 gray" />
                                <Col sm="12 col-12 p-1" />
                                <Col sm="12 col-12 g-height-20 gray" />
                                <Col sm="12 col-12 p-1" />
                                <Col sm={{ size: "2", offset: 2 }} />
                                <Col sm={{ size: "4", offset: 2 }} />
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    toggleNested() {
        this.setState({
            nestedModal: !this.state.nestedModal,
            closeAll: false
        });
    }

    toggleAll() {
        this.setState({
            nestedModal: !this.state.nestedModal,
            closeAll: true
        });
    }

    modalData(data) {
        axios({
            method: "post",
            url: "./farmModalConfig/" + data
        }).then(res => {
            if (typeof res.data.errors != "undefined") {
                if (typeof res.data.errors.permits != "undefined") {
                    swal("", res.data.errors.permits, "warning");
                    this.setState({
                        modal: false
                    });
                }
            } else {
            }
            this.setState({ modalCharge: false, modalBody: data });
        });
        this.toggle();
        this.toggleModalAnimation();
    }
    build(responses) {
        return responses[0].map((farm, i) => (
            <FarmsBuild
                obj={farm}
                key={i}
                modalData={this.modalData}
                colorRand={colorRand()}
            />
        ));
    }
    sendRequest() {
        axios({
            method: "post",
            url: "./listFarms"
        }).then(res => {
            this.setState({ farms: this.build(res.data) });
        });
    }
    render() {
        return (
            <div>
                <I18n ns="farm">
                    {(t, { i18n }) => (
                        <div>
                            <div
                                className="col-md-12 text-center"
                                data-aos="zoom-in"
                            >
                                <div className="tile">
                                    <h2>
                                        <div className="tile-body">
                                            {t("welcome")}
                                        </div>
                                    </h2>
                                </div>
                            </div>
                            <div className="container" data-aos="zoom-in">
                                <div className="row">
                                    <div
                                        className="col-sm-10 col-md-11"
                                        style={{ cursor: "pointer" }}
                                    >
                                        <div className="row">
                                            <div className="col-md-6 mx-auto">
                                                <div
                                                    className="widget-small primary coloured-icon mb-2"
                                                    data-toggle="modal"
                                                    data-target="#modalNuevaFinca"
                                                    style={{
                                                        borderRadius: 1 + "em"
                                                    }}
                                                >
                                                    <a
                                                        href="#"
                                                        className="my-auto"
                                                    >
                                                        <i
                                                            className="icon fa fa-pencil-square fa-2x p-1"
                                                            style={{
                                                                backgroundColor:
                                                                    "#ffd404",
                                                                textTransform:
                                                                    "unset",
                                                                minWidth:
                                                                    "unset",
                                                                borderRadius:
                                                                    0.8 + "rem"
                                                            }}
                                                        />
                                                    </a>
                                                    <div className="row container">
                                                        <div className="info col-sm-9 col-md-9 mx-auto my-auto text-center">
                                                            <a
                                                                className="fa-lg"
                                                                style={{
                                                                    display:
                                                                        "contents"
                                                                }}
                                                            >
                                                                {t(
                                                                    "registerFarm"
                                                                )}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="col-sm-2 col-md-1"
                                        style={{ cursor: "pointer" }}
                                    >
                                        <div
                                            href="#"
                                            className="justify-content-end align-items-center d-flex"
                                            onClick={this.sendRequest}
                                        >
                                            <i
                                                className="icon fa fa-refresh text-light  fa-2x p-1"
                                                style={{
                                                    backgroundColor:
                                                        "rgba(0, 150, 136, 0.5)",
                                                    textTransform: "unset",
                                                    minWidth: "unset",
                                                    borderRadius: 0.8 + "rem"
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div id="root" data-aos="fade-up">
                                    <div className="row">
                                        {this.state.farms}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </I18n>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={(this.props.className, "modal-dialog-centered")}
                >
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        <ReactCSSTransitionGroup
                            transitionName="example"
                            transitionEnterTimeout={1000}
                            transitionLeaveTimeout={600}
                        >
                            {this.state.modalCharge}
                        </ReactCSSTransitionGroup>
                        {this.state.modalBody}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>
                            Do Something
                        </Button>
                        <Button color="secondary" onClick={this.toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Login;
