import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Col,
  Card,
  CardBody,
  Row,
  CardHeader,
  Container,
} from 'reactstrap';
import { Translation } from 'react-i18next';
import { Target, TargetSmall, Overlay } from '../../components';

const options = {
  maintainAspectRatio: true,
};

class Farm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalAddFarm: false,
      listFarms: false,
    };
    this.AddFarmModal = this.AddFarmModal.bind(this);
  }

  AddFarmModal() {
    console.log(new Date());
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row className={'mb-4'}>
          <Col md="9" xl="7" xs="10" className={'mx-auto'}>
            <TargetSmall
              onClick={this.AddFarmModal}
              title="registerAnimal.title"
              ns="farm"
              fontWeight="font-weight-normal"
            />
          </Col>
          <div
            className={'c-pointer position-absolute'}
            style={{
              right: '0',
              bottom: '1vh',
            }}
          >
            <i
              className={
                'icon fa fa-refresh text-light  fa-2x p-1 rounded-circle'
              }
              onClick={() => console.log(234324)}
              style={{
                backgroundColor: 'rgba(0, 150, 136, 0.5)',
              }}
            />
          </div>
        </Row>

        <Col
          sm="12"
          className={'d-flex justify-content-center'}
          data-aos="zoom-in"
        >
          <Col
            md="8"
            sm="6"
            className={'text-center mt-3'}
            data-aos="zoom-in"
          >
            <Target
              title={'noneAnimal'}
              iconTruncate={false}
              iconNode={
                <CardBody className="tileAnimation">
                  <Row className="m-0 justify-content-center">
                    <Col>
                      <i
                        className="fa-3x fa-duck"
                        aria-hidden="true"
                      />
                    </Col>
                    <Col>
                      <i
                        className="fa-3x fa-cow"
                        aria-hidden="true"
                      />
                    </Col>
                    <Col>
                      <i
                        className="fa-3x fa-pig"
                        aria-hidden="true"
                      />
                    </Col>
                    <Col>
                      <i
                        className="fa-3x fa-chicken"
                        aria-hidden="true"
                      />
                    </Col>
                  </Row>
                  <Overlay state={true} />
                </CardBody>
              }
              iconSize="fa-3x"
              iconType="fa-inbox"
              ns="farm"
              sizeText="h4"
            />
          </Col>
        </Col>
        <Row data-aos="fade-up">{this.state.listFarms}</Row>
      </div>
    );
  }
}

export default Farm;
