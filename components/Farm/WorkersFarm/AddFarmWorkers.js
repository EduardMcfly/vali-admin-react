import React, { Component } from 'react';
import { Container, Button, Modal, ModalFooter, ModalBody, ModalHeader, Col } from 'reactstrap';
import { GridCharge } from '../../Animations';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import { I18n } from 'react-i18next';

class AddFarmWorkers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalConfigFarm: true,
            modalConfigFarmTitle: '',
            modalBodyConfigFarm: true,
        };
        this.modalData = this.modalData.bind(this);
        this.toggleModalAnimation = this.toggleModalAnimation.bind(this);
        this.buildFarmWorker = this.buildFarmWorker.bind(this);
    }

    componentDidMount() {
        this.modalData();
    }

    buildFarmWorker(responses) {
        if (responses.length) {
            return responses.map((farm, i) => <FarmWorker obj={farm} key={i} />);
        } else {
            return (
                <Col sm={12} md={12} lg={6} xl={4}>
                    <I18n ns="farm">
                        {t => (
                            <Container>
                                <h6 className={'text-capitalize'}>{t('noneWorkers')}</h6>
                            </Container>
                        )}
                    </I18n>
                </Col>
            );
        }
    }

    toggleModalAnimation() {
        this.setState({
            modalBodyFarmWorkers: (
                <Container>
                    <GridCharge grid={true} />
                </Container>
            ),
        });
    }

    toggleFarmWorkers() {
        this.setState({
            modalFarmWorkers: !this.state.modalFarmWorkers,
        });
    }

    modalData(id, name) {
        this.toggleModalAnimation();
        this.setState({ modalFarmWorkersTitle: name });
        axios({
            method: 'post',
            url: './farmModalConfig/' + id,
        }).then(res => {
            if (typeof res.data.errors != 'undefined') {
                if (typeof res.data.errors.permits != 'undefined') {
                    swal('', res.data.errors.permits, 'warning');
                    this.setState({
                        modalFarmWorkers: false,
                    });
                }
            } else {
                this.setState({
                    modalBodyFarmWorkers: this.buildFarmWorker(res.data),
                });
            }
        });
        this.toggleFarmWorkers();
    }

    render() {
        return (
            <I18n ns="farm">
                {t => (
                    <React.Fragment>
                        <ModalBody>
                            <Container>
                                <h5 className="lead">Trabajadores</h5>
                                <hr className="my-3" />
                                <div className="mb-3">
                                    <Button
                                        color="secondary"
                                        onClick={() => {
                                            console.log(32432);
                                        }}
                                    >
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
                                {this.state.modalBodyFarmWorkers}
                            </ReactCSSTransitionGroup>
                        </ModalBody>
                    </React.Fragment>
                )}
            </I18n>
        );
    }
}

export default AddFarmWorkers;
