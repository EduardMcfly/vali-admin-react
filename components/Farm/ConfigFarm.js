import React, { Component } from 'react';
import { Container, Button, Modal, ModalFooter, ModalBody, ModalHeader, Col } from 'reactstrap';
import Loadable from 'react-loadable';
import { CircleAnimation } from '..';
import { I18n } from 'react-i18next';

class ConfigFarm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalConfigFarm: false,
            modalConfigFarmTitle: '',
            modalBodyWorkersFarm: true,
        };
        this.toggleConfigFarm = this.toggleConfigFarm.bind(this);
        this.modalData = this.modalData.bind(this);
        this.chargeModalComponents = this.chargeModalComponents.bind(this);
    }

    toggleConfigFarm() {
        this.setState({
            modalConfigFarm: !this.state.modalConfigFarm,
        });
    }

    chargeModalComponents(id) {
        var WorkersFarm = Loadable({
            loader: () => import('./WorkersFarm/WorkersFarm.js'),
            loading: () => <CircleAnimation width={'15%'} />,
        });
        this.setState({
            modalBodyWorkersFarm: (
                <Container>
                    <WorkersFarm farmId={id} />
                </Container>
            ),
        });
    }

    modalData(id, name) {
        this.toggleConfigFarm();
        this.setState({ modalConfigFarmTitle: name });
        this.chargeModalComponents(id);
    }

    render() {
        return (
            <I18n ns="farm">
                {t => (
                    <React.Fragment>
                        <Modal
                            isOpen={this.state.modalConfigFarm}
                            toggle={this.toggleConfigFarm}
                            className={(this.props.className, 'modal-dialog-centered modal-lg')}
                        >
                            <ModalHeader toggle={this.toggleConfigFarm} className="text-uppercase">
                                {this.state.modalConfigFarmTitle}
                            </ModalHeader>
                            <ModalBody>{this.state.modalBodyWorkersFarm}</ModalBody>
                            <I18n ns="general">
                                {t => (
                                    <ModalFooter>
                                        <Button color="primary" onClick={this.toggleConfigFarm}>
                                            {t('save')}
                                        </Button>
                                        <Button color="secondary" onClick={this.toggleConfigFarm}>
                                            {t('cancel')}
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
