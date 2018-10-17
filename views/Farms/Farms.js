import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { I18n } from "react-i18next";
import { AddFarm, ConfigFarm } from "../../components";
import FarmsBuild from "./FarmsBuild";

class Farms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalAddFarm: false,
            listFarms: false
        };
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
    build(responses) {
        return responses.map((farm, i) => (
            <FarmsBuild
                obj={farm}
                key={i}
                modalData={this.modalDataConfiFarm.modalData}
                colorRand={colorRand()}
            />
        ));
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
                setTimeout(() => {
                    if (this.state.listFarms === false && res.status === 500) {
                        this.getListFarms();
                    }
                }, 100);
            });
    }
    updateListFarms() {
        this.getListFarms();
        this.props.updateFarms();
    }
    render() {
        return (
            <React.Fragment>
                <ConfigFarm
                    ref={ConfigFarm => {
                        this.modalDataConfiFarm = ConfigFarm;
                    }}
                />
                <AddFarm
                    ref={farm => {
                        this.farmAdd = farm;
                    }}
                    getlistFarms={this.updateListFarms}
                />
                <I18n ns="farm">
                    {t => (
                        <React.Fragment>
                            <Col
                                md="12"
                                className={"text-center"}
                                data-aos="zoom-in"
                            >
                                <div className={"tile"}>
                                    <h2>
                                        <div className={"tile-body"}>
                                            {t("welcome")}
                                        </div>
                                    </h2>
                                </div>
                            </Col>
                            <Container className={"p-0"} data-aos="zoom-in">
                                <Row>
                                    <Col
                                        sm="10"
                                        md="11"
                                        style={{ cursor: "pointer" }}
                                    >
                                        <Row>
                                            <Col md="6" className={"mx-auto"}>
                                                <div
                                                    className={"widget-small primary coloured-icon mb-2"}
                                                    style={{
                                                        borderRadius: 1 + "em"
                                                    }}
                                                    onClick={this.AddFarmModal}
                                                >
                                                    <a className={"my-auto"}>
                                                        <i
                                                            className={"icon fa fa-pencil-square fa-2x p-1"}
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
                                                    <Container className={"d-flex align-items-center"}>
                                                        <div className={"info text-center"}>
                                                            <a
                                                                className={"fa-lg"}
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
                                        <div className={"justify-content-end align-items-center d-flex m-1"}>
                                            <i
                                                className={"icon fa fa-refresh text-light  fa-2x p-1"}
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
            </React.Fragment>
        );
    }
}
export default Farms;
