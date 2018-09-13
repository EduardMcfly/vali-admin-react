import React, { Component } from "react";
import {
    Container,
    Row,
    Col,
    Button,
    Modal,
    ModalFooter,
    ModalBody,
    ModalHeader,
    Card,
    CardHeader,
    CardBody,
    CardFooter
} from "reactstrap";
import { I18n } from "react-i18next";
import ReactCSSTransitionGroup from "react-addons-css-transition-group"; // ES6
import { ModalCharge, AddFarm } from "../../components";
import Link from "react-router-dom/Link";

const FarmsBuild = response => (
    <div className="col-md-6 col-lg-6" data-aos="flip-right">
        <div className="widget-small primary coloured-icon align-items-center">
            <Link to={"/farm/" + response.obj[0]}>
                <i
                    className="icon fa  fa-eye fa-3x"
                    style={{ backgroundColor: response.colorRand }}
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
                                response.modalData(
                                    response.obj[0],
                                    response.obj[1]
                                )
                            }
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    </div>
);
const FarmsWorkerBuild = response => (
    <Col sm="6">
        <Card className="border-dark mb-3">
            <CardHeader className="text-capitalize">
                <Row>
                    <Col md="12" className="d-flex justify-content-center">
                        <i
                            className="fa fa-user-circle-o fa-5x mr-2 imgUserNavBar"
                            aria-hidden="true"
                        />
                    </Col>
                    <Col md="12" className="mt-2 text-truncate">
                        {response.obj.name + " " + response.obj.lastName}
                    </Col>
                </Row>
            </CardHeader>
            <CardBody className="text-dark">
                <h5 className="card-title">Información</h5>
                <p className="card-text" />
                <div>
                    <b>Telefono:</b> {response.obj.number}
                </div>
                <p />
                <h5 className="card-title">Cargo</h5>
                <p className="card-text" />
                <div className="d-inline-block">
                    Super Administrador.
                    <i
                        id="editableDateTxt"
                        className="fa fa-pencil pl-2"
                        aria-hidden="true"
                    />
                </div>
                <p />
            </CardBody>
            <CardFooter className="text-center">
                <i className="fa fa-trash fa-2x" aria-hidden="true" />
            </CardFooter>
        </Card>
    </Col>
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
            modalAddFarm: false,
            farms: false
        };
        this.toggleModalAnimation = this.toggleModalAnimation.bind(this);
        this.toggleConfigFarmNested = this.toggleConfigFarmNested.bind(this);
        this.toggleConfigFarm = this.toggleConfigFarm.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
        this.modalData = this.modalData.bind(this);
        this.getListFarms = this.getListFarms.bind(this);
        this.updateListFarms = this.updateListFarms.bind(this);
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
            <FarmsWorkerBuild obj={farm} key={i} />
        ));
    }
    modalDataAddWorker(id, name) {
        console.log("modalDataAddWorker");

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
            }
        });
    }
    getListFarms() {
        axios({
            method: "post",
            url: "./listFarms"
        })
            .then(res => {
                this.setState({ farms: this.build(res.data) });
            })
            .catch(res => {
                setTimeout(() => {
                    if (this.state.farms === false && res.status === 500) {
                        this.getListFarms();
                    }
                }, 5000);
            });
    }
    updateListFarms() {
        this.props.updateFarms();
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
                                            <Col md="6" className="mx-auto">
                                                <div
                                                    className="widget-small primary coloured-icon mb-2"
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
                                                    <Container className="d-flex align-items-center">
                                                        <div className="info text-center text-truncate">
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
                                                    </Container>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col sm="2" md="1">
                                        <div className="justify-content-end align-items-center d-flex m-1">
                                            <i
                                                className="icon fa fa-refresh text-light  fa-2x p-1"
                                                onClick={()=>{this.updateListFarms(),this.getListFarms()}}
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
                                    "modal-dialog-centered modal-lg")
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
                                            <Button color="secondary">
                                                Agregar trabajador
                                            </Button>
                                        </div>
                                        <ReactCSSTransitionGroup
                                            transitionName="show"
                                            transitionEnterTimeout={1000}
                                            transitionLeaveTimeout={600}
                                        >
                                            <Row>
                                                {this.state.modalBodyConfigFarm}
                                            </Row>
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
