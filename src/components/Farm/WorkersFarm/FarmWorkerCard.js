import React, { Component } from 'react';
import { Row, Col, Button, Card, CardHeader, CardTitle, CardBody, CardText, CardFooter } from 'reactstrap';
import { Checkbox } from '../../';
class FarmWorkerCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isGoing: true,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.toggleAddFarmWorkers = this.toggleAddFarmWorkers.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        this.setState({
            [target.name]: target.checked,
        });
    }

    toggleAddFarmWorkers() {
        console.log(this.state.isGoing);
    }

    render() {
        var t = function(e) {
            console.log('====================================');
            console.log(e);
            console.log('====================================');
            return e;
        };
        return (
            <Col sm={12} md={12} lg={6} xl={4} className={'p-xl-1'}>
                <Card className="border-dark mb-3">
                    <CardHeader className="text-capitalize">
                        <Row>
                            <Col md="12" className="d-flex justify-content-center">
                                <i className="fa fa-user-circle-o fa-5x mr-2 imgUserNavBar" aria-hidden="true" />
                            </Col>
                            <Col md="12" className="mt-2 text-truncate">
                                {this.props.obj.name + ' ' + this.props.obj.lastName}
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody className="text-dark">
                        <CardTitle>Información</CardTitle>
                        <CardText />
                        <div>
                            <b>Telefono:</b> {this.props.obj.number}
                        </div>
                        <CardText />
                        <CardTitle>Cargo</CardTitle>
                        <CardText />
                        <div className="d-inline-block">
                            ----.----
                            <i className="fa fa-pencil pl-2" aria-hidden="true" />
                        </div>
                        <CardText />
                        <h3 className="heading">Options</h3>
                        <Checkbox name={'isGoing'} onChange={this.handleInputChange} checked={this.state.isGoing} />
                    </CardBody>
                    <CardFooter className="text-center">
                        <i className="fa fa-trash fa-2x" aria-hidden="true" />
                    </CardFooter>
                    <Button color="secondary" onClick={this.toggleAddFarmWorkers}>
                        canela
                    </Button>
                </Card>
            </Col>
        );
    }
}

export default FarmWorkerCard;
