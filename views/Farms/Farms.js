import React, { Component } from "react";
import {
    Container,
    Row,
    Col,
    Button,
    Modal,
    ModalFooter,
    ModalBody,
    ModalHeader
} from "reactstrap";
import { I18n } from "react-i18next";
import ReactCSSTransitionGroup from "react-addons-css-transition-group"; // ES6
import { GridCharge, AddFarm } from "../../components";
import FarmWorker from "./FarmWorker";
import FarmsBuild from "./FarmsBuild";

class Farms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalConfigFarm: false,
            modalConfigFarmTitle: "",
            modalBodyConfigFarm: true,
            nestedModalConfigFarm: false,
            closeAll: false,
            modalAddFarm: false,
            listFarms: false
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
        this.setState({
            modalBodyConfigFarm: (
                <Container>
                    <GridCharge grid={true} />
                </Container>
            )
        });
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
                    modalBodyConfigFarm: this.buildFarmWorker(res.data)
                });
            }
        });
        this.toggleModalAnimation();
        this.toggleConfigFarm();
    }

    build(responses) {
        return responses.map((farm, i) => (
            <FarmsBuild
                obj={farm}
                key={i}
                modalData={this.modalData}
                colorRand={colorRand()}
            />
        ));
    }
    buildFarmWorker(responses) {
        return responses.map((farm, i) => <FarmWorker obj={farm} key={i} />);
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
            }
        });
    }
    getListFarms() {
        axios({
            method: "post",
            url: "./listFarms"
        })
            .then(res => {
                if (AxiosStore.validate("listFarms")) {
                    var listFarms = AxiosStore.get("listFarms");
                } else {
                    var listFarms = AxiosStore.set("listFarms", res.data[0]);
                }
                this.setState({
                    listFarms: this.build(listFarms)
                });
            })
            .catch(res => {
                console.log(res);
                setTimeout(() => {
                    if (this.state.listFarms === false && res.status === 500) {
                        this.getListFarms();
                    }
                }, 5000);
            });
    }
    updateListFarms() {
        this.getListFarms();
        this.props.updateFarms();
    }
    render() {
        return (
            <React.Fragment>
                <AddFarm
                    ref={farm => {
                        this.farmAdd = farm;
                    }}
                    getlistFarms={this.updateListFarms}
                />
                <I18n ns="farm">
                    {(t, { i18n }) => (
                        <React.Fragment>
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
                            <Container className="p-0" data-aos="zoom-in">
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
                                                onClick={this.updateListFarms}
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
                                <Row data-aos="fade-up">
                                    {this.state.listFarms}
                                </Row>
                            </Container>
                        </React.Fragment>
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
                                    <Container>
                                        <h5 className="lead">Trabajadores</h5>
                                        <hr className="my-3" />
                                        <div className="mb-3">
                                            <Button color="secondary">
                                                Agregar trabajador
                                            </Button>
                                        </div>
                                    </Container>
                                    <ReactCSSTransitionGroup
                                        transitionName="page"
                                        transitionAppear={false}
                                        transitionEnterTimeout={1000}
                                        transitionLeaveTimeout={600}
                                        component="div"
                                        className="row"
                                    >
                                        {this.state.modalBodyConfigFarm}
                                    </ReactCSSTransitionGroup>
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
