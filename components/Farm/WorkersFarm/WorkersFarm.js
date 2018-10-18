import React, { Component } from 'react';
import { Container, Button, Col, Row } from 'reactstrap';
import { GridCharge, CircleAnimation } from '../../Animations';
import Loadable from 'react-loadable';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import { I18n } from 'react-i18next';
import classNames from 'classnames';

class AddFarmWorkers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalConfigFarm: true,
            modalConfigFarmTitle: '',
            getModalAddFarmUsers: false,
            modalAddFarmWorkers: true,
        };
        this.modalData = this.modalData.bind(this);
        this.toggleModalAnimation = this.toggleModalAnimation.bind(this);
        this.buildFarmWorker = this.buildFarmWorker.bind(this);
        this.addWorker = this.addWorker.bind(this);
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
                <Col sm={12} md={12} lg={6} xl={4} className={'mx-auto'}>
                    <I18n ns="farm">
                        {t => (
                            <Container>
                                <h5 className={'text-capitalize lead tile shadow-sm'}>
                                    <i
                                        className="fa fa-users fa-5x mr-2 d-flex justify-content-center"
                                        aria-hidden="true"
                                    />
                                    <span className={'my-3 text-wrap d-block'}>{t('noneWorkers')}.</span>
                                </h5>
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

    getFarmInfo() {
        axios({
            method: 'post',
            url: './farmInfo',
            data: { farmId: this.props.farmId },
        })
            .then(res => {
                this.setState({
                    modalDataError: false,
                    modalBodyFarmWorkers: <Row>{this.buildFarmWorker(res.data)}</Row>,
                });
            })
            .catch(res => {
                setTimeout(() => {
                    if (this.state.modalDataError) {
                        this.modalData();
                    }
                }, 1000);
                this.setState({
                    modalDataError: true,
                });
            });
    }

    modalData() {
        this.toggleModalAnimation();
        this.setState({ modalWorkersFarmTitle: name });
        this.getFarmInfo();
    }

    addWorker() {
        const AddFarmWorkers = Loadable({
            loader: () =>
                import('./AddFarmWorkers.js').then(res => {
                    this.setState({ getModalAddFarmUsers: false });
                    return res;
                }),
            loading: () => null,
        });
        this.setState({
            getModalAddFarmUsers: true,
            modalAddFarmWorkers: (
                <AddFarmWorkers
                    farmId={this.props.farmId}
                    reload={() => {
                        this.getFarmInfo();
                    }}
                />
            ),
        });
    }

    render() {
        return (
            <I18n ns="farm">
                {t => (
                    <React.Fragment>
                        <Container className="tileAnimation">
                            <h5 className="lead">{t('contributor')}</h5>
                            <hr className="my-3" />
                            <Col sm={'6'} lg={'4'} className={'ml-auto mb-4'}>
                                <Button color="info text-truncate rounded" block onClick={this.addWorker}>
                                    <i className="fa fa-1x fa-user-plus" />
                                    <span>{t('addUser')}.</span>
                                </Button>
                            </Col>
                            <ReactCSSTransitionGroup
                                transitionName="slide"
                                transitionAppear={true}
                                transitionAppearTimeout={800}
                                transitionEnterTimeout={50}
                                transitionLeaveTimeout={800}
                            >
                                {this.state.modalBodyFarmWorkers}
                            </ReactCSSTransitionGroup>
                            <div
                                className={classNames(
                                    {
                                        'd-none': !this.state.getModalAddFarmUsers,
                                    },
                                    'overlay'
                                )}
                            >
                                <CircleAnimation width={'70px'} />
                            </div>
                        </Container>
                        {this.state.modalAddFarmWorkers}
                    </React.Fragment>
                )}
            </I18n>
        );
    }
}

export default AddFarmWorkers;
