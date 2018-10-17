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
import { GridCharge, CircleAnimation } from "..";
import ReactCSSTransitionGroup from "react-addons-css-transition-group"; // ES6
import { I18n } from "react-i18next";
import { AddFarmWorkers } from "./WorkersFarm";

function Loading() {
    return <CircleAnimation width={"30%"} />;
}
const FarmWorker = Loadable({
    loader: () => import("./WorkersFarm/FarmWorkerCard.js"),
    loading: Loading
});

class ConfigFarm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalConfigFarm: false,
            modalConfigFarmTitle: "",
            modalBodyFarmWorker: true
        };
        this.toggleConfigFarm = this.toggleConfigFarm.bind(this);
        this.modalData = this.modalData.bind(this);
        this.toggleModalAnimation = this.toggleModalAnimation.bind(this);
    }

    toggleConfigFarm() {
        this.setState({
            modalConfigFarm: !this.state.modalConfigFarm
        });
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

    modalData(id, name) {
        this.toggleModalAnimation();
        this.setState({ modalWorkersFarmTitle: name });
        this.toggleWorkersFarm();
    }
    render() {
        return (
            <I18n ns="farm">
                {t => (
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
                                            onClick={this.toggleConfigFarm}
                                        >
                                            {t("save")}
                                        </Button>
                                        <Button
                                            color="secondary"
                                            onClick={this.toggleConfigFarm}
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

export default ConfigFarm;
