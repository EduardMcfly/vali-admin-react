import React, { Component } from "react";
import {
    Container,
    Row,
    Col,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap";
import { I18n, Trans } from "react-i18next";
import ReactCSSTransitionGroup from "react-addons-css-transition-group"; // ES6
import { ModalCharge, AddFarm } from "../../components";

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
                        <a href={"#/farm/" + response.obj[0]}>
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
                        onClick={() =>
                            response.modalData(response.obj[0], response.obj[1])
                        }
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
const FarmsWorkerBuild = response => (
    <div className="card border-dark mb-3 col-sm-6 col-md-6" idtrab="3">
        <div className="card-header row text-capitalize">
            <div className="col-md-12">
                <i
                    className="fa fa-user-circle-o fa-3x mr-2 imgUserNavBar"
                    aria-hidden="true"
                />
            </div>
            <div className="col-md-12 mt-2  text-truncate">Juan Torres</div>
        </div>
        <div className="card-body text-dark">
            <h5 className="card-title">Información</h5>
            <p className="card-text" />
            <li className="row descriptionUser">
                <div className="description">
                    <div>
                        <b>Telefono:</b> 3218019886
                    </div>
                </div>
            </li>
            <p />
            <h5 className="card-title">Cargo</h5>
            <p className="card-text" />
            <li className="row descriptionUser">
                <div className="description">Super Administrador.&nbsp;</div>
                <i
                    id="editableDateTxt"
                    className="fa fa-pencil pl-2"
                    aria-hidden="true"
                />
            </li>
            <p />
        </div>
        <div id="delete" className="card-footer text-center">
            <i className="fa fa-trash fa-2x" aria-hidden="true" />
        </div>
    </div>
);

class Farms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalConfigFarm: false,
            modalConfigFarmTitle: "",
            modalCharge: true,
            nestedModalConfigFarm: false,
            closeAll: false,
            modalAddFarm: false
        };
        this.toggleModalAnimation = this.toggleModalAnimation.bind(this);
        this.toggleConfigFarmNested = this.toggleConfigFarmNested.bind(this);
        this.toggleConfigFarm = this.toggleConfigFarm.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
        this.modalData = this.modalData.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
        this.AddFarmModal = this.AddFarmModal.bind(this);
    }

    componentWillMount() {
        this.props.treeviewSet(this.props.treeview);
        this.sendRequest();
    }

    AddFarmModal() {
        this.farmAdd.toggleAddFarm();
    }

    toggleConfigFarm() {
        this.setState({
            modalConfigFarm: !this.state.modalConfigFarm
        });
    }
    toggleModalAnimation() {
        this.setState({ modalCharge: <ModalCharge /> });
    }

    toggleConfigFarmNested() {
        this.setState({
            nestedModalConfigFarm: !this.state.nestedModalConfigFarm,
            closeAll: false
        });
    }

    toggleAll() {
        this.setState({
            nestedModalConfigFarm: !this.state.nestedModalConfigFarm,
            closeAll: true
        });
    }

    modalData(id, name) {
        this.setState({ modalConfigFarmTitle: name });
        axios({
            method: "post",
            url: "./farmModalConfig/" + id
        }).then(res => {
            if (typeof res.data.errors != "undefined") {
                if (typeof res.data.errors.permits != "undefined") {
                    swal("", res.data.errors.permits, "warning");
                    this.setState({
                        modalConfigFarm: false
                    });
                }
            } else {
                this.setState({
                    modalCharge: false,
                    modalBodyConfigFarm: this.buildFarmWorker(res.data)
                });
            }
        });
        this.toggleModalAnimation();
        this.toggleConfigFarm();
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
    buildFarmWorker(responses) {
        return responses.map((farm, i) => (
            <FarmsWorkerBuild
                obj={farm}
                key={i}
                modalDataAddWorker={this.modalDataAddWorker}
            />
        ));
    }
    modalDataAddWorker(id, name) {
        this.setState({ modalConfigFarmTitle: name });
        axios({
            method: "post",
            url: "./farmModalConfig/" + id
        }).then(res => {
            if (typeof res.data.errors != "undefined") {
                if (typeof res.data.errors.permits != "undefined") {
                    swal("", res.data.errors.permits, "warning");
                    this.setState({
                        modalConfigFarm: false
                    });
                }
            } else {
                /* this.setState({
                    modalCharge: false,
                    modalBodyConfigFarm: this.buildFarmWorker(res.data)
                }); */
            }
        });
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
            <React.Fragment>
                <AddFarm
                    ref={farm => {
                        this.farmAdd = farm;
                    }}
                />
                <I18n ns="farm">
                    {(t, { i18n }) => (
                        <div>
                            <Col
                                md="12"
                                className="text-center"
                                data-aos="zoom-in"
                            >
                                <div className="tile">
                                    <h2>
                                        <div className="tile-body">
                                            {t("welcome")}
                                        </div>
                                    </h2>
                                </div>
                            </Col>
                            <Container data-aos="zoom-in">
                                <Row>
                                    <Col
                                        sm="10"
                                        md="11"
                                        style={{ cursor: "pointer" }}
                                    >
                                        <Row>
                                            <div className="col-md-6 mx-auto">
                                                <div
                                                    className="widget-small primary coloured-icon mb-2"
                                                    data-toggle="modal"
                                                    data-target="#modalNuevaFinca"
                                                    style={{
                                                        borderRadius: 1 + "em"
                                                    }}
                                                    onClick={this.AddFarmModal}
                                                >
                                                    <a className="my-auto">
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
                                        </Row>
                                    </Col>
                                    <Col
                                        sm="2"
                                        md="1"
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
                                    </Col>
                                </Row>
                                <Row data-aos="fade-up">{this.state.farms}</Row>
                            </Container>
                        </div>
                    )}
                </I18n>
                <I18n ns="farm">
                    {(t, { i18n }) => (
                        <React.Fragment>
                            <Modal
                                isOpen={this.state.modalConfigFarm}
                                toggle={this.toggleConfigFarm}
                                className={
                                    (this.props.className,
                                    "modal-dialog-centered")
                                }
                            >
                                <ModalHeader
                                    toggle={this.toggleConfigFarm}
                                    className="text-uppercase"
                                >
                                    {this.state.modalConfigFarmTitle}
                                </ModalHeader>
                                <ModalBody>
                                    <ReactCSSTransitionGroup
                                        transitionName="example"
                                        transitionEnterTimeout={500}
                                        transitionLeaveTimeout={300}
                                    >
                                        {this.state.modalCharge}
                                    </ReactCSSTransitionGroup>
                                    <Container>
                                        <h5 className="lead">Trabajadores</h5>
                                        <hr className="my-3" />
                                        <div className="mb-3">
                                            <button
                                                className="btn btn-secondary"
                                                type="button"
                                                data-toggle="modal"
                                                data-target="#addTrabajador"
                                            >
                                                Agregar trabajador
                                            </button>
                                        </div>
                                        <ReactCSSTransitionGroup
                                            transitionName="show"
                                            transitionEnterTimeout={1000}
                                            transitionLeaveTimeout={600}
                                        >
                                            <div className="row">
                                                {this.state.modalBodyConfigFarm}
                                            </div>
                                        </ReactCSSTransitionGroup>
                                    </Container>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        color="primary"
                                        onClick={this.toggleConfigFarm}
                                    >
                                        Do Something
                                    </Button>
                                    <Button
                                        color="secondary"
                                        onClick={this.toggleConfigFarm}
                                    >
                                        Cancel
                                    </Button>
                                </ModalFooter>
                            </Modal>
                        </React.Fragment>
                    )}
                </I18n>
            </React.Fragment>
        );
    }
}

export default Farms;
