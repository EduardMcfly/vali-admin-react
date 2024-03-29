import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Container } from 'reactstrap';
import { Translation } from 'react-i18next';

class GridCreate extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Row className="text-truncate">
          <Col sm="12 g-height-20 gray mb-1" />
          <Col sm="6 col-6 g-height-90 gray" />
          <Col sm="6 col-6">
            <Row className="ml-1">
              <Col sm="12 g-height-20 gray" />
              <Col sm="12 p-1" />
              <Col sm="12 g-height-20 gray" />
              <Col sm="12 p-1" />
              <Col sm="12 g-height-20 gray" />
              <Col sm="12 p-1" />
              <Col sm="12 g-height-20 gray" />
              <Col sm="12 p-1" />
            </Row>
          </Col>
          <Col sm="4 col-6">
            <Row>
              <Col sm="12 col-12 g-height-20 gray" />
              <Col sm="12 col-12 p-1" />
              <Col sm="12 col-12 g-height-20 gray" />
              <Col sm="12 col-12 p-1" />
              <Col sm="12 col-12 g-height-20 gray" />
              <Col sm="12 col-12 p-1" />
              <Col sm="3 col-3 g-height-20 gray" />
              <Col sm="1 col-1 p-1" />
              <Col sm="1 col-1 g-height-20 gray" />
              <Col sm="1 col-1 p-1" />
              <Col sm="4 col-4 g-height-20 gray" />
            </Row>
          </Col>
          <Col sm="8 col-6">
            <Row className="ml-1">
              <Col sm="6 col-6 g-height-20 gray" />
              <Col sm="1 col-1 p-1" />
              <Col sm="5 col-5 g-height-20 gray" />
              <Col sm="12 col-12 p-1" />
              <Col sm="3 col-3 g-height-20 gray" />
              <Col sm="1 col-1 p-1" />
              <Col sm="1 col-1 g-height-20 gray" />
              <Col sm="1 col-1 p-1" />
              <Col sm="5 col-5 g-height-20 gray" />
              <Col sm="12 col-12 p-1" />
              <Col sm="12 col-12 g-height-20 gray" />
              <Col sm="12 col-12 p-1" />
              <Col sm={{ size: '2', offset: 2 }} />
              <Col sm={{ size: '4', offset: 2 }} />
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

class GridCharge extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { grid } = this.props;
    return (
      <div className={'align-items-center ' + (grid ? 'd-flex' : '')}>
        <div className="overlay container position-absolute justify-content-center d-flex">
          <div className="row text-center">
            <div className="col-12">
              <div
                className="m-loader mr-2 mx-auto"
                style={{ width: '50%' }}
              >
                <svg className="m-circular" viewBox="25 25 50 50">
                  <circle
                    className="path"
                    cx="50"
                    cy="50"
                    r="20"
                    fill="none"
                    strokeWidth="4"
                    strokeMiterlimit="10"
                  />
                </svg>
              </div>
            </div>
            <div className="col-12">
              <h3 className="l-text">
                <Translation ns="general">
                  {(t, { i18n }) => t('charging')}
                </Translation>
                .
              </h3>
            </div>
          </div>
        </div>
        {grid ? <GridCreate /> : null}
      </div>
    );
  }
}

GridCharge.propTypes = {
  grid: PropTypes.bool,
};

GridCharge.defaultProps = {
  grid: false,
};
export default GridCharge;
