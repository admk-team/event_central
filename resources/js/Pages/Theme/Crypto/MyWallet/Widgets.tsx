import React from 'react';
import { Card } from 'react-bootstrap';

const Widgets = () => {
    return (
        <React.Fragment>
            <Card>
                <Card.Body className="bg-warning-subtle">
                    <div className="d-flex">
                        <div className="flex-grow-1">
                            <h5 className="fs-13 mb-3">My Portfolio</h5>
                            <h3>$61,91,967<small className="text-muted fs-14">.29</small></h3>
                            <p className="text-muted mb-0">$25,10,974 <small className="badge bg-success-subtle text-success"><i className="ri-arrow-right-up-line fs-13 align-bottom"></i>4.37%</small></p>
                        </div>
                        <div className="flex-shrink-0">
                            <i className="mdi mdi-wallet-outline text-primary h1"></i>
                        </div>
                    </div>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <div className="d-flex">
                        <div className="flex-grow-1">
                            <h5 className="fs-13 mb-3">Today's Profit</h5>
                            <h3>$2,74,365<small className="text-muted fs-14">.84</small></h3>
                            <p className="text-muted mb-0">$9,10,564 <small className="badge bg-success-subtle text-success"><i className="ri-arrow-right-up-line fs-13 align-bottom"></i>1.25%</small></p>
                        </div>
                        <div className="flex-shrink-0">
                            <i className="ri-hand-coin-line text-primary h1"></i>
                        </div>
                    </div>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <div className="d-flex">
                        <div className="flex-grow-1">
                            <h5 className="fs-13 mb-3">Overall Profit</h5>
                            <h3>$32,67,120<small className="text-muted fs-14">.42</small></h3>
                            <p className="text-muted mb-0">$18,22,730 <small className="badge bg-success-subtle text-success"><i className="ri-arrow-right-up-line fs-13 align-bottom"></i>8.34%</small></p>
                        </div>
                        <div className="flex-shrink-0">
                            <i className="ri-line-chart-line text-primary h1"></i>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </React.Fragment>
    );
};

export default Widgets;