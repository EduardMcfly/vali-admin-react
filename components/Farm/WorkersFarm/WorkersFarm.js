import React, { Component } from "react";
import {
    Container,
    Button,
    Modal,
    ModalFooter,
    ModalBody,
    ModalHeader,
    Col
} from "reactstrap";
import Loadable from "react-loadable";
import { GridCharge, CircleAnimation } from "../../Animations";
import ReactCSSTransitionGroup from "react-addons-css-transition-group"; // ES6
import { I18n } from "react-i18next";
import { AddFarmWorkers } from "./";

function Loading() {
    return <CircleAnimation width={"30%"} />;
}
const FarmWorker = Loadable({
    loader: () => import("./WorkersFarm/FarmWorkerCard.js"),
    loading: Loading
});

class WorkersFarm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalWorkersFarm: false,
            modalWorkersFarmTitle: "",
            modalBodyFarmWorker: true
        };
        this.modalData = this.modalData.bind(this);
        this.toggleModalAnimation = this.toggleModalAnimation.bind(this);
        this.toggleWorkersFarm = this.toggleWorkersFarm.bind(this);
        this.buildFarmWorker = this.buildFarmWorker.bind(this);
    }

    buildFarmWorker(responses) {
        if (responses.length) {
            return responses.map((farm, i) => (
                <FarmWorker obj={farm} key={i} />
            ));
        } else {
            return (
                <Col sm={12} md={12} lg={6} xl={4}>
                    <I18n ns="farm">
                        {t => (
                            <Container>
                                <h6 className={"text-capitalize"}>
                                    {t("noneWorkers")}
                                </h6>
                            </Container>
                        )}
                    </I18n>
                </Col>
            );
        }
    }

    toggleModalAnimation() {
        this.setState({
            modalBodyFarmWorker: (
                <Container>
                    <GridCharge grid={true} />
                </Container>
            )
        });
    }

    toggleWorkersFarm() {
        this.setState({
            modalWorkersFarm: !this.state.modalWorkersFarm
        });
    }

    modalData(id, name) {
        this.toggleModalAnimation();
        this.setState({ modalWorkersFarmTitle: name });
        axios({
            method: "post",
            url: "./farmModalConfig/" + id
        }).then(res => {
            if (typeof res.data.errors != "undefined") {
                if (typeof res.data.errors.permits != "undefined") {
                    swal("", res.data.errors.permits, "warning");
                    this.setState({
                        modalWorkersFarm: false
                    });
                }
            } else {
                this.setState({
                    modalBodyFarmWorker: this.buildFarmWorker(res.data)
                });
            }
        });
        this.toggleWorkersFarm();
    }

    render() {
        return (
            <I18n ns="farm">
                {t => (
                    <React.Fragment>
                        <Modal
                            isOpen={this.state.modalWorkersFarm}
                            toggle={this.toggleWorkersFarm}
                            className={
                                (this.props.className,
                                "modal-dialog-centered modal-lg")
                            }
                        >
                            <ModalHeader
                                toggle={this.toggleWorkersFarm}
                                className="text-uppercase"
                            >
                                {this.state.modalWorkersFarmTitle}
                            </ModalHeader>
                            <ModalBody>
                                <ReactCSSTransitionGroup
                                    transitionName="page"
                                    transitionAppear={false}
                                    transitionEnterTimeout={1000}
                                    transitionLeaveTimeout={600}
                                    component="div"
                                    className="row"
                                >
                                    {this.state.modalBodyFarmWorker}
                                </ReactCSSTransitionGroup>
                            </ModalBody>
                            <I18n ns="general">
                                {t => (
                                    <ModalFooter>
                                        <Button
                                            color="primary"
                                            onClick={this.toggleWorkersFarm}
                                        >
                                            {t("save")}
                                        </Button>
                                        <Button
                                            color="secondary"
                                            onClick={this.toggleWorkersFarm}
                                        >
                                            {t("cancel")}
                                        </Button>
                                    </ModalFooter>
                                )}
                            </I18n>
                        </Modal>
                    </React.Fragment>
                )}
            </I18n>
        );
    }
}

export default WorkersFarm;
