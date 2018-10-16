import React, { Component } from 'react';
import { Row, Col, Card, CardHeader, CardBody, CardFooter } from 'reactstrap';

class FarmWorker extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Col sm={12} md={12} lg={6} xl={4}>
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
                        <h5 className="card-title">Información</h5>
                        <p className="card-text" />
                        <div>
                            <b>Telefono:</b> {this.props.obj.number}
                        </div>
                        <p />
                        <h5 className="card-title">Cargo</h5>
                        <p className="card-text" />
                        <div className="d-inline-block">
                            Super Administrador.
                            <i id="editableDateTxt" className="fa fa-pencil pl-2" aria-hidden="true" />
                        </div>
                        <p />
                        <h3 className="heading">Options</h3>
                        <label className="switch switch-3d switch-label switch-sm switch-pill switch-success form-check-label">
                            <input type="checkbox" className="switch-input form-check-input" value="" />
                            <span className="switch-slider" data-checked="On" data-unchecked="Off" />
                        </label>
                    </CardBody>
                    <CardFooter className="text-center">
                        <i className="fa fa-trash fa-2x" aria-hidden="true" />
                    </CardFooter>
                </Card>
            </Col>
        );
    }
}

export default FarmWorker;
