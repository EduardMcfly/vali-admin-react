import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { I18n } from "react-i18next";
import { AddFarm, ConfigFarm, Target, TargetSmall } from "../../components";
import FarmsBuild from "./FarmsBuild";
import axios from "axios";
import { colorRand, AxiosStore } from "../../app-utilities";

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
        if (responses.length) {
            return responses.map((farm, i) => (
                <FarmsBuild
                    obj={farm}
                    key={i}
                    modalData={this.modalDataConfiFarm.modalData}
                    colorRand={colorRand()}
                />
            ));
        } else {
            return (
                <Col
                    sm="12"
                    className={"d-flex justify-content-center"}
                    data-aos="zoom-in"
                >
                    <Col
                        md="6"
                        sm="6"
                        className={"text-center mt-3"}
                        data-aos="zoom-in"
                    >
                        <Target
                            title={"noneFarms"}
                            iconSize="fa-3x"
                            iconType="fa-inbox"
                            ns="farm"
                            sizeText="h4"
                            onClick={this.farmAdd.showAddFarm}
                        />
                    </Col>
                </Col>
            );
        }
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
                    if (res.status === 500) {
                        this.getListFarms();
                    }
                }, 1000);
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
                                <Target
                                    title={"welcome"}
                                    icon={false}
                                    ns="farm"
                                    sizeText="h2"
                                    cPointer={false}
                                    fontWeight=""
                                />
                            </Col>
                            <Container className={"p-0"} data-aos="zoom-in">
                                <Row className={"mb-4"}>
                                    <Col
                                        md="9"
                                        xs="8"
                                        xl="10"
                                        className={"mx-auto"}
                                    >
                                        <TargetSmall
                                            iconColor="#ffd404"
                                            onClick={this.AddFarmModal}
                                            title="registerFarm.title"
                                            ns="farm"
                                            fontWeight="font-weight-normal"
                                        />
                                    </Col>
                                    <div
                                        className={
                                            "c-pointer position-absolute"
                                        }
                                        style={{
                                            right: "0",
                                            bottom: "1vh"
                                        }}
                                    >
                                        <i
                                            className={
                                                "icon fa fa-refresh text-light  fa-2x p-1 rounded-circle"
                                            }
                                            onClick={this.updateListFarms}
                                            style={{
                                                backgroundColor:
                                                    "rgba(0, 150, 136, 0.5)"
                                            }}
                                        />
                                    </div>
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
