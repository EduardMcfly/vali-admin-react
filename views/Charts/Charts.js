import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Card, CardBody, Row, CardHeader } from 'reactstrap';

const line = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
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

const options = {
    tooltips: {
        enabled: false,
    },
    maintainAspectRatio: false,
};

class Charts extends Component {
    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col md="12">
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
                                <div className="chart-wrapper">
                                    <Line data={line} options={options} />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Charts;
