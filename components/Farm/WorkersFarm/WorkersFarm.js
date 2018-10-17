import React, { Component } from 'react';
import { Container, Button, Col, Row } from 'reactstrap';
import { GridCharge, CircleAnimation } from '../../Animations';
import Loadable from 'react-loadable';
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
            const FarmWorkerCard = Loadable({
                loader: () => import('./FarmWorkerCard.js'),
                loading: () => <CircleAnimation width={'25%'} />,
            });
            return responses.map((farm, key) => <FarmWorkerCard obj={farm} key={key} />);
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
        this.setState({ modalWorkersFarmTitle: name });
        axios({
            method: 'post',
            url: './farmModalConfig',
            data: { farmId: this.props.farmId },
        }).then(res => {
            this.setState({
                modalBodyFarmWorkers: <Row key="fdssfddsfdsf">{this.buildFarmWorker(res.data)}</Row>,
            });
        });
    }

    render() {
        return (
            <I18n ns="farm">
                {t => (
                    <React.Fragment>
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
                            <ReactCSSTransitionGroup
                                transitionName="slide"
                                transitionAppear={true}
                                transitionAppearTimeout={800}
                                transitionEnterTimeout={50}
                                transitionLeaveTimeout={800}
                            >
                                {this.state.modalBodyFarmWorkers}
                            </ReactCSSTransitionGroup>
                        </Container>
                    </React.Fragment>
                )}
            </I18n>
        );
    }
}

export default AddFarmWorkers;
