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
import { I18n } from "react-i18next";
import ReactCSSTransitionGroup from "react-addons-css-transition-group"; // ES6
import { ModalCharge, AddFarm } from "../../components";
import Link from "react-router-dom/Link";

const FarmsBuild = response => (
    <div className="col-md-6 col-lg-6" data-aos="flip-right">
        <div
            className="widget-small primary coloured-icon align-items-center"
        >
            <Link to={"/farm/" + response.obj[0]}>
                <i
                    className="icon fa  fa-eye fa-3x"
                    style={{ backgroundColor: response.colorRand }}
                />
            </Link>
            <Container>
                <Row style={{ wordBreak: "break-word" }}>
                    <Col
                        sm="3"
                        md="1"
                        className={"order-sm-2 p-0 p-sm-2 p-lg-3"}
                    >
                        <div className="d-flex justify-content-end">
                            <i
                                className="fa fa-cogs fa-2x btn-link c-pointer"
                                aria-hidden="true"
                                onClick={() =>
                                    response.modalData(
                                        response.obj[0],
                                        response.obj[1]
                                    )
                                }
                            />
                        </div>
                    </Col>
                    <Col
                        sm="9"
                        md="11"
                        className={"info order-sm-1"}
                        data-aos="fade-up"
                        data-aos-duration="500"
                    >
                        <h4>
                            <Link to={"/farm/" + response.obj[0]}>
                                {response.obj[1]}
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
                </Row>
            </Container>
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
        this.getListFarms = this.getListFarms.bind(this);
        this.UpdateListFarms = this.UpdateListFarms.bind(this);
        this.AddFarmModal = this.AddFarmModal.bind(this);
    }

    componentWillMount() {
        this.getListFarms();
    }

    AddFarmModal() {
        this.farmAdd.showAddFarm();
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
    getListFarms() {
        axios({
            method: "post",
            url: "./listFarms"
        }).then(res => {
            this.setState({ farms: this.build(res.data) });
        });
    }
    UpdateListFarms() {
        this.props.updateAll();
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
                                                                    "registerFarm.title"
                                                                )}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Row>
                                    </Col>
                                    <Col sm="2" md="1">
                                        <div className="justify-content-end align-items-center d-flex m-1">
                                            <i
                                                className="icon fa fa-refresh text-light  fa-2x p-1"
                                                onClick={this.UpdateListFarms}
                                                style={{
                                                    backgroundColor:
                                                        "rgba(0, 150, 136, 0.5)",
                                                    textTransform: "unset",
                                                    minWidth: "unset",
                                                    cursor: "pointer",
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
