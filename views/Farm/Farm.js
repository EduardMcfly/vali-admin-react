import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Card, CardBody, Row, CardHeader } from 'reactstrap';
import { I18n } from 'react-i18next';

const options = {
    maintainAspectRatio: true,
};

class Farm extends Component {
    constructor(props) {
        super(props);
        this.dataLine = this.dataLine.bind(this);
    }
    dataLine(t) {
        return {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: t('addUser'),
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [65, 59, 80, 81, 56, 55, 40],
                },
            ],
        };
    }
    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col md="8">
                        <Card>
                            <CardHeader>
                                Line Chart
                                <div className="card-header-actions">
                                    <a href="http://www.chartjs.org" className="card-header-action">
                                        <small className="text-muted">docs</small>
                                    </a>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <I18n ns="farm">
                                    {t => (
                                        <div className="chart-wrapper">
                                            {t('addUser')}
                                            <Line data={this.dataLine(t)} options={options} />
                                        </div>
                                    )}
                                </I18n>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Farm;
