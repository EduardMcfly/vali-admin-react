import React, { Component } from 'react';
import { Row, Container, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Translation } from 'react-i18next';

class FarmsBuild extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Col md={6} lg={6} data-aos="flip-right">
        <div className="widget-small primary coloured-icon align-items-center">
          <Link to={'/farm/' + this.props.obj[0]}>
            <i
              className="icon fa  fa-eye fa-3x"
              style={{ backgroundColor: this.props.colorRand }}
            />
          </Link>
          <Col
            sm="12"
            md="12"
            className={'px-2 info text-truncate'}
            data-aos="fade-up"
            data-aos-duration="500"
          >
            <h4>
              <Link to={'/farm/' + this.props.obj[0]}>
                <div className="text-truncate">
                  {this.props.obj[1]}
                </div>
              </Link>
            </h4>
            <Translation ns="farm">
              {(t, { i18n }) => (
                <p className={'d-md-none d-lg-block text-truncate'}>
                  <b>{t('seeFarm')}.</b>
                </p>
              )}
            </Translation>
          </Col>
          <Col
            xs="auto"
            className={'p-0 p-sm-2 p-lg-3 d-flex align-items-center'}
          >
            <i
              className="fa fa-cogs fa-2x btn-link c-pointer"
              aria-hidden="true"
              onClick={() =>
                this.props.modalData(
                  this.props.obj[0],
                  this.props.obj[1],
                )
              }
            />
          </Col>
        </div>
      </Col>
    );
  }
}

export default FarmsBuild;
